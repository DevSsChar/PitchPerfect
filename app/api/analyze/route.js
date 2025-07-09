// app/api/analyze/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get form data
    const formData = await request.formData();
    const audioFile = formData.get('audioFile');
    const duration = formData.get('duration');
    const browserAnalysis = formData.get('browserAnalysis');

    // Validate file
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Check file type
    const validTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/webm', 'audio/ogg'];
    if (!validTypes.includes(audioFile.type)) {
      return NextResponse.json({ error: 'Invalid file type. Please upload an audio file.' }, { status: 400 });
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (audioFile.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    let analysisResults;

    // If browser analysis is provided, use it
    if (browserAnalysis) {
      try {
        analysisResults = JSON.parse(browserAnalysis);
      } catch (error) {
        console.error('Error parsing browser analysis:', error);
        return NextResponse.json({ error: 'Invalid browser analysis data' }, { status: 400 });
      }
    } else {
      // Otherwise, perform server-side analysis
      try {
        // Convert file to array buffer
        const arrayBuffer = await audioFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Call Python backend for analysis
        // This is a placeholder - in a real implementation, you would send the audio to your backend
        // For demo purposes, we'll use a sample response
        analysisResults = require('./demo.json');

        // In a real implementation, you would do something like this:
        /*
        const response = await fetch('https://your-python-backend.com/analyze', {
          method: 'POST',
          body: buffer,
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        });

        if (!response.ok) {
          throw new Error(`Backend returned ${response.status}: ${response.statusText}`);
        }

        analysisResults = await response.json();
        */
      } catch (error) {
        console.error('Error analyzing audio:', error);
        return NextResponse.json({ error: 'Failed to analyze audio' }, { status: 500 });
      }
    }

    // Store results in database
    const { error: dbError } = await supabaseAdmin
      .from('speech_analysis_results')
      .insert({
        user_id: session.user.id,
        file_name: audioFile.name,
        audio_duration: duration || '0:00',
        results: analysisResults,
        analysis_type: browserAnalysis ? 'browser' : 'server'
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save analysis results' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: analysisResults });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
