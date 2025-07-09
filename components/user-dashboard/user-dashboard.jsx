import styles from './dashboard.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function UserDashboard() {
  const { data: session } = useSession();
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
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--accent)] mb-1 sm:mb-2">92%</h2>
          <p className="text-[var(--foreground)] text-base sm:text-lg">Excellent! Keep it up.</p>
        </div>
        {/* Recent Activity Card */}
        <div className="bg-gradient-to-br from-[var(--muted)] to-[var(--background)] rounded-2xl p-6 sm:p-8 shadow-xl border border-[var(--border)] flex flex-col items-start min-h-[180px] sm:min-h-[220px] w-full">
          <div className="flex justify-between items-center w-full mb-3 sm:mb-4">
            <span className="text-[var(--foreground)] text-base sm:text-lg font-semibold">Recent Activity</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <ul className="text-[var(--foreground)] text-sm sm:text-base list-disc pl-4 sm:pl-5 space-y-1 w-full">
            <li>Uploaded: <span className="font-semibold">Pitch_2025.mp3</span> <span className="text-xs opacity-60">(2 days ago)</span></li>
            <li>Analyzed: <span className="font-semibold">Interview_1.wav</span> <span className="text-xs opacity-60">(5 days ago)</span></li>
            <li>Score improved by <span className="text-[var(--accent)] font-bold">+7%</span></li>
          </ul>
          <Link href="/history" className="mt-3 sm:mt-4 text-[var(--primary)] hover:underline text-xs sm:text-sm">View Full History</Link>
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
            <div className="flex items-center justify-between mb-1">
              <span className="text-[var(--foreground)] text-xs sm:text-sm">Current Streak</span>
              <span className="text-[var(--accent)] font-bold text-xs sm:text-base">4 days</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[var(--foreground)] text-xs sm:text-sm">Total Analyses</span>
              <span className="text-[var(--primary)] font-bold text-xs sm:text-base">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--foreground)] text-xs sm:text-sm">Avg. Score</span>
              <span className="text-[var(--secondary)] font-bold text-xs sm:text-base">85%</span>
            </div>
          </div>
        </div>
      </div>
      {/* Speaking Pace Progress */}
      <div className={`${styles.chartContainer} mt-8 relative`}> 
        <h2 className="text-lg font-semibold text-[var(--primary)] mb-6">Speaking Pace Progress</h2>
        
        {/* Chart Container */}
        <div className="relative h-64 overflow-visible">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-[var(--foreground-muted)] pr-2">
            <span>180 WPM</span>
            <span>160 WPM</span>
            <span>140 WPM</span>
            <span>120 WPM</span>
          </div>

          Chart Area
          <div className="ml-16 h-full relative">
            {/* Grid lines */}
            <div className="absolute w-full h-full grid grid-rows-3 gap-0">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-t border-[var(--border)] relative">
                  <div className="absolute left-0 w-full h-full border-t border-[var(--border)] opacity-30"></div>
                </div>
              ))}
            </div>

            {/* Ideal Range Band */}
            <div className="absolute top-1/3 h-1/3 w-full bg-[var(--success-light)] bg-opacity-10 rounded"></div>

            {/* Chart Line */}
            
          </div>

          {/* X-axis labels */}
          <div className="ml-16 mt-2 flex justify-between text-sm text-[var(--foreground-muted)]">
            <span>Jan 1</span>
            <span>Jan 7</span>
            <span>Jan 14</span>
            <span>Jan 21</span>
            <span>Jan 28</span>
            <span>Feb 4</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-17 flex flex-col sm:flex-row items-center sm:justify-end gap-3 sm:gap-6 text-sm">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <div className="w-4 h-4 rounded bg-[var(--success-light)] bg-opacity-30 border border-[var(--success)]"></div>
            <span className="text-[var(--success)] whitespace-nowrap">Ideal Range (130-150 WPM)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 rounded bg-[var(--accent)]"></div>
            <span className="text-[var(--foreground-muted)] whitespace-nowrap">Your Progress</span>
          </div>
        </div>
      </div>
        
      {/* Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)] bg-opacity-10 flex items-center justify-center">
              <span className="text-[var(--accent)] text-xl">↗</span>
            </div>
            <div>
              <p className="text-[var(--foreground)] font-medium">Speaking Pace</p>
              <p className="text-[var(--foreground)] text-sm opacity-80">Improved by 15%</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
              <span className="text-[var(--primary)] text-xl">↘</span>
            </div>
            <div>
              <p className="text-[var(--foreground)] font-medium">Filler Words</p>
              <p className="text-[var(--foreground)] text-sm opacity-80">Reduced by 30%</p>
            </div>
          </div>
      </div>

      {/* Filler Word Intensity */}
      <div className={`${styles.chartContainer} mt-16`}>
        <h2 className="text-lg font-semibold text-[var(--primary)] mb-6">Filler Word Intensity</h2>
        
        {/* Heatmap */}
        <div className="space-y-6">
          {/* Time Segments */}
          <div className="grid grid-cols-6 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-20 grid grid-rows-4 gap-1">
                  {[...Array(4)].map((_, j) => {
                    const intensities = [
                      'bg-[var(--error-lighter)]',
                      'bg-[var(--error-light)]',
                      'bg-[var(--error-medium)]',
                      'bg-[var(--error)]'
                    ];
                    const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];
                    return (
                      <div
                        key={j}
                        className={`rounded ${randomIntensity} opacity-${Math.random() > 0.5 ? '30' : '60'}`}
                      ></div>
                    );
                  })}
                </div>
                <span className="text-xs text-[var(--foreground-muted)] block text-center">
                  {`${i * 30}s`}
                </span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[var(--error-lighter)]"></div>
                <span className="text-[var(--foreground-muted)]">Low</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[var(--error-light)]"></div>
                <span className="text-[var(--foreground-muted)]">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[var(--error-medium)]"></div>
                <span className="text-[var(--foreground-muted)]">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[var(--error)]"></div>
                <span className="text-[var(--foreground-muted)]">Very High</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Performance Analysis */}
      <div className={`mt-8 ${styles.chartContainer}`}>
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--primary)] mb-6">Recent Performance Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Analysis Card 1 */}
          <div className="bg-gradient-to-br from-[var(--muted)] to-[var(--background)] rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-[var(--success)] mb-3">Speaking Pace Improvement</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[var(--error)] mb-2">Previous:</p>
                <div className="bg-[var(--error-light)] p-3 rounded-md">
                  <p className="text-sm text-[var(--foreground)]">Average pace: 175 WPM (too fast)</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--success)] mb-2">Current:</p>
                <div className="bg-[var(--success-light)] p-3 rounded-md">
                  <p className="text-sm text-[var(--foreground)]">Average pace: 145 WPM (optimal)</p>
                </div>
              </div>
            </div>
          </div>
          {/* Analysis Card 2 */}
          <div className="bg-gradient-to-br from-[var(--muted)] to-[var(--background)] rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Filler Word Reduction</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[var(--error)] mb-2">Previous:</p>
                <div className="bg-[var(--error-light)] p-3 rounded-md">
                  <p className="text-sm text-[var(--foreground)]">15 filler words per minute</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--success)] mb-2">Current:</p>
                <div className="bg-[var(--success-light)] p-3 rounded-md">
                  <p className="text-sm text-[var(--foreground)]">8 filler words per minute</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Coaching */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-[var(--primary)] mb-6">Personalized Coaching</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Speaking Pace Tips */}
          <div className="bg-[var(--background)] rounded-lg p-6 border border-[var(--border)] space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-[var(--primary)]">Speaking Pace</h3>
                <p className="text-sm text-[var(--foreground-muted)]">Current: 145 WPM</p>
              </div>
              <div className="text-right">
                <span className="text-[var(--success)] font-medium">+5%</span>
                <p className="text-xs text-[var(--foreground-muted)]">vs. last week</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-[var(--background)] rounded border border-[var(--border)] relative">
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--error)] rounded"></div>
                <p className="text-sm text-[var(--foreground-muted)]">"During your product demo, you spoke at 165 WPM, which might be too fast for clear understanding."</p>
              </div>
              
              <div className="p-3 bg-[var(--background)] rounded border border-[var(--border)] relative">
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--success)] rounded"></div>
                <p className="text-sm text-[var(--foreground-muted)]">"In your team update, you maintained an ideal pace of 140 WPM, making your message clear and engaging."</p>
              </div>
            </div>
            
            <div className="text-sm text-[var(--primary)]">
              <h4 className="font-medium mb-2">Recommendations:</h4>
              <ul className="list-disc list-inside space-y-1 text-[var(--foreground-muted)]">
                <li>Practice with longer pauses between key points</li>
                <li>Monitor your pace during technical explanations</li>
                <li>Use the metronome feature in practice mode</li>
              </ul>
            </div>
          </div>
          
          {/* Vocal Confidence */}
          <div className="bg-[var(--background)] rounded-lg p-6 border border-[var(--border)] space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-[var(--primary)]">Vocal Confidence</h3>
                <p className="text-sm text-[var(--foreground-muted)]">Score: 8.5/10</p>
              </div>
              <div className="text-right">
                <span className="text-[var(--success)] font-medium">+0.5</span>
                <p className="text-xs text-[var(--foreground-muted)]">vs. last week</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-[var(--background)] rounded border border-[var(--border)] relative">
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--success)] rounded"></div>
                <p className="text-sm text-[var(--foreground-muted)]">"Your voice projection and tone variety during the client presentation were excellent."</p>
              </div>
              
              <div className="p-3 bg-[var(--background)] rounded border border-[var(--border)] relative">
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--accent)] rounded"></div>
                <p className="text-sm text-[var(--foreground-muted)]">"Consider varying your pitch more when emphasizing key achievements."</p>
              </div>
            </div>
            
            <div className="text-sm text-[var(--primary)]">
              <h4 className="font-medium mb-2">Focus Areas:</h4>
              <ul className="list-disc list-inside space-y-1 text-[var(--foreground-muted)]">
                <li>Practice dynamic range in emphasis</li>
                <li>Maintain strong projection throughout</li>
                <li>Work on confident closing statements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Coaching Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {/* Speaking Pace Tips */}
        <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--success)] bg-opacity-10 flex items-center justify-center">
              <span className="text-[var(--success)] text-xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-[var(--success)]">Speaking Pace Tips</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-[var(--success-light)] bg-opacity-10 rounded-lg">
              <p className="text-[var(--foreground)] font-medium mb-2">Current Pace</p>
              <p className="text-[var(--foreground)] text-sm opacity-80">Your speaking pace is slightly faster than ideal. Try to slow down during key points.</p>
            </div>
            <div className="p-4 bg-[var(--success)] bg-opacity-5 rounded-lg">
              <p className="text-[var(--foreground)] font-medium mb-2">Recommendation</p>
              <p className="text-[var(--foreground)] text-sm opacity-80">Practice pausing for 1-2 seconds between main ideas to improve clarity.</p>
            </div>
          </div>
        </div>

        {/* Vocal Confidence */}
        <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
              <span className="text-[var(--primary)] text-xl">🎤</span>
            </div>
            <h3 className="text-lg font-semibold text-[var(--primary)]">Vocal Confidence</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-[var(--primary-light)] bg-opacity-10 rounded-lg">
              <p className="text-[var(--foreground)] font-medium mb-2">Voice Analysis</p>
              <p className="text-[var(--foreground)] text-sm opacity-80">Your voice modulation shows good variation. Keep working on maintaining consistent energy.</p>
            </div>
            <div className="p-4 bg-[var(--primary)] bg-opacity-5 rounded-lg">
              <p className="text-[var(--foreground)] font-medium mb-2">Next Steps</p>
              <p className="text-[var(--foreground)] text-sm opacity-80">Try emphasizing key words to add more impact to your presentations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript with Highlights Section */}
      <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm border border-[var(--border)] mt-8 mb-6">
        <h2 className="text-xl font-bold text-[var(--primary-dark)] mb-4">Latest Recording Transcript</h2>
        <div className="text-[var(--foreground)] space-y-4">
          <p>
            In my presentation about <span className="bg-[var(--error-light)] px-1 rounded">market trends</span> and <span className="bg-[var(--warning-light)] px-1 rounded">um</span> consumer behavior, I focused on <span className="bg-[var(--error-light)] px-1 rounded">emerging patterns</span>. <span className="bg-[var(--warning-light)] px-1 rounded">Uh</span> the data shows that <span className="bg-[var(--error-light)] px-1 rounded">digital transformation</span> is <span className="bg-[var(--error-light)] px-1 rounded">accelerating rapidly</span> across all sectors.
          </p>
          <p>
            We've observed <span className="bg-[var(--warning-light)] px-1 rounded">um</span> significant changes in <span className="bg-[var(--error-light)] px-1 rounded">consumer preferences</span> and <span className="bg-[var(--error-light)] px-1 rounded">purchasing behaviors</span> over the past year.
          </p>
        </div>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[var(--error-lighter)] mr-2"></div>
            <span className="text-sm text-[var(--foreground-muted)]">Key phrases</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[var(--warning-light)] mr-2"></div>
            <span className="text-sm text-[var(--foreground-muted)]">Filler words</span>
          </div>
        </div>
      </div>
    </div>
  );
}
