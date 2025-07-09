// app/api/analyze/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/config';

/**
 * API route to handle audio analysis
 * Receives audio file data and forwards to Python backend
 * Falls back to demo.json if backend is unavailable
 * Stores analysis results in Supabase
 */
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get the form data from the request
    const formData = await request.formData();
    
    // Extract the audio file
    const audioFile = formData.get('audioFile');
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Get file details
    const fileName = audioFile.name;
    const fileType = audioFile.type;
    const fileSize = audioFile.size;

    // Validate file type
    if (!fileType.startsWith('audio/')) {
      return NextResponse.json(
        { error: 'File must be an audio file' },
        { status: 400 }
      );
    }
    
    // Validate file size (limit to 20MB)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (fileSize > maxSize) {
      return NextResponse.json(
        { error: 'Audio file exceeds maximum size of 20MB' },
        { status: 400 }
      );
    }
    
    // Create a new FormData object to send to the backend
    const backendFormData = new FormData();
    backendFormData.append('audio_file', audioFile);
    
    // Add duration if provided
    const duration = formData.get('duration');
    if (duration) {
      backendFormData.append('duration', duration);
    }

    let analysisResults;
    let isFallback = false;

    // Forward to Python backend
    try {
      // Get the backend URL from environment variables or use default
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/audio/analyze`, {
        method: 'POST',
        body: backendFormData,
        headers: {
          'Authorization': `Bearer ${session.user.id}` // Pass user ID as token
        }
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}: ${await response.text()}`);
      }

      analysisResults = await response.json();
    } catch (backendError) {
      console.error('Error connecting to backend:', backendError);
      
      // Fallback to demo.json if backend is unavailable
      try {
        const demoPath = path.join(process.cwd(), 'app', 'demo.json');
        analysisResults = JSON.parse(fs.readFileSync(demoPath, 'utf8'));
        isFallback = true;
      } catch (fallbackError) {
        throw new Error(`Backend error: ${backendError.message}. Fallback error: ${fallbackError.message}`);
      }
    }
    
    // Store analysis results in Supabase
    try {
      // Use the supabaseAdmin client directly to store the results
      const { supabaseAdmin } = await import('../../../lib/supabase-server');
      
      // Ensure results is stored as a proper JSON object, not a string
      const { data: insertedData, error } = await supabaseAdmin
        .from('speech_analysis_results')
        .insert({
          user_id: session.user.id,
          file_name: fileName,
          audio_duration: analysisResults.audio_duration || 0,
          results: analysisResults // Store as JSON object directly
        })
        .select();

      if (error) {
        console.error('Error storing analysis in Supabase:', error);
      }
    } catch (storageError) {
      console.error('Error storing analysis results:', storageError);
      // Continue even if storage fails
    }
    
    // Return success response with analysis results
    return NextResponse.json({
      success: true,
      message: isFallback ? 'Audio analysis completed (using demo data)' : 'Audio analysis completed',
      data: analysisResults,
      fallback: isFallback
    });
  } catch (error) {
    console.error('Error processing audio analysis:', error);
    
    return NextResponse.json(
      { error: 'Failed to process audio analysis', details: error.message },
      { status: 500 }
    );
  }
}
