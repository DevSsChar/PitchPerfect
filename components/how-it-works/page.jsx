'use client';

import styles from './how.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function HowItWorks() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold text-[var(--primary)] mb-6">How PitchPerfect Works</h1>
          <p className="text-xl text-[var(--foreground)] opacity-80 mb-8 leading-relaxed">
            Three simple steps to transform your presentation skills with AI-powered insights and personalized coaching.
          </p>
          <Link href="/record">
            <button className={styles.btn}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1">
                <polygon points="6 3 20 12 6 21 6 3"></polygon>
              </svg>
              Try It Now
            </button>
          </Link>
        </div>
      </section>

      {/* Three Steps Section */}
      <section className={styles.stepSection}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-2">How It Works</h2>
          <p className="text-center text-[var(--foreground)] opacity-80 mb-12 max-w-2xl mx-auto">
            Three simple steps to transform your presentation skills with AI-powered insights
          </p>
          
          <div className={styles.stepContainer}>
            {/* Step 1 Card */}
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <div className={styles.stepIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-3">Record Your Presentation</h3>
              <p className="text-[var(--foreground)] opacity-80 mb-6">
                Click the microphone button and practice your speech naturally.
                Our AI listens and captures every detail of your delivery.
              </p>
              <ul className="text-left space-y-2 w-full text-[var(--foreground)]">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full mr-3"></div>
                  <span className="text-sm">Browser-based recording</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full mr-3"></div>
                  <span className="text-sm">Practice anywhere, anytime</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full mr-3"></div>
                  <span className="text-sm">Secure, private processing</span>
                </li>
              </ul>
            </div>

            {/* Step 2 Card */}
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <div className={styles.stepIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-3">AI Analyzes Your Performance</h3>
              <p className="text-[var(--foreground)] opacity-80 mb-6">
                Our advanced algorithms process your speech patterns, 
                identifying key metrics that impact presentation effectiveness.
              </p>
              <ul className="text-left space-y-2 w-full text-[var(--foreground)]">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full mr-3"></div>
                  <span className="text-sm">Real-time speech pattern analysis</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full mr-3"></div>
                  <span className="text-sm">Filler word detection</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full mr-3"></div>
                  <span className="text-sm">Vocal confidence assessment</span>
                </li>
              </ul>
            </div>

            {/* Step 3 Card */}
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <div className={styles.stepIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <path d="M14 2v6h6"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                  <path d="M10 9H8"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-3">Get Personalized Coaching</h3>
              <p className="text-[var(--foreground)] opacity-80 mb-6">
                Receive detailed insights and actionable recommendations
                tailored to your specific speaking patterns.
              </p>
              <ul className="text-left space-y-2 w-full text-[var(--foreground)]">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full mr-3"></div>
                  <span className="text-sm">Custom coaching tips for your style</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full mr-3"></div>
                  <span className="text-sm">Interactive visualizations</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full mr-3"></div>
                  <span className="text-sm">Progress tracking over time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Analysis Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${styles.analysisSection}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-4">What Our AI Analyzes</h2>
          <p className="text-center text-[var(--foreground)] opacity-80 mb-12 max-w-2xl mx-auto">
            Comprehensive metrics that matter for effective presentations
          </p>

          <div className={styles.metricsGrid}>
            {/* Metric 1 */}
            <div className={styles.metricCard}>
              <div className={`${styles.metricIcon} bg-gradient-to-br from-[var(--muted)] to-[var(--background)]`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Speaking Pace</h3>
              <p className="text-[var(--foreground)] opacity-80 text-sm">
                Optimal range is 130-150 words per minute for clarity and engagement
              </p>
            </div>

            {/* Metric 2 */}
            <div className={styles.metricCard}>
              <div className={`${styles.metricIcon} bg-gradient-to-br from-[var(--muted)] to-[var(--background)]`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)]">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <path d="M7 7h.01"></path>
                  <path d="M11 7h.01"></path>
                  <path d="M15 7h.01"></path>
                  <path d="M7 11h.01"></path>
                  <path d="M11 11h.01"></path>
                  <path d="M15 11h.01"></path>
                  <path d="M7 15h.01"></path>
                  <path d="M11 15h.01"></path>
                  <path d="M15 15h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Filler Words</h3>
              <p className="text-[var(--foreground)] opacity-80 text-sm">
                Track 'um', 'uh', 'like' and other hesitations with precise timing
              </p>
            </div>

            {/* Metric 3 */}
            <div className={styles.metricCard}>
              <div className={`${styles.metricIcon} bg-gradient-to-br from-[var(--muted)] to-[var(--background)]`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--secondary)]">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--primary)] mb-2">Vocal Confidence</h3>
              <p className="text-[var(--foreground)] opacity-80 text-sm">
                Measure voice steadiness, volume consistency, and assertion levels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${styles.resultsSection}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-4">See Real Results</h2>
          <p className="text-center text-[var(--foreground)] opacity-80 mb-12 max-w-2xl mx-auto">
            Example of detailed feedback you'll receive after each session
          </p>

          <div className={styles.resultsCard}>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-6">Performance Summary</h3>
                  
                  <div className={styles.performanceMetrics}>
                    <div className={styles.metricRow}>
                      <span className="text-[var(--foreground)]">Overall Score</span>
                      <span className="text-[var(--accent)] font-semibold text-lg">78%</span>
                    </div>
                    <div className={styles.metricRow}>
                      <span className="text-[var(--foreground)]">Speaking Pace</span>
                      <span className="text-[var(--secondary)] font-semibold">160 WPM</span>
                    </div>
                    <div className={styles.metricRow}>
                      <span className="text-[var(--foreground)]">Filler Density</span>
                      <span className="text-[var(--accent)] font-semibold">3.2%</span>
                    </div>
                    <div className={styles.metricRow}>
                      <span className="text-[var(--foreground)]">Confidence Level</span>
                      <span className="text-[var(--accent)] font-semibold">75%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[var(--primary)] mb-6">Top Coaching Tip</h3>
                  
                  <div className={styles.coachingTip}>
                    <h4 className={styles.tipHeader}>Slow Down Your Pace</h4>
                    <p className="text-[var(--foreground)] opacity-80 text-sm mb-4">
                      Your speaking rate of 160 WPM is above the ideal range.
                      Try pausing for 2-3 seconds between key points.
                    </p>
                    <button className="bg-[var(--accent)] text-[var(--background)] px-5 py-2 rounded-md text-sm hover:opacity-90 transition-colors duration-300">
                      Apply This Tip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${styles.ctaSection}`}>
        <div className="max-w-5xl mx-auto">
          <div className={styles.cta}>
            <h2 className="text-3xl font-bold mb-6 text-[var(--primary)]">Ready to Transform Your Presentations?</h2>
            <p className="text-lg text-[var(--foreground)] opacity-80 mb-8 max-w-xl mx-auto">
              Experience the complete process yourself - record, analyze, and improve in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/record">
                <button className={styles.btn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                  Start Your First Session
                </button>
              </Link>
              <Link href="/features">
                <button className={styles.btnOutline}>
                  Explore All Features
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}