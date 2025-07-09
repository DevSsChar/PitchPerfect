'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from './history.module.css';
import { formatDistanceToNow } from 'date-fns';

const HistoryComponent = () => {
  const { data: session, status } = useSession();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (status === 'loading') return;
      if (!session) {
        setLoading(false);
        setError('Please sign in to view your history');
        return;
      }

      try {
        const response = await fetch('/api/history');
        if (!response.ok) {
          throw new Error(`Error fetching history: ${response.statusText}`);
        }
        const data = await response.json();
        setHistoryData(data.history || []);
      } catch (err) {
        console.error('Failed to fetch history:', err);
        setError('Failed to load history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [session, status]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your speech history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Oops!</h2>
        <p>{error}</p>
        {!session && (
          <Link href="/login" className={styles.loginButton}>
            Sign In
          </Link>
        )}
      </div>
    );
  }

  if (historyData.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2>No Speech Analysis Yet</h2>
        <p>You haven't analyzed any speeches yet. Record your first speech to see your results here!</p>
        <Link href="/record" className={styles.recordButton}>
          Record Your First Speech
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.historyContainer}>
      <h1 className={styles.historyTitle}>Your Speech History</h1>
      <p className={styles.historySubtitle}>Review and compare your past performances</p>
      
      <div className={styles.historyList}>
        {historyData.map((item) => (
          <div key={item.id} className={styles.historyCard}>
            <div className={styles.historyCardHeader}>
              <h3 className={styles.historyCardTitle}>
                {item.file_name || 'Untitled Speech'}
              </h3>
              <span className={styles.historyCardDate}>
                {item.created_at ? formatDistanceToNow(new Date(item.created_at), { addSuffix: true }) : 'Date unknown'}
              </span>
            </div>
            
            <div className={styles.historyCardMetrics}>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Overall Score</span>
                <span className={styles.metricValue}>{item.overall_score || 'N/A'}</span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Duration</span>
                <span className={styles.metricValue}>
                  {item.audio_duration ? `${Math.floor(item.audio_duration / 60)}:${String(Math.floor(item.audio_duration % 60)).padStart(2, '0')}` : 'N/A'}
                </span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricLabel}>Words</span>
                <span className={styles.metricValue}>{item.word_count || 'N/A'}</span>
              </div>
            </div>
            
            <div className={styles.historyCardSummary}>
              <p>{item.summary || 'No summary available'}</p>
            </div>
            
            <Link href={`/analysis/${item.id}`} className={styles.viewDetailsButton}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryComponent;