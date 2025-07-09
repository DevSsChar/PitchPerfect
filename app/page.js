import Link from "next/link"; 
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-inter bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="animate-fade-up">
              <h1 className="text-5xl md:text-6xl font-bold text-[var(--primary-dark)] mb-6 leading-tight">
                Speak Better.
                <br />
                <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--warning)] bg-clip-text text-transparent">
                  Coach Yourself.
                </span>
              </h1>
              
              <p className="text-xl text-[var(--foreground-muted)] mb-10 leading-relaxed max-w-xl">
                Transform your presentations with AI-powered coaching. Get instant feedback on pace, 
                filler words, and confidence to become a more compelling speaker.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/record">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                  transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 
                  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                  bg-gradient-to-r from-[var(--accent)] to-[var(--warning)] text-[var(--background)] hover:shadow-lg hover:opacity-90 
                  h-12 rounded-md px-8 transform hover:-translate-y-0.5">
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
                    className="w-5 h-5 mr-2"
                  >
                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                  Start Recording
                </button>
                </Link>
                <Link href="/dashboard">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium 
                  transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 
                  focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                  border bg-[var(--background)] h-12 rounded-md px-8 border-[var(--primary-dark)] text-[var(--primary-dark)] 
                  hover:bg-[var(--primary-dark)] hover:text-[var(--background)] hover:shadow-lg transform hover:-translate-y-0.5">
                  View Demo
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
                    className="w-4 h-4 ml-2"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
                </Link>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center mt-10 text-sm text-[var(--foreground-muted)] space-y-3 sm:space-y-0">
                <div className="flex items-center sm:mr-8">
                  <div className="w-5 h-5 bg-[var(--success-light)] rounded-full flex items-center justify-center mr-2">
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
                      className="w-3 h-3 text-[var(--success)]"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span>Free to use</span>
                </div>
                
                {/* <div className="flex items-center">
                  <div className="w-5 h-5 bg-[#ecfdf5] rounded-full flex items-center justify-center mr-2">
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
                      className="w-3 h-3 text-[#4ade80]"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span>No account required</span>
                </div> */}
              </div>
            </div>
            
            {/* Right Column - Card */}
            <div className="animate-fade-in">
              <div className="relative">
                <div className="bg-[var(--background)] rounded-3xl shadow-xl p-8 border border-[var(--border)]">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
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
                        className="w-10 h-10 text-[var(--background)]"
                      >
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" x2="12" y1="19" y2="22"></line>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--primary-dark)]">AI Analysis Ready</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-[var(--muted)] p-4 rounded-lg hover:bg-[var(--muted-hover)] transition-colors duration-200">
                      <span className="text-sm font-medium text-[var(--foreground-muted)]">Speaking Pace</span>
                      <span className="text-sm font-medium px-3 py-1 bg-[var(--success-light)] text-[var(--success)] rounded-full">Optimal</span>
                    </div>
                    
                    <div className="flex items-center justify-between bg-[var(--muted)] p-4 rounded-lg hover:bg-[var(--muted-hover)] transition-colors duration-200">
                      <span className="text-sm font-medium text-[var(--foreground-muted)]">Filler Words</span>
                      <span className="text-sm font-medium px-3 py-1 bg-[var(--warning-light)] text-[var(--accent)] rounded-full">2% density</span>
                    </div>
                    
                    <div className="flex items-center justify-between bg-[var(--muted)] p-4 rounded-lg hover:bg-[var(--muted-hover)] transition-colors duration-200">
                      <span className="text-sm font-medium text-[var(--foreground-muted)]">Confidence Level</span>
                      <span className="text-sm font-medium px-3 py-1 bg-[var(--success-light)] text-[var(--success)] rounded-full">High</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-br from-[var(--warning)] to-[var(--accent)] rounded-full flex items-center justify-center shadow-lg animate-bounce">
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
                    className="w-7 h-7 text-[var(--background)]"
                  >
                    <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                    <path d="M18 17V9"></path>
                    <path d="M13 17V5"></path>
                    <path d="M8 17v-3"></path>
                  </svg>
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-[var(--success)] to-[var(--success-dark)] rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: "0.5s"}}>
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
                    className="w-7 h-7 text-[var(--background)]"
                  >
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                    <path d="M9 18h6"></path>
                    <path d="M10 22h4"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How PitchPerfect Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--muted)] font-inter">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-dark)] mb-4 font-montserrat">
              How PitchPerfect Works
            </h2>
            <p className="text-xl text-[var(--foreground-muted)] max-w-3xl mx-auto font-inter">
              Three simple steps to transform your presentation skills with AI-powered insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[var(--background)] p-8 rounded-xl shadow-md group cursor-pointer hover:shadow-xl transition-all duration-300 border border-[var(--border)]">
              <div className="w-16 h-16 bg-[var(--primary-transparent)] rounded-full flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--primary-light-transparent)]">
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
                  className="w-8 h-8 text-[var(--primary-dark)]"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-4 font-montserrat">Record Your Presentation</h3>
              <p className="text-[var(--foreground-muted)] leading-relaxed font-inter">
                Practice your speech naturally. Our AI captures every nuance of your delivery, from pace to vocal confidence.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-[var(--background)] p-8 rounded-xl shadow-md group cursor-pointer hover:shadow-xl transition-all duration-300 border border-[var(--border)]">
              <div className="w-16 h-16 bg-[var(--warning-light)] rounded-full flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--warning-light)]">
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
                  className="w-8 h-8 text-[var(--warning)]"
                >
                  <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                  <path d="M18 17V9"></path>
                  <path d="M13 17V5"></path>
                  <path d="M8 17v-3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-4 font-montserrat">Get Instant Analysis</h3>
              <p className="text-[var(--foreground-muted)] leading-relaxed font-inter">
                Receive detailed metrics on speaking pace, filler word usage, confidence levels, and overall performance scores.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-[var(--background)] p-8 rounded-xl shadow-md group cursor-pointer hover:shadow-xl transition-all duration-300 border border-[var(--border)]">
              <div className="w-16 h-16 bg-[var(--success-light)] rounded-full flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--success-lighter)]">
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
                  className="w-8 h-8 text-[var(--success)]"
                >
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                  <path d="M9 18h6"></path>
                  <path d="M10 22h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-4 font-montserrat">Improve with AI Coaching</h3>
              <p className="text-[var(--foreground-muted)] leading-relaxed font-inter">
                Access personalized tips and actionable insights to enhance your presentation skills and boost confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ready to become a better speaker Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background)] font-inter">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[var(--muted)] to-[var(--primary-transparent)] p-12 rounded-3xl shadow-lg border border-[var(--border)]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">
            <span className="text-[var(--primary-dark)]">Ready to become a </span>
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--warning)] bg-clip-text text-transparent">better speaker?</span>
          </h2>
          
          <p className="text-xl text-[var(--foreground-muted)] mb-10 max-w-2xl mx-auto font-inter">
            Join thousands of professionals who've improved their presentation skills with PitchPerfect.
          </p>
          <div className="flex justify-center w-full">
            <Link href={"/record"}>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium font-inter
                transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-[var(--accent)] to-[var(--warning)] 
                text-[var(--background)] hover:shadow-lg hover:opacity-90 rounded-md text-lg px-10 py-4 transform hover:-translate-y-1
                ">
                Start Your First Session
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
                  className="w-5 h-5 ml-2"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </Link>
          </div>
          
          {/* <p className="text-sm text-[var(--foreground-muted)] mt-6 flex items-center justify-center space-x-3 font-inter">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No signup required
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Completely free
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Works in your browser
            </span>
          </p> */}
        </div>
      </section>
    </>
  );
}