import styles from './dashboard.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function UserDashboard() {
  const { data: session } = useSession();
  return (
    <div className={`max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 bg-gradient-to-br from-blue-50 to-purple-100 min-h-[85vh] ${styles.dashboardContainer}`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-12 gap-6 md:gap-8">
        <div className="w-full md:w-auto text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800 mb-2 drop-shadow-lg leading-tight">Welcome, {session?.user?.name || 'User'}!</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700">Your personalized analysis dashboard</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
          <img src={session?.user?.image} alt="Profile" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-purple-300 shadow-xl object-cover" />
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <span className="text-base sm:text-lg font-semibold text-gray-800 break-all">{session?.user?.email}</span>
            <Link href={"/record"}>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg text-sm sm:text-base font-semibold h-10 sm:h-12 px-4 sm:px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:from-orange-600 hover:to-pink-600 transition-all duration-200 w-full sm:w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                New Recording
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Metrics Cards Grid (personalized) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-4 md:mt-6">
        {/* Best Score Card */}
        <div className="bg-gradient-to-br from-green-200 to-green-50 rounded-2xl p-6 sm:p-8 shadow-xl border border-green-200 flex flex-col items-start min-h-[180px] sm:min-h-[220px] w-full">
          <div className="flex justify-between items-center w-full mb-3 sm:mb-4">
            <span className="text-gray-700 text-base sm:text-lg font-semibold">Your Best Score</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-green-700 mb-1 sm:mb-2">92%</h2>
          <p className="text-gray-700 text-base sm:text-lg">Excellent! Keep it up.</p>
        </div>
        {/* Recent Activity Card */}
        <div className="bg-gradient-to-br from-blue-200 to-blue-50 rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-200 flex flex-col items-start min-h-[180px] sm:min-h-[220px] w-full">
          <div className="flex justify-between items-center w-full mb-3 sm:mb-4">
            <span className="text-gray-700 text-base sm:text-lg font-semibold">Recent Activity</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <ul className="text-gray-700 text-sm sm:text-base list-disc pl-4 sm:pl-5 space-y-1 w-full">
            <li>Uploaded: <span className="font-semibold">Pitch_2025.mp3</span> <span className="text-xs text-gray-400">(2 days ago)</span></li>
            <li>Analyzed: <span className="font-semibold">Interview_1.wav</span> <span className="text-xs text-gray-400">(5 days ago)</span></li>
            <li>Score improved by <span className="text-green-600 font-bold">+7%</span></li>
          </ul>
          <Link href="/history" className="mt-3 sm:mt-4 text-blue-600 hover:underline text-xs sm:text-sm">View Full History</Link>
        </div>
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-purple-200 to-purple-50 rounded-2xl p-6 sm:p-8 shadow-xl border border-purple-200 flex flex-col items-start min-h-[180px] sm:min-h-[220px] w-full">
          <div className="flex justify-between items-center w-full mb-3 sm:mb-4">
            <span className="text-gray-700 text-base sm:text-lg font-semibold">Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="12" cy="7" r="4"></circle><path d="M5.5 21a10 10 0 0 1 13 0" /></svg>
          </div>
          <div className="text-gray-700 text-sm sm:text-base space-y-1 w-full break-words">
            <div><span className="font-semibold">Name:</span> {session?.user?.name}</div>
            <div><span className="font-semibold">Email:</span> {session?.user?.email}</div>
            <div><span className="font-semibold">Provider:</span> {session?.user?.provider || 'OAuth'}</div>
          </div>
        </div>
        {/* Progress Card */}
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl p-6 sm:p-8 shadow-xl border border-yellow-200 flex flex-col items-start min-h-[180px] sm:min-h-[220px] w-full">
          <div className="flex justify-between items-center w-full mb-3 sm:mb-4">
            <span className="text-gray-700 text-base sm:text-lg font-semibold">Progress Overview</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
          </div>
          <div className="w-full mt-1 sm:mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-700 text-xs sm:text-sm">Current Streak</span>
              <span className="text-green-700 font-bold text-xs sm:text-base">4 days</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-700 text-xs sm:text-sm">Total Analyses</span>
              <span className="text-blue-700 font-bold text-xs sm:text-base">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-xs sm:text-sm">Avg. Score</span>
              <span className="text-purple-700 font-bold text-xs sm:text-base">85%</span>
            </div>
          </div>
        </div>
      </div>
      {/* Call to Action Section */}
      <div className="mt-10 sm:mt-16 flex flex-col md:flex-row items-center justify-between bg-white bg-opacity-80 rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100 gap-4 md:gap-0">
        <div className="mb-2 md:mb-0 text-center md:text-left w-full md:w-auto">
          <h2 className="text-lg sm:text-2xl font-bold text-blue-700 mb-1">Ready to improve your next pitch?</h2>
          <p className="text-gray-600 text-sm sm:text-base">Record or upload a new audio sample to get instant feedback and insights.</p>
        </div>
        <Link href="/record" className="w-full md:w-auto">
          <button className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-base sm:text-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
            Start Now
          </button>
        </Link>
      </div>
    </div>
  );
}
