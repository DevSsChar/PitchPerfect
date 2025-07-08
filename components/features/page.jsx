"use client";
import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import styles from './features.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] });

export default function Features() {
  // Animation for counting up metrics
  useEffect(() => {
    const animateMetrics = () => {
      const metricBars = document.querySelectorAll(`.${styles.metricBar}`);
      
      metricBars.forEach((bar) => {
        const target = parseInt(bar.getAttribute('data-target'));
        bar.style.width = `${target}%`;
      });
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateMetrics();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    const analyticsSection = document.querySelector(`.${styles.analyticsSection}`);
    if (analyticsSection) {
      observer.observe(analyticsSection);
    }
    
    return () => {
      if (analyticsSection) {
        observer.unobserve(analyticsSection);
      }
    };
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className={`${styles.container} ${inter.className}`}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container mx-auto px-4">
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Pitch with AI-Powered Coaching
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Harness the power of advanced AI to analyze, improve, and perfect your speaking skills.
            Get personalized feedback and transform your presentations into compelling narratives.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/record">
              <button className={styles.ctaButton}>
                Try it Free 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className={styles.capabilitiesSection}>
        <div className="container mx-auto px-4">
          <h2 className={styles.sectionTitle}>Key Capabilities</h2>
          <p className={styles.sectionSubtitle}>
            Our platform offers a comprehensive set of features designed to elevate your speaking skills and
            make your presentations stand out.
          </p>
          
          <motion.div 
            className={styles.featureGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Feature 1 */}
            <motion.div className={styles.featureCard} variants={itemVariants}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Real-time Analysis</h3>
              <p className={styles.featureDescription}>
                Get instant feedback on your delivery, pacing, clarity, and engagement as you speak.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div className={styles.featureCard} variants={itemVariants}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Content Evaluation</h3>
              <p className={styles.featureDescription}>
                Receive detailed analysis of your speech content, structure, persuasiveness, and clarity.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div className={styles.featureCard} variants={itemVariants}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Personalized Coaching</h3>
              <p className={styles.featureDescription}>
                Get tailored advice and actionable tips to improve your specific speaking challenges.
              </p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div className={styles.featureCard} variants={itemVariants}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Progress Tracking</h3>
              <p className={styles.featureDescription}>
                Monitor your improvement over time with comprehensive analytics and progress reports.
              </p>
            </motion.div>
            
            {/* Feature 5 */}
            <motion.div className={styles.featureCard} variants={itemVariants}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Audience Insights</h3>
              <p className={styles.featureDescription}>
                Understand how your presentation will likely be perceived by different audience types.
              </p>
            </motion.div>
            
            {/* Feature 6 */}
            <motion.div className={styles.featureCard} variants={itemVariants}>
              <div className={styles.featureIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Practice Scenarios</h3>
              <p className={styles.featureDescription}>
                Rehearse your pitch in various simulated environments from job interviews to keynote speeches.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className={styles.analyticsSection}>
        <div className={styles.analyticsContainer}>
          <motion.div 
            className={styles.analyticsContent}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.analyticsTitle}>Powerful Analytics & Insights</h2>
            <p className={styles.analyticsSubtitle}>
              Our advanced analytics provide deep insights into your speaking patterns, helping you
              identify strengths and areas for improvement with precision.
            </p>
            
            <ul className={styles.featureList}>
              <motion.li 
                className={styles.featureItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.featureCheckIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Detailed breakdown of vocal patterns and pitch variation
              </motion.li>
              <motion.li 
                className={styles.featureItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.featureCheckIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Sentiment analysis of audience engagement levels
              </motion.li>
              <motion.li 
                className={styles.featureItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.featureCheckIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Speech clarity and pronunciation improvement tracking
              </motion.li>
              <motion.li 
                className={styles.featureItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.featureCheckIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Comparative analysis with industry benchmarks
              </motion.li>
              <motion.li 
                className={styles.featureItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.featureCheckIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Historical performance trends and progress visualization
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div 
            className={styles.analyticsPreview}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className={styles.analyticsPreviewHeader}>
              <h3 className={styles.previewTitle}>Your Performance Dashboard</h3>
            </div>
            <div className={styles.analyticsMetrics}>
              <div className={styles.metricItem}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Clarity & Articulation</span>
                  <span className={styles.metricValue}>87%</span>
                </div>
                <div className={styles.metricBarContainer}>
                  <div className={styles.metricBar} data-target="87" style={{ width: '0%', backgroundColor: '#3b82f6' }}></div>
                </div>
              </div>
              
              <div className={styles.metricItem}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Engagement Factor</span>
                  <span className={styles.metricValue}>92%</span>
                </div>
                <div className={styles.metricBarContainer}>
                  <div className={styles.metricBar} data-target="92" style={{ width: '0%', backgroundColor: '#10b981' }}></div>
                </div>
              </div>
              
              <div className={styles.metricItem}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Pace & Timing</span>
                  <span className={styles.metricValue}>78%</span>
                </div>
                <div className={styles.metricBarContainer}>
                  <div className={styles.metricBar} data-target="78" style={{ width: '0%', backgroundColor: '#f59e0b' }}></div>
                </div>
              </div>
              
              <div className={styles.metricItem}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Content Structure</span>
                  <span className={styles.metricValue}>84%</span>
                </div>
                <div className={styles.metricBarContainer}>
                  <div className={styles.metricBar} data-target="84" style={{ width: '0%', backgroundColor: '#8b5cf6' }}></div>
                </div>
              </div>
              
              <div className={styles.metricItem}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>Overall Score</span>
                  <span className={styles.metricValue}>89%</span>
                </div>
                <div className={styles.metricBarContainer}>
                  <div className={styles.metricBar} data-target="89" style={{ width: '0%', backgroundColor: '#ec4899' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <motion.h2 
            className={styles.ctaTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Speaking Skills?
          </motion.h2>
          <motion.p 
            className={styles.ctaDescription}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of professionals who have elevated their communication with
            our AI-powered coaching platform. Start your journey today.
          </motion.p>
          <motion.div 
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/record">
              <button className={styles.primaryButton}>
                Get Started Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
            <Link href="/how-it-works">
              <button className={styles.secondaryButton}>
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
