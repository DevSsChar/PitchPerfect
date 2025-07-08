# PitchPerfect - AI-Powered Presentation Coaching

A comprehensive full-stack application combining Next.js frontend with FastAPI backend for AI-powered speech analysis and presentation coaching.

## 🏗️ Project Structure

```
cautious-engine/
├── frontend (Next.js)
│   ├── app/
│   │   ├── api/analyze/route.js      # Proxy to FastAPI backend
│   │   ├── auth/[...nextauth]/       # OAuth authentication
│   │   ├── dashboard/                # Analytics dashboard
│   │   ├── features/                 # Feature showcase
│   │   ├── how-it-works/             # Process explanation
│   │   ├── login/                    # Login page
│   │   └── record/                   # Recording interface
│   ├── components/
│   │   ├── navbar.jsx                # Navigation component
│   │   ├── footer.jsx                # Footer component
│   │   ├── record.jsx                # Recording functionality
│   │   ├── login.jsx                 # Login component
│   │   └── dashboard/                # Dashboard components
│   └── package.json
├── backend/ (FastAPI)
│   ├── app/
│   │   ├── main.py                   # FastAPI app entry point
│   │   ├── core/
│   │   │   └── config.py             # Configuration settings
│   │   ├── models/
│   │   │   └── schemas.py            # Pydantic models
│   │   ├── routers/
│   │   │   ├── audio.py              # Audio analysis endpoints
│   │   │   ├── auth.py               # Authentication endpoints
│   │   │   └── dashboard.py          # Dashboard endpoints
│   │   └── services/
│   │       └── audio_analysis.py     # Audio processing service
│   ├── requirements.txt
│   ├── start.bat                     # Windows startup script
│   └── start.sh                      # Linux/Mac startup script
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd cautious-engine
```

### 2. Start the FastAPI Backend

#### Windows:
```cmd
cd backend
start.bat
```

#### Linux/Mac:
```bash
cd backend
chmod +x start.sh
./start.sh
```

The FastAPI backend will be available at: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

### 3. Start the Next.js Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The Next.js frontend will be available at: `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
APP_NAME=PitchPerfect AI Backend
DEBUG=True
SECRET_KEY=your-secret-key-change-this-in-production
DATABASE_URL=sqlite:///./pitchperfect.db

# External API keys (optional)
OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLOUD_KEY=your-google-cloud-key

# File upload settings
MAX_FILE_SIZE=26214400  # 25MB in bytes
SAMPLE_RATE=16000
CHUNK_DURATION=30
```

#### Frontend (.env.local)
```env
FASTAPI_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

## 🎯 Features

### Current Features
- **Audio Recording**: Browser-based audio recording
- **File Upload**: Support for various audio formats
- **Speech Analysis**: AI-powered analysis of speaking patterns
- **Dashboard**: Performance metrics and analytics
- **Responsive Design**: Mobile-friendly interface

### Analysis Metrics
- **Clarity**: Speech articulation quality
- **Pacing**: Speaking speed and rhythm
- **Confidence**: Vocal confidence assessment
- **Engagement**: Overall presentation engagement
- **Filler Words**: Detection and counting
- **Volume Consistency**: Audio level analysis

## 🔌 API Endpoints

### Audio Analysis
- `POST /api/v1/audio/analyze` - Analyze audio file
- `GET /api/v1/audio/analysis/{id}` - Get analysis results
- `GET /api/v1/audio/analysis/{id}/detailed` - Get detailed analysis
- `GET /api/v1/audio/analyses` - Get user's analyses

### Dashboard
- `GET /api/v1/dashboard/stats` - Get dashboard statistics
- `GET /api/v1/dashboard/recent-analyses` - Get recent analyses
- `GET /api/v1/dashboard/performance-trends` - Get performance trends

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/user/{id}` - Get user profile

## 🛠️ Development

### Adding New Features

1. **Backend (FastAPI)**:
   - Add new routes in `app/routers/`
   - Create services in `app/services/`
   - Define models in `app/models/schemas.py`

2. **Frontend (Next.js)**:
   - Add components in `components/`
   - Create pages in `app/`
   - Update API calls to use FastAPI endpoints

### Testing

#### Backend Tests
```bash
cd backend
python -m pytest tests/
```

#### Frontend Tests
```bash
npm test
```

## 📚 Technology Stack

### Frontend
- **Next.js 15**: React framework
- **React 19**: UI library
- **TailwindCSS**: Styling
- **Framer Motion**: Animations
- **Lucide React**: Icons

### Backend
- **FastAPI**: Web framework
- **Pydantic**: Data validation
- **LibROSA**: Audio processing
- **NumPy/SciPy**: Scientific computing
- **SQLAlchemy**: Database ORM
- **Uvicorn**: ASGI server

### Audio Processing
- **LibROSA**: Audio analysis
- **SoundFile**: Audio I/O
- **Scikit-learn**: Machine learning
- **Transformers**: NLP models

## 🔄 Deployment

### Backend Deployment
```bash
# Using Docker
docker build -t pitchperfect-backend .
docker run -p 8000:8000 pitchperfect-backend

# Using Uvicorn
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🐛 Troubleshooting

### Common Issues

1. **Backend not starting**:
   - Check Python version (3.8+)
   - Install dependencies: `pip install -r requirements.txt`
   - Check port availability (8000)

2. **Frontend API calls failing**:
   - Ensure backend is running on port 8000
   - Check FASTAPI_URL environment variable
   - Verify CORS settings in backend

3. **Audio analysis not working**:
   - Check audio file format support
   - Verify file size limits
   - Check LibROSA installation

### Logs
- Backend logs: Console output from uvicorn
- Frontend logs: Browser console and Next.js terminal

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- Real-time analysis during recording
- Multi-language support
- Advanced AI models integration
- Team collaboration features
- Mobile app development
- Integration with presentation tools
