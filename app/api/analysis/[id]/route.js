import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/config';
import { supabaseAdmin } from '../../../../lib/supabase-server';

/**
 * API route to fetch a specific speech analysis by ID
 * Retrieves the full analysis details for the authenticated user
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Analysis ID is required' },
        { status: 400 }
      );
    }

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Fetch the specific analysis from Supabase
    const { data, error } = await supabaseAdmin
      .from('speech_analysis_results')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching analysis from Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to fetch analysis data' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Analysis not found or you do not have permission to view it' },
        { status: 404 }
      );
    }

    // Return the analysis data with results as a JSON object
    return NextResponse.json({
      id: data.id,
      user_id: data.user_id,
      file_name: data.file_name || 'Untitled Speech',
      audio_duration: data.audio_duration,
      created_at: data.created_at,
      results: data.results
    });
  } catch (error) {
    console.error('Error in analysis API route:', error);
    return NextResponse.json(
      { error: 'Failed to process analysis request', details: error.message },
      { status: 500 }
    );
  }
}