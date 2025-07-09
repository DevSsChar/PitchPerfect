import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/config';
import { supabaseAdmin } from '../../../lib/supabase-server';

/**
 * API route to fetch user's speech analysis history
 * Retrieves all analysis records for the authenticated user from Supabase
 */
export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Fetch history from Supabase
    const { data, error } = await supabaseAdmin
      .from('speech_analysis_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching history from Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to fetch history data' },
        { status: 500 }
      );
    }

    // Process the data to extract relevant information
    const processedHistory = data.map(item => {
      // Extract key metrics from the analysis results
      let overall_score = 'N/A';
      let word_count = 'N/A';
      let summary = 'No summary available';
      
      try {
        // Ensure results is treated as a JSON object
        const results = item.results;
          
        if (results) {
          // Extract overall score from LLM feedback if available
          if (results.llm_feedback && results.llm_feedback.overall_score) {
            overall_score = results.llm_feedback.overall_score;
          }
          
          // Extract word count from text analysis if available
          if (results.text_analysis && results.text_analysis.word_count) {
            word_count = results.text_analysis.word_count;
          }
          
          // Extract summary from LLM feedback if available
          if (results.llm_feedback && results.llm_feedback.summary_feedback) {
            summary = results.llm_feedback.summary_feedback;
          }
        }
      } catch (e) {
        console.error('Error processing results JSON:', e);
      }
      
      return {
        id: item.id,
        user_id: item.user_id,
        file_name: item.file_name || 'Untitled Speech',
        audio_duration: item.audio_duration,
        created_at: item.created_at,
        overall_score,
        word_count,
        summary
      };
    });

    return NextResponse.json({ history: processedHistory });
  } catch (error) {
    console.error('Error in history API route:', error);
    return NextResponse.json(
      { error: 'Failed to process history request', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * API route to store speech analysis results
 * Stores the analysis results for the authenticated user in Supabase
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

    const userId = session.user.id;
    const data = await request.json();

    // Validate required fields
    if (!data.file_name || !data.results) {
      return NextResponse.json(
        { error: 'Missing required fields: file_name and results are required' },
        { status: 400 }
      );
    }

    // Prepare data for insertion
    const analysisData = {
      user_id: userId,
      file_name: data.file_name,
      audio_duration: data.audio_duration || 0,
      results: data.results // Store as JSON object directly
    };

    // Insert into Supabase
    const { data: insertedData, error } = await supabaseAdmin
      .from('speech_analysis_results')
      .insert(analysisData)
      .select();

    if (error) {
      console.error('Error storing analysis in Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to store analysis data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Analysis stored successfully',
      data: insertedData[0]
    });
  } catch (error) {
    console.error('Error in history POST API route:', error);
    return NextResponse.json(
      { error: 'Failed to process analysis storage request', details: error.message },
      { status: 500 }
    );
  }
}