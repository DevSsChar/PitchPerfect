# PitchPerfect: AI-Powered Presentation Coach

PitchPerfect is a modern web application that helps you become a more confident, effective speaker using AI-driven analysis and actionable feedback. Built with Next.js, it features a seamless user experience for recording/uploading presentations, instant AI analysis, and a beautiful dashboard for actionable insights.

---

## 🚀 Key Advancements

### 1. **Modern, Responsive UI**
- **Hero Landing Page**: Engaging introduction, clear CTAs, and trust signals
- **Navigation & Footer**: Consistent, accessible, and brand-aligned across all pages
- **Mobile-First**: Fully responsive layouts and custom scrollbars for mobile usability

### 2. **Audio Recording & Upload**
- **In-Browser Recording**: Uses MediaRecorder API for direct audio capture
- **File Upload**: Supports MP3, WAV, M4A, and more
- **Live Timer & Playback**: Users can review before submitting
- **Animated, Accessible UI**: Modern gradients, transitions, and clear feedback

### 3. **AI Analysis Pipeline**
- **Backend Integration**: Audio is sent to a Python backend for processing
- **Transcription**: Uses OpenAI Whisper for accurate speech-to-text
- **NLP Analysis**: Detects filler words, analyzes pace, and scores vocal confidence
- **JSON Output**: Returns structured, LLM-ready results for further processing
- **ML Pipeline (Ongoing)**: The machine learning pipeline is currently under development. The files in the `backend/` directory (such as `acoustic_features.py`, `llm_feedback.py`, `text_analysis.py`, and `transcription.py`) serve as references and prototypes for the evolving ML features.

### 4. **Demo Dashboard**
- **Sample Analysis**: Visualizes what users receive after analysis
- **Metrics Cards**: Overall score, pace, filler words, confidence
- **Custom Charts**: SVG-based pace chart, filler word heatmap
- **Personalized Coaching**: Before/after cards and transcript highlights

### 5. **Authentication (Demo)**
- **Login Page**: GitHub and Google sign-in options (simulated for demo)
- **Loading States**: Animated spinners and clear feedback
- **Privacy Messaging**: Terms and privacy reminders

### 6. **Documentation & Maintainability**
- **Component-Level READMEs**: Every major component (navbar, footer, record, login, dashboard, etc.) is documented for easy onboarding and extension
- **Professional Codebase**: Modular, readable, and ready for production

---

## 🛠️ Project Structure

```
pitchperfect/
├── app/
│   ├── page.js           # Home/Landing page
│   ├── not-found/        # Custom 404 page
│   ├── dashboard/        # Demo dashboard
│   ├── record/           # Record/upload page
│   ├── features/         # Features page
│   └── how-it-works/     # How it works page
├── components/
│   ├── navbar.jsx        # Navigation bar
│   ├── footer.jsx        # Footer
│   ├── record.jsx        # Record/upload UI
│   ├── login.jsx         # Login page
│   └── dashboard/        # Dashboard components
│   └── features/         # Features content
│   └── how-it-works/     # How it works content
│   └── ...
├── backend/              # Python backend (ML pipeline in progress; files are reference/prototype)
├── public/               # Static assets
├── styles/               # Global and module CSS
└── README.md             # This documentation
```

---

## 💡 How PitchPerfect Works

1. **Record or Upload**: Users can record audio in-browser or upload an existing file.
2. **AI Analysis**: Audio is sent to the backend, transcribed, and analyzed for filler words, pace, and confidence.
3. **Instant Feedback**: Users receive a dashboard with scores, charts, coaching tips, and a highlighted transcript.

See [`how-it-works.md`](components/how-it-works/how-it-works.md) for a detailed workflow.

---

## ✨ Features
- **AI-Powered Transcription**: Fast, accurate, and multi-format
- **Filler Word Detection**: Timeline and density analysis
- **Speaking Pace Analysis**: WPM metrics and visualizations
- **Confidence Scoring**: Vocal analysis and improvement tips
- **Personalized Coaching**: Actionable before/after cards
- **Transcript Highlights**: Key phrases and fillers marked for review
- **Privacy-First**: No account required, secure processing
- **ML Pipeline (Ongoing)**: Advanced ML features are being actively developed. See the `backend/` directory for reference scripts and prototypes.

See [`features.md`](components/features/features.md) for a full list.

---

## 📊 Demo Dashboard
- **Sample Metrics**: See what real analysis looks like
- **Charts & Heatmaps**: Custom SVG and CSS for fast, beautiful visuals
- **Personalized Tips**: Actionable feedback for every user
- **Transcript Highlights**: Easy review of strengths and areas to improve

See [`demo.md`](components/dashboard/demo.md) for details.

---

## 🔐 Authentication
- **GitHub & Google**: Simulated login flows for demo purposes
- **Loading States**: Animated feedback for user actions
- **Privacy Messaging**: Clear terms and privacy reminders

See [`login.md`](components/login.md) for more info.

---

## 🧩 Component Documentation
- [`navbar.md`](components/navbar.md): Navigation bar
- [`footer.md`](components/footer.md): Footer
- [`record.md`](components/record.md): Record/upload UI
- [`page.md`](components/page.md): Home page
- [`login.md`](components/login.md): Login page
- [`demo.md`](components/dashboard/demo.md): Demo dashboard
- [`how-it-works.md`](components/how-it-works/how-it-works.md): Workflow
- [`features.md`](components/features/features.md): Features

---

## 🏁 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   # or yarn install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   # or yarn dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser**

---

## 📝 Next Steps
- Integrate real authentication (e.g., NextAuth.js)
- Connect dashboard to live backend analysis
- Add user accounts and history
- Expand coaching and export features
- **Continue ML Pipeline Development**: Expand and integrate the machine learning backend for deeper analysis and smarter feedback.

---

## 📚 Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI Whisper](https://github.com/openai/whisper)

---

## © 2024 PitchPerfect. All rights reserved.
