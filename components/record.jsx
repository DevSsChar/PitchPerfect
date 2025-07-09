"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RecordPage() {
  // State management
  const [activeTab, setActiveTab] = useState('record');
  const [recordingState, setRecordingState] = useState('idle'); // idle, recording, paused, completed
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Recording functionality
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioURL(audioUrl);
        setRecordingState('completed');
        audioChunksRef.current = [];
      };
      
      audioChunksRef.current = [];
      // Request data every 1 second to ensure we capture everything
      mediaRecorderRef.current.start(1000);
      setRecordingState('recording');
      setRecordingTime(0); // Reset timer when starting a new recording
      
      // Start timer
      startTimer();
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing your microphone. Please make sure you have granted the necessary permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && (recordingState === 'recording' || recordingState === 'paused')) {
      try {
        mediaRecorderRef.current.stop();
        clearInterval(timerRef.current);
        
        // Stop all tracks on the stream
        if (mediaRecorderRef.current.stream && typeof mediaRecorderRef.current.stream.getTracks === 'function') {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      } catch (err) {
        console.error("Error stopping recording:", err);
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording' && mediaRecorderRef.current.state !== 'inactive') {
      try {
        if (typeof mediaRecorderRef.current.pause === 'function') {
          mediaRecorderRef.current.pause();
          setRecordingState('paused');
          clearInterval(timerRef.current);
        }
      } catch (err) {
        console.error("Error pausing recording:", err);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'paused' && mediaRecorderRef.current.state !== 'inactive') {
      try {
        if (typeof mediaRecorderRef.current.resume === 'function') {
          mediaRecorderRef.current.resume();
          setRecordingState('recording');
          startTimer();
        }
      } catch (err) {
        console.error("Error resuming recording:", err);
      }
    }
  };

  const startTimer = () => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Start a new timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const resetRecording = () => {
    // Clean up any existing media recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
      try {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error("Error stopping tracks:", err);
      }
    }
    
    // Clean up any existing audio URL to prevent memory leaks
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    
    // Reset state
    setRecordingState('idle');
    setAudioBlob(null);
    setAudioURL('');
    setRecordingTime(0);
    audioChunksRef.current = [];
  };

  // Format time for display (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Stop recording if active
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.stop();
          if (mediaRecorderRef.current.stream) {
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
          }
        } catch (err) {
          console.error("Error in cleanup:", err);
        }
      }
      
      // Revoke any object URLs to prevent memory leaks
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  // File upload handling
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // Check if the file is an audio file
      if (!file.type.startsWith('audio/')) {
        alert('Please upload an audio file (MP3, WAV, etc.)');
        return;
      }
      
      setUploadedFile(file);
      setAudioURL(URL.createObjectURL(file));
      setAudioBlob(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Handle analysis
  const handleAnalyze = async () => {
    if (!audioBlob) {
      alert('Please record or upload audio first');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Create form data to send to the API
      const formData = new FormData();
      
      // Add the audio file to the form data
      if (recordingState === 'completed') {
        // For recordings, use the blob directly
        const fileName = `recording_${new Date().toISOString().replace(/[:.-]/g, '_')}.webm`;
        formData.append('audioFile', audioBlob, fileName);
      } else {
        // For uploads, use the uploaded file
        formData.append('audioFile', uploadedFile);
      }
      
      // Add additional metadata
      formData.append('duration', formatTime(recordingTime));
      
      // Send the audio to the backend for analysis
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      // Parse the response
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to analyze audio');
      }
      
      // Handle successful analysis
      console.log('Analysis result:', result);
      
      // Redirect to the dashboard to show analysis results
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Error analyzing audio:', error);
      alert(`Error analyzing audio: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Add custom styles for audio player
  useEffect(() => {
    // Add custom styles for the audio player
    const style = document.createElement('style');
    style.textContent = `
hat in the demo        .custom-audio-player::-webkit-media-controls-panel {
        background-color: var(--muted);
      }
      .custom-audio-player::-webkit-media-controls-play-button,
      .custom-audio-player::-webkit-media-controls-timeline,
      .custom-audio-player::-webkit-media-controls-current-time-display,
      .custom-audio-player::-webkit-media-controls-time-remaining-display {
        color: var(--primary);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className='bg-[var(--background)]'>
    <div className="flex-1 container mx-auto px-4 py-8 font-inter bg-[var(--background)] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4 font-montserrat">
            Record or Upload Your Presentation
          </h1>
          <p className="text-xl text-[var(--foreground)] opacity-80 font-inter">
            Choose how you'd like to provide your audio for AI analysis
          </p>
        </div>

        {/* Tabs */}
        <div className="w-full">
          <div className="flex w-full border-b border-[var(--border)] mb-8 justify-center gap-32">
            <button 
              onClick={() => handleTabChange('record')}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'record' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--foreground)] opacity-60 hover:text-[var(--primary)]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
              Record Audio
            </button>
            <button 
              onClick={() => handleTabChange('upload')}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'upload' ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--foreground)] opacity-60 hover:text-[var(--primary)]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" x2="12" y1="3" y2="15"></line>
              </svg>
              Upload Audio
            </button>
          </div>

          {/* Tab Content */}
          <div className={activeTab === 'record' ? 'block' : 'hidden'}>
            <div className="text-center">
              {recordingState === 'idle' && (
                <div className="flex flex-col items-center space-y-6 animate-scale-in">
                  <button 
                    onClick={startRecording}
                    className="w-32 h-32 rounded-full border-4 border-[var(--border)] bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] transition-all duration-300 flex items-center justify-center hover:shadow-xl hover:scale-105 group relative overflow-hidden"
                    aria-label="Start recording"
                  >
                    <div className="absolute inset-0 bg-[var(--background)] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-10 h-10 text-[var(--background)] group-hover:scale-110 transition-transform"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                  </button>
                  <div className="text-center animate-fade-up">
                    <p className="text-lg font-medium text-[var(--primary)]">Ready to Record</p>
                    <p className="text-sm text-[var(--foreground)] opacity-80 mt-1">Click the microphone to start</p>
                  </div>
                </div>
              )}

              {recordingState === 'recording' && (
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] animate-pulse flex items-center justify-center border-4 border-[var(--border)] shadow-lg">
                      <div className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-20 animate-ping"></div>
                      <div className="z-10 flex flex-col items-center">
                        <span className="text-[var(--background)] font-bold text-xl">{formatTime(recordingTime)}</span>
                        <span className="text-[var(--background)] text-xs mt-1 opacity-80">Recording</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-3 -right-3">
                      <button 
                        onClick={pauseRecording}
                        className="w-12 h-12 rounded-full bg-[var(--background)] shadow-md flex items-center justify-center hover:bg-[var(--muted)] transition-all hover:shadow-lg transform hover:scale-105"
                        aria-label="Pause recording"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[var(--foreground)]">
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                      </button>
                    </div>
                    <div className="absolute -bottom-3 -left-3">
                      <button 
                        onClick={stopRecording}
                        className="w-12 h-12 rounded-full bg-[var(--background)] shadow-md flex items-center justify-center hover:bg-[var(--muted)] transition-all hover:shadow-lg transform hover:scale-105"
                        aria-label="Stop recording"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[var(--foreground)]">
                          <rect x="6" y="6" width="12" height="12"></rect>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-[var(--error)] animate-pulse">Recording in progress...</p>
                </div>
              )}

              {recordingState === 'paused' && (
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] flex items-center justify-center border-4 border-[var(--border)] shadow-lg">
                      <div className="z-10 flex flex-col items-center">
                        <span className="text-[var(--background)] font-bold text-xl">{formatTime(recordingTime)}</span>
                        <span className="text-[var(--background)] text-xs mt-1 opacity-80">Paused</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-3 -right-3">
                      <button 
                        onClick={resumeRecording}
                        className="w-12 h-12 rounded-full bg-[var(--background)] shadow-md flex items-center justify-center hover:bg-[var(--muted)] transition-all hover:shadow-lg transform hover:scale-105"
                        aria-label="Resume recording"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[var(--success)]">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </button>
                    </div>
                    <div className="absolute -bottom-3 -left-3">
                      <button 
                        onClick={stopRecording}
                        className="w-12 h-12 rounded-full bg-[var(--background)] shadow-md flex items-center justify-center hover:bg-[var(--muted)] transition-all hover:shadow-lg transform hover:scale-105"
                        aria-label="Stop recording"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[var(--foreground)]">
                          <rect x="6" y="6" width="12" height="12"></rect>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-[var(--warning)]">Recording Paused</p>
                </div>
              )}

              {recordingState === 'completed' && (
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-full max-w-md bg-[var(--background)] shadow-md rounded-xl overflow-hidden transition-all hover:shadow-lg">
                    <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--background)]">
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" x2="12" y1="19" y2="22"></line>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-[var(--foreground)]">Your Recording</p>
                          <p className="text-xs text-[var(--foreground-muted)]">Duration: {formatTime(recordingTime)}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium bg-[var(--success-light)] text-[var(--success-dark)] py-1 px-2 rounded-full">Ready</span>
                      </div>
                    </div>
                    <div className="bg-[var(--muted)] p-4">
                      <audio src={audioURL} controls className="w-full custom-audio-player"></audio>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[var(--background)]">
                      <button 
                        onClick={resetRecording}
                        className="flex items-center space-x-1 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors group"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-[-30deg] transition-transform">
                          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                          <path d="M3 3v5h5"></path>
                        </svg>
                        <span>Record Again</span>
                      </button>
                      <button 
                        onClick={handleAnalyze}
                        className="px-4 py-2 bg-[var(--primary)] rounded-md text-[var(--background)] hover:bg-[var(--primary-hover)] transition-colors shadow-sm hover:shadow transform hover:-translate-y-0.5"
                      >
                        Use This Recording
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={activeTab === 'upload' ? 'block' : 'hidden'}>
            <div className="text-center">
              {!uploadedFile ? (
                <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-12 cursor-pointer hover:border-[var(--primary)] transition-colors" onClick={triggerFileInput}>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="audio/*"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-[var(--foreground-muted)]">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" x2="12" y1="3" y2="15"></line>
                  </svg>
                  <p className="text-lg font-medium text-[var(--primary)]">Click to upload audio file</p>
                  <p className="text-sm text-[var(--foreground-muted)] mt-2">MP3, WAV, or M4A (max 10MB)</p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-full max-w-md">
                    <div className="bg-[var(--muted)] p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--primary)] mr-2">
                          <path d="M17.5 22h.5c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <path d="M10 20v-1a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0z"></path>
                          <path d="M6 20v-1a2 2 0 1 0-4 0v1a2 2 0 1 0 4 0z"></path>
                          <path d="M2 19v-3a6 6 0 0 1 12 0v3"></path>
                        </svg>
                        <span className="font-medium truncate text-[var(--foreground)]">{uploadedFile.name}</span>
                      </div>
                      <audio src={audioURL} controls className="w-full custom-audio-player"></audio>
                    </div>
                    <div className="flex justify-center mt-4 space-x-4">
                      <button 
                        onClick={() => {
                          setUploadedFile(null);
                          setAudioURL('');
                          setAudioBlob(null);
                        }}
                        className="px-4 py-2 bg-[var(--muted)] rounded-md text-[var(--foreground)] hover:bg-[var(--muted-hover)] transition-colors"
                      >
                        Choose Another File
                      </button>
                      <button 
                        onClick={handleAnalyze}
                        className="px-4 py-2 bg-[var(--primary)] rounded-md text-[var(--background)] hover:bg-[var(--primary-hover)] transition-colors"
                      >
                        Use This File
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Future Upgrade Banner - Only show on recording tab */}
          {activeTab === 'record' && (
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent)] to-[var(--success)] text-[var(--background)] px-4 py-2 rounded-full text-sm font-medium">
                🚀 Future: Upgrade to video analysis coming soon
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <div className="mt-12 text-center">
            <button 
              onClick={handleAnalyze}
              disabled={!audioBlob || isAnalyzing}
              className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-[var(--background)] rounded-md text-lg px-8 py-4 font-inter transition-all ${
                !audioBlob || isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:opacity-90 hover:-translate-y-1 active:translate-y-0'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[var(--background)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
                    <path d="M3 16.2V21m0-4.8L9 21"></path>
                    <path d="M3 10v4"></path>
                    <path d="M12 12v4"></path>
                    <path d="M21 12v4"></path>
                    <path d="M21 3v4.8m0-4.8h-4.8"></path>
                    <path d="M3 7.8V3m0 4.8H7.8"></path>
                    <path d="M3 3l6 6"></path>
                  </svg>
                  Analyze My Performance
                </>
              )}
            </button>
            {!audioBlob && (
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                {activeTab === 'record' ? 'Record audio first to analyze' : 'Upload audio first to analyze'}
              </p>
            )}
          </div>

          {/* Privacy Note */}
          <div className="mt-8 text-center">
            <p className="text-[var(--foreground-muted)] text-sm font-inter">
              Your audio stays private and is analyzed securely
            </p>
          </div>
          
          {/* Analysis Results - This section will be shown after analysis */}
          {/* <div className="mt-8 p-6 bg-[var(--background)] rounded-xl shadow-md border border-[var(--border)] max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">Analysis Results</h3>
            <div className="bg-[var(--success-light)] p-4 rounded-lg text-[var(--success-dark)] mb-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Analysis complete! Here are your results.</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    </div>
  );
}