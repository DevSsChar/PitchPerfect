import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch speech analysis results from Supabase
    const { data, error } = await supabaseAdmin
      .from('speech_analysis_results')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching history:', error);
      return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }

    // Process the data to extract metrics
    const processedData = data.map(item => {
      // Extract metrics from the results
      const results = item.results || {};
      
      // Extract overall score
      let overallScore = 0;
      if (results.overall_score) {
        overallScore = results.overall_score;
      } else if (results.metrics && results.metrics.overall) {
        overallScore = results.metrics.overall.score;
      }
      
      // Extract word count
      let wordCount = 0;
      if (results.word_count) {
        wordCount = results.word_count;
      } else if (results.metrics && results.metrics.words) {
        wordCount = results.metrics.words.count;
      }
      
      // Extract summary
      let summary = '';
      if (results.summary) {
        summary = results.summary;
      } else if (results.llm_feedback) {
        summary = results.llm_feedback;
      } else if (results.text_analysis && results.text_analysis.summary) {
        summary = results.text_analysis.summary;
      }
      
      return {
        id: item.id,
        file_name: item.file_name,
        created_at: item.created_at,
        audio_duration: item.audio_duration,
        overall_score: overallScore,
        word_count: wordCount,
        summary: summary,
        analysis_type: item.analysis_type || 'server'
      };
    });

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
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