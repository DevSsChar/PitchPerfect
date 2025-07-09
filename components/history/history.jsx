'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from './history.module.css';
import { formatDistanceToNow } from 'date-fns';

export default function History() {
  const { data: session } = useSession();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('server'); // 'server' or 'browser'

  useEffect(() => {
    // Fetch history data when component mounts or session changes
    if (session) {
      fetchHistory();
    }
  }, [session, dataSource]);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      if (dataSource === 'server') {
        // Fetch from server API
        const response = await fetch('/api/history');
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        setHistory(data);
      } else {
        // Fetch from localStorage
        const localData = localStorage.getItem('browserAnalyses');
        if (localData) {
          setHistory(JSON.parse(localData));
        } else {
          setHistory([]);
        }
      }
    } catch (err) {
      console.error('Error fetching history:', err);
      setError('Failed to load history. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDataSource = () => {
    setDataSource(prev => prev === 'server' ? 'browser' : 'server');
  };

  if (loading) {
    return <div className={styles.loading}>Loading your speech history...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!session) {
    return <div className={styles.notSignedIn}>Please sign in to view your history.</div>;
  }

  if (history.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.dataSourceToggle}>
          <button 
            className={`${styles.toggleButton} ${dataSource === 'server' ? styles.activeButton : ''}`}
            onClick={() => setDataSource('server')}
          >
            Server Analysis
          </button>
          <button 
            className={`${styles.toggleButton} ${dataSource === 'browser' ? styles.activeButton : ''}`}
            onClick={() => setDataSource('browser')}
          >
            Browser Analysis
          </button>
        </div>
        <div className={styles.noHistory}>
          <p>You haven't analyzed any speeches yet.</p>
          <Link href="/record" className={styles.recordButton}>
            Record Your First Speech
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.dataSourceToggle}>
        <button 
          className={`${styles.toggleButton} ${dataSource === 'server' ? styles.activeButton : ''}`}
          onClick={() => setDataSource('server')}
        >
          Server Analysis
        </button>
        <button 
          className={`${styles.toggleButton} ${dataSource === 'browser' ? styles.activeButton : ''}`}
          onClick={() => setDataSource('browser')}
        >
          Browser Analysis
        </button>
      </div>
      
      <div className={styles.historyList}>
        {history.map((item) => (
          <div key={item.id} className={styles.historyItem}>
            <div className={styles.historyHeader}>
              <h3 className={styles.fileName}>{item.file_name}</h3>
              <span className={styles.date}>
                {dataSource === 'server' 
                  ? formatDistanceToNow(new Date(item.created_at), { addSuffix: true })
                  : formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
              </span>
            </div>
            
            <div className={styles.scoreContainer}>
              <div className={styles.scoreCircle} style={{ 
                background: `conic-gradient(#4CAF50 ${item.overall_score}%, #f3f3f3 0)` 
              }}>
                <span className={styles.scoreText}>{item.overall_score}</span>
              </div>
              <div className={styles.scoreLabel}>Overall Score</div>
            </div>
            
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Duration</span>
                <span className={styles.metricValue}>
                  {typeof item.audio_duration === 'number' 
                    ? `${Math.floor(item.audio_duration / 60)}:${String(Math.floor(item.audio_duration % 60)).padStart(2, '0')}` 
                    : item.audio_duration}
                </span>
              </div>
              
              <div className={styles.metric}>
                <span className={styles.metricLabel}>Word Count</span>
                <span className={styles.metricValue}>{item.word_count}</span>
              </div>
              
              {dataSource === 'browser' && item.metrics && (
                <>
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Pace (WPM)</span>
                    <span className={styles.metricValue}>{item.metrics.pace.wpm}</span>
                  </div>
                  
                  <div className={styles.metric}>
                    <span className={styles.metricLabel}>Filler Words</span>
                    <span className={styles.metricValue}>
                      {Object.values(item.metrics.filler_words.count).reduce((a, b) => a + b, 0)}
                    </span>
                  </div>
                </>
              )}
            </div>
            
            {item.summary && (
              <div className={styles.summary}>
                <h4>Summary</h4>
                <p>{item.summary}</p>
              </div>
            )}
            
            <div className={styles.actions}>
              {dataSource === 'server' ? (
                <Link href={`/analysis/${item.id}`} className={styles.viewButton}>
                  View Details
                </Link>
              ) : (
                <div className={styles.browserAnalysisActions}>
                  {item.audio_url && (
                    <audio 
                      controls 
                      src={item.audio_url} 
                      className={styles.audioPlayer}
                    />
                  )}
                  <button 
                    className={styles.deleteButton}
                    onClick={() => {
                      // Remove this analysis from localStorage
                      const localData = JSON.parse(localStorage.getItem('browserAnalyses') || '[]');
                      const updatedData = localData.filter(analysis => analysis.id !== item.id);
                      localStorage.setItem('browserAnalyses', JSON.stringify(updatedData));
                      // Update state
                      setHistory(updatedData);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}