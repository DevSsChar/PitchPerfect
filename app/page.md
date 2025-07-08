# Home Page (page.js) Documentation

## Overview
The home page (`page.js`) is the main landing page for PitchPerfect. It introduces the product, highlights its features, and guides users to start recording or view a demo. The design is modern, responsive, and visually engaging.

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

This documentation should help you and your team understand, maintain, and extend the home page features of PitchPerfect.
