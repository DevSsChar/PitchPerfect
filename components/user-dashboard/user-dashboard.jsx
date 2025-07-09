import styles from './dashboard.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const { data: session } = useSession();
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overallImprovement, setOverallImprovement] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;
      
      try {
        // Fetch history data
        const historyResponse = await fetch('/api/history');
        if (!historyResponse.ok) {
          throw new Error(`Error fetching history: ${historyResponse.statusText}`);
        }
        const historyResult = await historyResponse.json();
        setHistoryData(historyResult.history || []);
        
        // If there's at least one analysis, fetch the latest one
        if (historyResult.history && historyResult.history.length > 0) {
          const latestId = historyResult.history[0].id;
          const analysisResponse = await fetch(`/api/analysis/${latestId}`);
          if (!analysisResponse.ok) {
            throw new Error(`Error fetching analysis: ${analysisResponse.statusText}`);
          }
          const analysisResult = await analysisResponse.json();
          setLatestAnalysis(analysisResult);
          
          // Calculate overall improvement if there are multiple analyses
          if (historyResult.history.length > 1) {
            const scores = historyResult.history
              .map(item => item.overall_score)
              .filter(score => score !== 'N/A' && !isNaN(Number(score)));
            
            if (scores.length >= 2) {
              const firstScore = Number(scores[scores.length - 1]);
              const latestScore = Number(scores[0]);
              const improvement = latestScore - firstScore;
              setOverallImprovement(improvement);
            }
          }
        } else {
          // If no analysis is available, use demo.json as fallback
          const demoResponse = await fetch('/demo.json');
          if (!demoResponse.ok) {
            throw new Error(`Error fetching demo data: ${demoResponse.statusText}`);
          }
          const demoData = await demoResponse.json();
          
          // Create a mock analysis result using demo data
          const mockAnalysis = {
            id: 'demo',
            file_name: 'Demo Speech Analysis',
            created_at: new Date().toISOString(),
            audio_duration: demoData.audio_duration,
            results: demoData
          };
          
          setLatestAnalysis(mockAnalysis);
          
          // Create a mock history entry
          const mockHistoryEntry = {
            id: 'demo',
            user_id: session?.user?.id || 'demo-user',
            file_name: 'Demo Speech Analysis',
            created_at: new Date().toISOString(),
            overall_score: demoData.llm_feedback?.overall_score || 'N/A',
            word_count: demoData.text_analysis?.word_count || 'N/A',
            summary: demoData.llm_feedback?.summary_feedback || 'Demo analysis'
          };
          
          setHistoryData([mockHistoryEntry]);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err.message);
        
        // Try to load demo.json as a last resort fallback
        try {
          const demoResponse = await fetch('/demo.json');
          if (demoResponse.ok) {
            const demoData = await demoResponse.json();
            
            // Create a mock analysis result using demo data
            const mockAnalysis = {
              id: 'demo',
              file_name: 'Demo Speech Analysis (Fallback)',
              created_at: new Date().toISOString(),
              audio_duration: demoData.audio_duration,
              results: demoData
            };
            
            setLatestAnalysis(mockAnalysis);
            setError(null); // Clear the error since we have fallback data
          }
        } catch (fallbackErr) {
          console.error('Failed to load fallback demo data:', fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [session]);
  return (
    <div className={`max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 bg-[var(--background)] min-h-[85vh] ${styles.dashboardContainer}`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-12 gap-6 md:gap-8">
        <div className="w-full md:w-auto text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--primary)] mb-2 drop-shadow-lg leading-tight">Welcome, {session?.user?.name || 'User'}!</h1>
          <p className="text-base sm:text-lg md:text-xl text-[var(--foreground)] opacity-80">Your personalized analysis dashboard</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
          <img src={session?.user?.image} alt="Profile" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[var(--secondary)] shadow-xl object-cover" />
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <span className="text-base sm:text-lg font-semibold text-[var(--foreground)] break-all">{session?.user?.email}</span>
            <Link href={"/record"}>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg text-sm sm:text-base font-semibold h-10 sm:h-12 px-4 sm:px-6 py-2 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] text-[var(--background)] shadow-md hover:opacity-90 transition-all duration-200 w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                New Recording
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Metrics Cards Grid (personalized) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-4 md:mt-6">
        {/* Best Score Card */}
        <div className="bg-gradient-to-br from-[var(--muted)] to-[var(--background)] rounded-2xl p-6 sm:p-8 shadow-xl border border-[var(--border)] flex flex-col items-start min-h-[180px] sm:min-h-[220px] w-full">
          <div className="flex justify-between items-center w-full mb-3 sm:mb-4">
            <span className="text-[var(--foreground)] text-base sm:text-lg font-semibold">Your Best Score</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--accent)] mb-1 sm:mb-2">
            {historyData.length > 0 
              ? historyData.reduce((max, item) => {
                  const score = item.overall_score !== 'N/A' ? Number(item.overall_score) : 0;
                  return score > max ? score : max;
                }, 0) + '%'
              : 'N/A'}
          </h2>
          <p className="text-[var(--foreground)] text-base sm:text-lg">
            {overallImprovement !== null 
              ? overallImprovement > 0 
                ? `Improved by ${overallImprovement.toFixed(1)}% since your first analysis!` 
                : 'Keep practicing to improve your score!'
              : 'Record more speeches to track improvement.'}
          </p>
        </div>
        {/* Recent Activity Card */}
        <div className="bg-gradient-to-br from-[var(--muted)] to-[var(--background)] rounded-2xl p-6 sm:p-8 shadow-xl border border-[var(--border)] flex flex-col items-start min-h-[180px] sm:min-h-[220px] w-full">
          <div className="flex justify-between items-center w-full mb-3 sm:mb-4">
            <span className="text-[var(--foreground)] text-base sm:text-lg font-semibold">Recent Activity</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          {historyData.length > 0 ? (
            <>
              <ul className="text-[var(--foreground)] text-sm sm:text-base list-disc pl-4 sm:pl-5 space-y-1 w-full">
                {historyData.slice(0, 3).map((item, index) => (
                  <li key={item.id}>
                    {index === 0 ? 'Latest: ' : 'Analyzed: '}
                    <span className="font-semibold">{item.file_name}</span>
                    <span className="text-xs opacity-60">
                      ({new Date(item.created_at).toLocaleDateString()})
                    </span>
                  </li>
                ))}
                {overallImprovement !== null && (
                  <li>
                    Score {overallImprovement > 0 ? 'improved' : 'changed'} by 
                    <span className={`font-bold ${overallImprovement > 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                      {overallImprovement > 0 ? '+' : ''}{overallImprovement.toFixed(1)}%
                    </span>
                  </li>
                )}
              </ul>
              <Link href="/history" className="mt-3 sm:mt-4 text-[var(--primary)] hover:underline text-xs sm:text-sm">View Full History</Link>
            </>
          ) : (
            <>
              <p className="text-[var(--foreground)] text-sm sm:text-base">No speech analysis history yet.</p>
              <Link href="/record" className="mt-3 sm:mt-4 text-[var(--primary)] hover:underline text-xs sm:text-sm">Record Your First Speech</Link>
            </>
          )}
        </div>
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-[var(--muted)] to-[var(--background)] rounded-2xl p-6 sm:p-8 shadow-xl border border-[var(--border)] flex flex-col items-start min-h-[180px] sm:min-h-[220px] w-full">
          <div className="flex justify-between items-center w-full mb-3 sm:mb-4">
            <span className="text-[var(--foreground)] text-base sm:text-lg font-semibold">Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]"><circle cx="12" cy="7" r="4"></circle><path d="M5.5 21a10 10 0 0 1 13 0" /></svg>
          </div>
          <div className="text-[var(--foreground)] text-sm sm:text-base space-y-1 w-full break-words">
            <div><span className="font-semibold">Name:</span> {session?.user?.name}</div>
            <div><span className="font-semibold">Email:</span> {session?.user?.email}</div>
            <div><span className="font-semibold">Provider:</span> {session?.user?.provider || 'OAuth'}</div>
          </div>
        </div>
        {/* Progress Card */}
        <div className="bg-gradient-to-br from-[var(--muted)] to-[var(--background)] rounded-2xl p-6 sm:p-8 shadow-xl border border-[var(--border)] flex flex-col items-start min-h-[180px] sm:min-h-[220px] w-full">
          <div className="flex justify-between items-center w-full mb-3 sm:mb-4">
            <span className="text-[var(--foreground)] text-base sm:text-lg font-semibold">Progress Overview</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
          </div>
          <div className="w-full mt-1 sm:mt-2">
            {historyData.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[var(--foreground)] text-xs sm:text-sm">Latest Analysis</span>
                  <span className="text-[var(--accent)] font-bold text-xs sm:text-base">
                    {new Date(historyData[0]?.created_at).toLocaleDateString() || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[var(--foreground)] text-xs sm:text-sm">Total Analyses</span>
                  <span className="text-[var(--primary)] font-bold text-xs sm:text-base">
                    {historyData.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--foreground)] text-xs sm:text-sm">Avg. Score</span>
                  <span className="text-[var(--secondary)] font-bold text-xs sm:text-base">
                    {historyData
                      .filter(item => item.overall_score !== 'N/A')
                      .map(item => Number(item.overall_score))
                      .reduce((sum, score, _, array) => sum + score / array.length, 0)
                      .toFixed(1) + '%' || 'N/A'}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-[var(--foreground)] text-sm">Record your first speech to see progress metrics.</p>
            )}
          </div>
        </div>
      </div>


      {/* Latest Analysis Section */}
      {loading ? (
        <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)] mt-8 mb-6 flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-[var(--primary)] border-r-[var(--primary-light)] border-b-[var(--primary-lighter)] border-l-[var(--primary-lighter)] rounded-full animate-spin mb-4"></div>
            <p className="text-[var(--foreground)]">Loading your analysis data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)] mt-8 mb-6">
          <h2 className="text-xl font-bold text-[var(--error)] mb-4">Error Loading Analysis</h2>
          <p className="text-[var(--foreground)]">{error}</p>
          <Link href="/record" className="mt-6 inline-block px-4 py-2 bg-[var(--primary)] text-white rounded-md">
            Try Recording Again
          </Link>
        </div>
      ) : !latestAnalysis ? (
        <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)] mt-8 mb-6">
          <h2 className="text-xl font-bold text-[var(--primary-dark)] mb-4">No Analysis Available</h2>
          <p className="text-[var(--foreground)]">You haven't analyzed any speeches yet. Record your first speech to see detailed analysis.</p>
          <Link href="/record" className="mt-6 inline-block px-4 py-2 bg-[var(--primary)] text-white rounded-md">
            Record Your First Speech
          </Link>
        </div>
      ) : (
        <>
          {/* Latest Analysis Overview */}
          <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)] mt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-xl font-bold text-[var(--primary-dark)]">Latest Analysis: {latestAnalysis.file_name || 'Untitled Speech'}</h2>
              <div className="mt-2 md:mt-0 text-sm text-[var(--foreground-muted)]">
                {new Date(latestAnalysis.created_at).toLocaleString()}
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
                <h2 className="text-4xl font-bold text-[var(--foreground)]">{latestAnalysis.results?.llm_feedback?.overall_score || 'N/A'}%</h2>
                <p className="text-[var(--foreground)] opacity-80 mt-2">
                  {latestAnalysis.results?.llm_feedback?.overall_score >= 80 ? 'Excellent performance' :
                   latestAnalysis.results?.llm_feedback?.overall_score >= 70 ? 'Good performance' :
                   latestAnalysis.results?.llm_feedback?.overall_score >= 60 ? 'Decent performance' : 'Room for improvement'}
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
                  {latestAnalysis.results?.text_analysis?.speaking_rate || 'N/A'} <span className="text-2xl font-normal">WPM</span>
                </h2>
                <p className="text-[var(--foreground)] opacity-80 mt-2">
                  {latestAnalysis.results?.text_analysis?.speaking_rate > 160 ? 'Slightly fast' :
                   latestAnalysis.results?.text_analysis?.speaking_rate < 120 ? 'Slightly slow' : 'Good pace'}
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
                <h2 className="text-4xl font-bold text-[var(--foreground)]">{latestAnalysis.results?.text_analysis?.word_count || 'N/A'}</h2>
                <p className="text-[var(--foreground)] opacity-80 mt-2">
                  {latestAnalysis.results?.text_analysis?.sentence_count ? 
                    `${latestAnalysis.results?.text_analysis?.sentence_count} sentences` : 'Total words'}
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
                  {Math.round((latestAnalysis.results?.acoustic_features?.energy_mean || 0) * 1000)}%
                </h2>
                <p className="text-[var(--foreground)] opacity-80 mt-2">
                  {(latestAnalysis.results?.acoustic_features?.energy_mean || 0) * 1000 > 80 ? 'Strong projection' :
                   (latestAnalysis.results?.acoustic_features?.energy_mean || 0) * 1000 > 60 ? 'Good projection' : 'Room for improvement'}
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
                  <p className="text-sm font-medium text-[var(--error)] mb-2">Previous:</p>
                  <div className="bg-[var(--error-light)] p-4 rounded-md">
                    <p className="text-sm text-[var(--foreground)]">
                      {latestAnalysis.results?.text_analysis?.speaking_rate > 150 ?
                        `Speaking rate of ${latestAnalysis.results?.text_analysis?.speaking_rate} WPM is slightly fast` :
                        latestAnalysis.results?.text_analysis?.speaking_rate < 120 ?
                        `Speaking rate of ${latestAnalysis.results?.text_analysis?.speaking_rate} WPM is slightly slow` :
                        `Speaking rate of ${latestAnalysis.results?.text_analysis?.speaking_rate} WPM is good`}
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
              <h3 className="text-lg font-semibold text-[var(--success)] mb-4">Filler Word Reduction</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-[var(--error)] mb-2">Current:</p>
                  <div className="bg-[var(--error-light)] p-4 rounded-md">
                    <p className="text-sm text-[var(--foreground)]">
                      {Object.keys(latestAnalysis.results?.text_analysis?.filler_words || {}).length > 0 ?
                        `Detected ${Object.keys(latestAnalysis.results?.text_analysis?.filler_words).length} types of filler words` :
                        'Low frequency of filler words detected'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--success)] mb-2">Recommendation:</p>
                  <div className="bg-[var(--success-light)] p-4 rounded-md">
                    <p className="text-sm text-[var(--foreground)]">
                      Practice pausing instead of using filler words to improve clarity
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Feedback Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[var(--primary)] mb-3">AI Feedback Summary</h3>
              <div className="bg-[var(--muted)] bg-opacity-30 p-4 rounded-lg">
                <p className="text-[var(--foreground)]">{latestAnalysis.results?.llm_feedback?.summary_feedback || 'No feedback available'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[var(--primary)] mb-3">Content Suggestions</h3>
                <div className="bg-[var(--muted)] bg-opacity-30 p-4 rounded-lg h-full">
                  <ul className="list-disc pl-5 space-y-2">
                    {latestAnalysis.results?.llm_feedback?.text_suggestions ? (
                      Array.isArray(latestAnalysis.results.llm_feedback.text_suggestions) ? 
                        latestAnalysis.results.llm_feedback.text_suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm">{suggestion}</li>
                        )) : 
                        <li className="text-sm">{latestAnalysis.results.llm_feedback.text_suggestions}</li>
                    ) : (
                      <li className="text-sm">No content suggestions available</li>
                    )}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[var(--primary)] mb-3">Delivery Suggestions</h3>
                <div className="bg-[var(--muted)] bg-opacity-30 p-4 rounded-lg h-full">
                  <ul className="list-disc pl-5 space-y-2">
                    {latestAnalysis.results?.llm_feedback?.voice_suggestions ? (
                      Array.isArray(latestAnalysis.results.llm_feedback.voice_suggestions) ? 
                        latestAnalysis.results.llm_feedback.voice_suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm">{suggestion}</li>
                        )) : 
                        <li className="text-sm">{latestAnalysis.results.llm_feedback.voice_suggestions}</li>
                    ) : (
                      <li className="text-sm">No delivery suggestions available</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Transcript Section */}
          <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)] mt-6 mb-6">
            <h2 className="text-xl font-bold text-[var(--primary-dark)] mb-4">Transcript</h2>
            <div className="text-[var(--foreground)] p-4 bg-[var(--muted)] bg-opacity-30 rounded-lg max-h-60 overflow-y-auto">
              <p>{latestAnalysis.results?.transcript || 'No transcript available'}</p>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
