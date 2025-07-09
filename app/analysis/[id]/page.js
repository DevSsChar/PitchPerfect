'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './analysis.module.css';

export default function AnalysisPage({ params }) {
  const { id } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (status === 'loading') return;
      
      if (!session) {
        router.push('/login');
        return;
      }

      try {
        // First try to fetch from the API
        const response = await fetch(`/api/analysis/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            // If analysis not found, try to use demo.json as fallback
            console.log('Analysis not found, using demo.json as fallback');
            const demoResponse = await fetch('/demo.json');
            
            if (!demoResponse.ok) {
              throw new Error('Failed to load demo data');
            }
            
            const demoData = await demoResponse.json();
            
            // Create a mock analysis object using demo data
            const mockAnalysis = {
              id: id,
              file_name: 'Demo Speech Analysis',
              created_at: new Date().toISOString(),
              audio_duration: demoData.audio_duration,
              results: demoData
            };
            
            setAnalysis(mockAnalysis);
            return;
          } else {
            throw new Error(`Error fetching analysis: ${response.statusText}`);
          }
        }
        
        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        console.error('Failed to fetch analysis:', err);
        
        // As a last resort, try to use demo.json
        try {
          const demoResponse = await fetch('/demo.json');
          if (demoResponse.ok) {
            const demoData = await demoResponse.json();
            
            // Create a mock analysis object using demo data
            const mockAnalysis = {
              id: id,
              file_name: 'Demo Speech Analysis (Fallback)',
              created_at: new Date().toISOString(),
              audio_duration: demoData.audio_duration,
              results: demoData
            };
            
            setAnalysis(mockAnalysis);
            setError(null); // Clear error since we have fallback data
          } else {
            setError(err.message);
          }
        } catch (fallbackErr) {
          console.error('Failed to load fallback demo data:', fallbackErr);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id, session, status, router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading analysis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Oops!</h2>
        <p>{error}</p>
        <Link href="/history" className={styles.backButton}>
          Back to History
        </Link>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className={styles.errorContainer}>
        <h2>Analysis Not Found</h2>
        <p>The requested analysis could not be found or you don't have permission to view it.</p>
        <Link href="/history" className={styles.backButton}>
          Back to History
        </Link>
      </div>
    );
  }

  // Extract data from analysis
  const { file_name, created_at, audio_duration, results } = analysis;
  const createdDate = new Date(created_at).toLocaleString();
  const duration = audio_duration ? 
    `${Math.floor(audio_duration / 60)}:${String(Math.floor(audio_duration % 60)).padStart(2, '0')}` : 
    'N/A';

  // Extract metrics from results
  const transcript = results?.transcript || 'No transcript available';
  const textAnalysis = results?.text_analysis || {};
  const acousticFeatures = results?.acoustic_features || {};
  const llmFeedback = results?.llm_feedback || {};
  
  // Calculate overall score
  const overallScore = llmFeedback?.overall_score || 'N/A';

  return (
    <div className={styles.analysisContainer}>
      <div className={styles.header}>
        <Link href="/history" className={styles.backLink}>
          &larr; Back to History
        </Link>
        <h1 className={styles.title}>{file_name || 'Untitled Speech'}</h1>
        <div className={styles.metadata}>
          <span>Recorded: {createdDate}</span>
          <span>Duration: {duration}</span>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-8">
        {/* Overall Score Card */}
        <div className="bg-[var(--muted)] rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--foreground)] opacity-80 text-sm font-medium">Overall Score</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-[var(--foreground)]">{overallScore}%</h2>
          <p className="text-[var(--foreground)] opacity-80 mt-2">
            {overallScore >= 80 ? 'Excellent performance' :
             overallScore >= 70 ? 'Good performance' :
             overallScore >= 60 ? 'Decent performance' : 'Room for improvement'}
          </p>
        </div>
        
        {/* Speaking Pace Card */}
        <div className="bg-[var(--muted)] rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--foreground)] opacity-80 text-sm font-medium">Speaking Pace</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-[var(--foreground)]">
            {textAnalysis.speaking_rate || 'N/A'} <span className="text-2xl font-normal">WPM</span>
          </h2>
          <p className="text-[var(--foreground)] opacity-80 mt-2">
            {textAnalysis.speaking_rate > 160 ? 'Slightly fast' :
             textAnalysis.speaking_rate < 120 ? 'Slightly slow' : 'Good pace'}
          </p>
        </div>
        
        {/* Word Count Card */}
        <div className="bg-[var(--muted)] rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--foreground)] opacity-80 text-sm font-medium">Word Count</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]">
              <path d="M4 7V4h16v3"></path>
              <path d="M9 20h6"></path>
              <path d="M12 4v16"></path>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-[var(--foreground)]">{textAnalysis.word_count || 'N/A'}</h2>
          <p className="text-[var(--foreground)] opacity-80 mt-2">
            {textAnalysis.sentence_count ? 
              `${textAnalysis.sentence_count} sentences` : 'Total words'}
          </p>
        </div>
        
        {/* Vocal Confidence Card */}
        <div className="bg-[var(--muted)] rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[var(--foreground)] opacity-80 text-sm font-medium">Vocal Confidence</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]">
              <path d="M2 12h6"></path>
              <path d="M10 12h6"></path>
              <path d="M18 12h4"></path>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-[var(--foreground)]">
            {Math.round((acousticFeatures.energy_mean || 0) * 1000)}%
          </h2>
          <p className="text-[var(--foreground)] opacity-80 mt-2">
            {(acousticFeatures.energy_mean || 0) * 1000 > 80 ? 'Strong projection' :
             (acousticFeatures.energy_mean || 0) * 1000 > 60 ? 'Good projection' : 'Room for improvement'}
          </p>
        </div>
      </div>

      {/* Speaking Pace Chart */}
      <div className="mt-8 bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)]">
        <h2 className="text-xl font-bold text-[var(--primary)] mb-4">Speaking Pace Visualization</h2>
        <div className={styles.scrollContainer}>
          <div className="min-w-[600px] h-[300px] relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-[var(--foreground)] opacity-70 text-sm">
              <span>200</span>
              <span>175</span>
              <span className="text-[var(--success)]">Ideal Max</span>
              <span className="text-[var(--success)]">Ideal Min</span>
              <span>100</span>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute left-12 right-0 bottom-0 flex justify-between text-[var(--foreground)] opacity-70 text-sm">
              <span>0:00</span>
              <span>0:30</span>
              <span>1:00</span>
              <span>1:30</span>
              <span>2:00</span>
              <span>2:30</span>
              <span>3:00</span>
            </div>
            
            {/* Grid Lines */}
            <div className="absolute left-12 right-0 top-0 bottom-6 grid grid-rows-4 grid-cols-6">
              {Array(28).fill().map((_, i) => (
                <div key={i} className="border-[var(--border)] border-dashed"></div>
              ))}
            </div>
            
            {/* Ideal Range Bands */}
            <div className="absolute left-12 right-0 top-[40%] h-[20%] bg-[var(--muted)] opacity-20"></div>
            
            {/* Chart Line */}
            <svg className="absolute left-12 right-0 top-0 bottom-6 w-[calc(100%-48px)] h-[calc(100%-24px)]" viewBox="0 0 600 270" preserveAspectRatio="none">
              <path d="M0,200 C30,150 90,120 150,80 S270,50 300,100 S400,20 450,70 S550,220 600,230" stroke="var(--success)" strokeWidth="3" fill="none" />
              <circle cx="0" cy="200" r="4" fill="var(--success)" />
              <circle cx="90" cy="120" r="4" fill="var(--success)" />
              <circle cx="180" cy="80" r="4" fill="var(--success)" />
              <circle cx="270" cy="100" r="4" fill="var(--success)" />
              <circle cx="360" cy="70" r="4" fill="var(--success)" />
              <circle cx="450" cy="120" r="4" fill="var(--success)" />
              <circle cx="600" cy="230" r="4" fill="var(--success)" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Filler Word Heatmap */}
      <div className="mt-8 bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)]">
        <h2 className="text-xl font-bold text-[var(--primary)] mb-4">Filler Word Intensity</h2>
        <div className={styles.scrollContainer}>
          <div className="min-w-[600px]">
            {/* Heatmap visualization */}
            <div className="relative h-20 mb-4">
              <div className="absolute inset-0 bg-[var(--muted)] rounded">
                {/* Colored segments representing filler word intensity */}
                <div className="flex h-full">
                  <div className="w-[3%] bg-[var(--error-light)]"></div>
                  <div className="w-[4%] bg-[var(--error-lighter)]"></div>
                  <div className="w-[3%] bg-[var(--background)]"></div>
                  <div className="w-[5%] bg-[var(--error-lighter)]"></div>
                  <div className="w-[3%] bg-[var(--error-light)]"></div>
                  <div className="w-[4%] bg-[var(--background)]"></div>
                  <div className="w-[6%] bg-[var(--error-medium)]"></div>
                  <div className="w-[4%] bg-[var(--error-lighter)]"></div>
                  <div className="w-[3%] bg-[var(--background)]"></div>
                  <div className="w-[5%] bg-[var(--error-lighter)]"></div>
                  <div className="w-[4%] bg-[var(--error)]"></div>
                  <div className="w-[3%] bg-[var(--error-lighter)]"></div>
                  <div className="w-[5%] bg-[var(--background)]"></div>
                  <div className="w-[4%] bg-[var(--error-lighter)]"></div>
                  <div className="w-[3%] bg-[var(--background)]"></div>
                  <div className="w-[5%] bg-[var(--error-light)]"></div>
                  <div className="w-[4%] bg-[var(--error-lighter)]"></div>
                  <div className="w-[3%] bg-[var(--background)]"></div>
                  <div className="w-[5%] bg-[var(--error-light)]"></div>
                  <div className="w-[4%] bg-[var(--background)]"></div>
                  <div className="w-[3%] bg-[var(--error-light)]"></div>
                  <div className="w-[5%] bg-[var(--background)]"></div>
                  <div className="w-[4%] bg-[var(--error-light)]"></div>
                  <div className="w-[7%] bg-[var(--background)]"></div>
                </div>
              </div>
            </div>
            
            {/* Time markers */}
            <div className="flex justify-between text-[var(--foreground)] opacity-80 text-sm">
              <span>0:00</span>
              <span>1:30</span>
              <span>3:00</span>
            </div>
            
            {/* Legend */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center">
                <span className="text-[var(--foreground)] opacity-80 text-sm mr-2">Filler Intensity:</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-[var(--background)] border border-[var(--border)] mr-1"></div>
                <span className="text-sm text-[var(--foreground)] opacity-80">None</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-[var(--error-light)] mr-1"></div>
                <span className="text-sm text-[var(--foreground)] opacity-80">Low</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-[var(--error-medium)] mr-1"></div>
                <span className="text-sm text-[var(--foreground)] opacity-80">Medium</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-[var(--error)] mr-1"></div>
                <span className="text-sm text-[var(--foreground)] opacity-80">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Coaching Section */}
      <h2 className="text-xl font-bold text-[var(--primary-dark)] mt-10 mb-4">Personalized Coaching</h2>
      
      {/* Coaching Card 1 */}
      <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)] mb-6">
        <h3 className="text-lg font-semibold text-[var(--accent)] mb-4">Speaking Pace Improvement</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--error)] mb-2">Current:</p>
            <div className="bg-[var(--error-light)] p-4 rounded-md">
              <p className="text-sm text-[var(--foreground)]">
                {textAnalysis.speaking_rate > 150 ?
                  `Speaking rate of ${textAnalysis.speaking_rate} WPM is slightly fast` :
                  textAnalysis.speaking_rate < 120 ?
                  `Speaking rate of ${textAnalysis.speaking_rate} WPM is slightly slow` :
                  `Speaking rate of ${textAnalysis.speaking_rate} WPM is good`}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--success)] mb-2">Target:</p>
            <div className="bg-[var(--success-light)] p-4 rounded-md">
              <p className="text-sm text-[var(--foreground)]">
                Aim for 120-150 WPM for optimal comprehension and engagement
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Coaching Card 2 */}
      <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)] mb-6">
        <h3 className="text-lg font-semibold text-[var(--success)] mb-4">Vocal Confidence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--error)] mb-2">Current:</p>
            <div className="bg-[var(--error-light)] p-4 rounded-md">
              <p className="text-sm text-[var(--foreground)]">
                {(acousticFeatures.energy_mean || 0) * 1000 > 80 ? 'Strong vocal projection detected' :
                 (acousticFeatures.energy_mean || 0) * 1000 > 60 ? 'Moderate vocal projection' : 
                 'Low vocal energy detected in your speech'}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--success)] mb-2">Recommendation:</p>
            <div className="bg-[var(--success-light)] p-4 rounded-md">
              <p className="text-sm text-[var(--foreground)]">
                Practice diaphragmatic breathing and vocal exercises to improve projection
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.feedbackSection}>
        <h2>AI Feedback</h2>
        <div className={styles.feedbackCard}>
          <h3>Summary</h3>
          <p>{llmFeedback.summary_feedback || 'No summary available'}</p>
        </div>

        <div className={styles.feedbackColumns}>
          <div className={styles.feedbackCard}>
            <h3>Content Suggestions</h3>
            <div>
              {llmFeedback.text_suggestions ? (
                Array.isArray(llmFeedback.text_suggestions) ? 
                  <ul className="list-disc pl-5 space-y-2">
                    {llmFeedback.text_suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul> : 
                  <p>{llmFeedback.text_suggestions}</p>
              ) : (
                <p>No content suggestions available</p>
              )}
            </div>
          </div>

          <div className={styles.feedbackCard}>
            <h3>Delivery Suggestions</h3>
            <div>
              {llmFeedback.voice_suggestions ? (
                Array.isArray(llmFeedback.voice_suggestions) ? 
                  <ul className="list-disc pl-5 space-y-2">
                    {llmFeedback.voice_suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul> : 
                  <p>{llmFeedback.voice_suggestions}</p>
              ) : (
                <p>No delivery suggestions available</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.feedbackCard}>
          <h3>Recommendations</h3>
          <ul>
            {llmFeedback.recommendations ? (
              Array.isArray(llmFeedback.recommendations) ? 
                llmFeedback.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                )) : 
                <li>{llmFeedback.recommendations}</li>
            ) : (
              <li>No recommendations available</li>
            )}
          </ul>
        </div>
      </div>

      {/* Transcript with Highlights Section */}
      <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)] mt-8 mb-6">
        <h2 className="text-xl font-bold text-[var(--primary-dark)] mb-4">Transcript</h2>
        <div className="text-[var(--foreground)] p-4 bg-[var(--muted)] bg-opacity-30 rounded-lg max-h-[400px] overflow-y-auto">
          <p className="whitespace-pre-wrap">{transcript}</p>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <Link href="/record" className={styles.recordButton}>
          Record New Speech
        </Link>
        <Link href="/dashboard" className={styles.dashboardButton}>
          View Dashboard
        </Link>
      </div>
    </div>
  );
}