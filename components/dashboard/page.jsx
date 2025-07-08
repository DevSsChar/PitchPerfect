import styles from './dashboard.module.css';
import Link from 'next/link';
export default function Dashboard() {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white ${styles.dashboardContainer}`}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Demo Dashboard</h1>
          <p className="text-gray-600 mt-1">Sample analysis for demonstration</p>
        </div>
        <Link href={"/record"} className="flex items-center gap-2">
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 bg-orange-500 text-white transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
            New Recording
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 border border-teal-500 text-teal-500 bg-white transition-colors cursor-pointer">
            New Upload
          </button>
        </div>
        </Link>
      </div>
      
      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Overall Score Card */}
        <div className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-100">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-600 text-sm font-medium">Overall Score</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">78%</h2>
          <p className="text-gray-600 mt-2">Good performance</p>
        </div>
        
        {/* Speaking Pace Card */}
        <div className="bg-red-50 rounded-lg p-6 shadow-sm border border-red-100">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-600 text-sm font-medium">Speaking Pace</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">160 <span className="text-2xl font-normal">WPM</span></h2>
          <p className="text-gray-600 mt-2">Slightly fast</p>
        </div>
        
        {/* Filler Words Card */}
        <div className="bg-red-50 rounded-lg p-6 shadow-sm border border-red-100">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-600 text-sm font-medium">Filler Words</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">12</h2>
          <p className="text-gray-600 mt-2">3.2% density</p>
        </div>
        
        {/* Vocal Confidence Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-600 text-sm font-medium">Vocal Confidence</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <path d="M2 12h6"></path>
              <path d="M10 12h6"></path>
              <path d="M18 12h4"></path>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900">75%</h2>
          <p className="text-gray-600 mt-2">Room for improvement</p>
        </div>
      </div>
      
      {/* Speaking Pace Chart */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Speaking Pace Over Time</h2>
        <div className={styles.scrollContainer}>
          <div className="min-w-[600px] h-[300px] relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-gray-500 text-sm">
              <span>200</span>
              <span>175</span>
              <span className="text-teal-500">Ideal Max</span>
              <span className="text-teal-500">Ideal Min</span>
              <span>100</span>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute left-12 right-0 bottom-0 flex justify-between text-gray-500 text-sm">
              <span>0:00</span>
              <span>0:30</span>
              <span>1:00</span>
              <span>1:30</span>
              <span>2:00</span>
              <span>2:30</span>
              <span>3:00</span>
            </div>
            
            {/* Grid Lines */}
            <div className="absolute left-12 right-0 top-0 bottom-6 grid grid-rows-4 grid-cols-6">
              {Array(28).fill().map((_, i) => (
                <div key={i} className="border-gray-200 border-dashed"></div>
              ))}
            </div>
            
            {/* Ideal Range Bands */}
            <div className="absolute left-12 right-0 top-[40%] h-[20%] bg-gray-100 opacity-20"></div>
            
            {/* Chart Line */}
            <svg className="absolute left-12 right-0 top-0 bottom-6 w-[calc(100%-48px)] h-[calc(100%-24px)]" viewBox="0 0 600 270" preserveAspectRatio="none">
              <path d="M0,200 C30,150 90,120 150,80 S270,50 300,100 S400,20 450,70 S550,220 600,230" stroke="teal" strokeWidth="3" fill="none" />
              <circle cx="0" cy="200" r="4" fill="teal" />
              <circle cx="90" cy="120" r="4" fill="teal" />
              <circle cx="180" cy="80" r="4" fill="teal" />
              <circle cx="270" cy="100" r="4" fill="teal" />
              <circle cx="360" cy="70" r="4" fill="teal" />
              <circle cx="450" cy="120" r="4" fill="teal" />
              <circle cx="600" cy="230" r="4" fill="teal" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Filler Word Heatmap */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Filler Word Intensity</h2>
        <div className={styles.scrollContainer}>
          <div className="min-w-[600px]">
            {/* Heatmap visualization */}
            <div className="relative h-20 mb-4">
              <div className="absolute inset-0 bg-gray-50 rounded">
                {/* Colored segments representing filler word intensity */}
                <div className="flex h-full">
                  <div className="w-[3%] bg-red-100"></div>
                  <div className="w-[4%] bg-red-200"></div>
                  <div className="w-[3%] bg-white"></div>
                  <div className="w-[5%] bg-red-200"></div>
                  <div className="w-[3%] bg-red-100"></div>
                  <div className="w-[4%] bg-white"></div>
                  <div className="w-[6%] bg-red-300"></div>
                  <div className="w-[4%] bg-red-200"></div>
                  <div className="w-[3%] bg-white"></div>
                  <div className="w-[5%] bg-red-200"></div>
                  <div className="w-[4%] bg-red-400"></div>
                  <div className="w-[3%] bg-red-200"></div>
                  <div className="w-[5%] bg-white"></div>
                  <div className="w-[4%] bg-red-200"></div>
                  <div className="w-[3%] bg-white"></div>
                  <div className="w-[5%] bg-red-100"></div>
                  <div className="w-[4%] bg-red-200"></div>
                  <div className="w-[3%] bg-white"></div>
                  <div className="w-[5%] bg-red-100"></div>
                  <div className="w-[4%] bg-white"></div>
                  <div className="w-[3%] bg-red-100"></div>
                  <div className="w-[5%] bg-white"></div>
                  <div className="w-[4%] bg-red-100"></div>
                  <div className="w-[7%] bg-white"></div>
                </div>
              </div>
            </div>
            
            {/* Time markers */}
            <div className="flex justify-between text-gray-600 text-sm">
              <span>0:00</span>
              <span>1:30</span>
              <span>2:55</span>
            </div>
            
            {/* Legend */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center">
                <span className="text-gray-600 text-sm mr-2">Filler Intensity:</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-white border border-gray-200 mr-1"></div>
                <span className="text-sm text-gray-600">None</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-red-100 mr-1"></div>
                <span className="text-sm text-gray-600">Low</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-red-300 mr-1"></div>
                <span className="text-sm text-gray-600">Medium</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-red-500 mr-1"></div>
                <span className="text-sm text-gray-600">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Personalized Coaching Section */}
      <h2 className="text-xl font-bold text-blue-700 mt-10 mb-4">Personalized Coaching</h2>
      
      {/* Coaching Card 1 */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold text-orange-500 mb-4">Slow Down Your Pace</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-red-500 mb-2">Before:</p>
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">You said 'um' 5 times at 0:45, speaking at 160 WPM</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-green-500 mb-2">After:</p>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">Filler count drops to 1 at same timestamp, pace at 140 WPM</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Coaching Card 2 */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold text-teal-500 mb-4">Reduce Filler Words</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-red-500 mb-2">Before:</p>
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">High frequency of 'uh' and 'um' in first 2 minutes</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-green-500 mb-2">After:</p>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">Pause technique reduces fillers by 60% in practice runs</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Coaching Card 3 */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold text-blue-500 mb-4">Boost Vocal Confidence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-red-500 mb-2">Before:</p>
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">Voice tremor detected during key points at 3:15</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-green-500 mb-2">After:</p>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-sm text-gray-700">Steady breathing increases confidence score to 85%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transcript with Highlights Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mt-8 mb-6">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Transcript with Highlights</h2>
        <div className="text-gray-700 space-y-4">
          <p>
            Today I want to talk about <span className="bg-red-100 px-1">artificial intelligence</span> and <span className="bg-orange-100 px-1">um</span> how it's transforming our world. <span className="bg-orange-100 px-1">Uh</span> <span className="bg-red-100 px-1">artificial intelligence</span> is <span className="bg-red-100 px-1">becoming increasingly important</span> in various industries and <span className="bg-orange-100 px-1">um</span> I believe it will continue to <span className="bg-red-100 px-1">revolutionize the way we work</span>.
          </p>
          <p>
            The key benefits include improved efficiency, <span className="bg-orange-100 px-1">uh</span> better decision making, and <span className="bg-red-100 px-1">enhanced automation capabilities</span>. However, we must also consider the ethical implications and <span className="bg-orange-100 px-1">um</span> ensure responsible development.
          </p>
        </div>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-200 mr-2"></div>
            <span className="text-sm text-gray-600">Key phrases</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-200 mr-2"></div>
            <span className="text-sm text-gray-600">Filler words</span>
          </div>
        </div>
      </div>
    </div>
  );
}
