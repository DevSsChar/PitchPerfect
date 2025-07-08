# RecordPage Component Documentation

## Overview
This component provides a modern, interactive UI for users to either record audio directly in the browser or upload an audio file for AI analysis. It is the main entry point for users to submit their presentations to PitchPerfect.

---

## Features
- **Tabs**: Switch between "Record Audio" and "Upload Audio" modes
- **Audio Recording**: Uses the browser's MediaRecorder API to capture audio
- **Audio Upload**: Drag-and-drop or click to upload audio files (MP3, WAV, etc.)
- **Live Timer**: Shows recording duration in MM:SS format
- **Playback**: Listen to recorded or uploaded audio before submitting
- **Analysis Button**: Sends audio to the backend for analysis
- **Animated UI**: Modern, responsive, and visually engaging with gradients and transitions
- **Privacy Note**: Reassures users about data privacy

---

## State Management
- `activeTab`: Which tab is active ('record' or 'upload')
- `recordingState`: Tracks recording status ('idle', 'recording', 'paused', 'completed')
- `audioBlob`, `audioURL`: Stores the recorded/uploaded audio
- `recordingTime`: Timer for recording duration
- `uploadedFile`: Stores the uploaded file
- `isAnalyzing`: Shows loading state during backend analysis

---

## Recording Flow
1. **Start Recording**: Requests microphone access, starts MediaRecorder, and timer
2. **Pause/Resume/Stop**: Controls MediaRecorder and timer
3. **Playback**: Shows audio player after recording
4. **Reset**: Allows user to record again

---

## Upload Flow
1. **File Input**: User selects or drags an audio file
2. **Validation**: Ensures file is an audio type
3. **Playback**: Shows audio player for uploaded file
4. **Reset**: Allows user to choose another file

---

## Analysis Flow
- When the user clicks "Analyze My Performance" or "Use This Recording/File":
  1. The audio is sent to `/api/analyze` as a FormData POST request
  2. The backend processes the audio and returns a JSON result
  3. The result is logged in the browser console and a success alert is shown
  4. (In a real app, you would display the analysis results in the UI)

---

## UI/UX Details
- **Gradient backgrounds** and animated buttons for a modern look
- **Accessible**: All buttons have `aria-label`s
- **Responsive**: Layout adapts to all screen sizes
- **Custom Audio Player Styling**: Uses injected CSS for a consistent look
- **Future Banner**: Shows a banner for upcoming video analysis features

---

## Customization
- Change color schemes by editing Tailwind classes
- Add more file validation or support for other formats
- Integrate a results page to display analysis output

---

## Dependencies
- React (with hooks)
- Next.js (for routing and Image/Link components)
- Tailwind CSS

---

# Home Page (page.js) Documentation

## Overview
The home page is a visually rich landing page that introduces PitchPerfect, highlights its features, and guides users to start recording or view a demo.

---

## Features
- **Hero Section**: Large headline, subheading, and call-to-action buttons
- **Feature Cards**: Three-step explanation of how PitchPerfect works
- **Demo Analysis Card**: Shows example analysis metrics (pace, filler words, confidence)
- **Ready Section**: Encourages users to start their first session
- **Responsive**: Layout adapts to all screen sizes
- **Modern Design**: Uses gradients, rounded corners, and subtle animations

---

## Hero Section
- **Headline**: "Speak Better. Coach Yourself."
- **Description**: Explains the value proposition
- **Buttons**: "Start Recording" (links to /record) and "View Demo" (links to /dashboard)
- **Badges**: Shows "Free to use" and other trust signals

---

## Feature Cards
- **Step 1**: Record your presentation
- **Step 2**: Get instant analysis
- **Step 3**: Improve with AI coaching
- Each card uses icons, color-coded backgrounds, and hover effects

---

## Demo Analysis Generation (How it works in the console)
- When a user records or uploads audio and clicks "Analyze My Performance":
  1. The audio is sent to the backend via `/api/analyze`
  2. The backend runs the full pipeline (transcription + NLP analysis)
  3. The backend returns a JSON object with transcript, summary, and detailed analysis
  4. The frontend logs the result in the browser console (see `console.log('Analysis result:', result);` in `record.jsx`)
  5. In a real app, you would display these results in a dashboard or results page

---

## Customization
- Update hero text, features, and demo metrics to match your brand
- Add more sections or testimonials as needed

---

## Dependencies
- React
- Next.js
- Tailwind CSS

---

This documentation should help you and your team understand, maintain, and extend the recording and home page features of PitchPerfect.
