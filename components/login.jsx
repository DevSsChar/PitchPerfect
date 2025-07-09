"use client";

import { useState, useEffect } from 'react';
import { signIn, getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { handleUserAuth } from '@/app/actions/auth';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState({
    github: false,
    google: false
  });
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const saveUser = async () => {
      if (session?.user) {
        console.log('Session user data:', session.user);
        const result = await handleUserAuth({
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
          provider: session.user.provider
        });

        if (result.success) {
          toast.success('Login successful! User data stored in Supabase.', {
            duration: 5000,
            id: 'login-success'
          });
        } else {
          console.error('Failed to store user data:', result.error);
          toast.error('Failed to store user data');
        }
      }
    };

    saveUser();
  }, [session]);

  const handleLogin = async (provider) => {
    try {
      setIsLoading(prev => ({ ...prev, [provider]: true }));
      
      console.log(`Attempting to sign in with ${provider}`);
      
      const result = await signIn(provider, {
        redirect: true, // Let NextAuth handle the redirect
        callbackUrl: '/record'
      });

      console.log('SignIn result:', result);

      // If redirect is false and we get here, check for errors
      if (result?.error) {
        console.error('Authentication error:', result.error);
        toast.error(`Authentication failed: ${result.error}`);
        setIsLoading(prev => ({ ...prev, [provider]: false }));
      }
      // If redirect is true, this code won't execute as the page will redirect
      
    } catch (error) {
      console.error(`Error during ${provider} login:`, error);
      toast.error(`Login failed: ${error.message}`);
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="min-h-[85vh] bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-inter">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--primary)] font-montserrat">Welcome to PitchPerfect</h1>
          <p className="mt-2 text-[var(--foreground)] opacity-80">Sign in to continue your journey to better presentations</p>
        </div>

        {/* Login Cards */}
        <div className="mt-8 space-y-4">
          {/* GitHub Login */}
          <div className="relative">
            <button
              onClick={() => handleLogin('github')}
              disabled={isLoading.github || isLoading.google}
              className="group w-full flex justify-center py-4 px-6 border border-[var(--border)] rounded-xl shadow-sm bg-[var(--background)] text-lg font-medium text-[var(--foreground)] hover:bg-[var(--muted)] hover:shadow-md transition-all duration-200 relative overflow-hidden"
            >
              <span className="absolute inset-0 w-0 bg-black-100 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative flex items-center">
                {isLoading.github ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[var(--foreground)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{isLoading.github ? "Signing in..." : "Continue with GitHub"}</span>
              </span>
            </button>
          </div>

          {/* Google Login */}
          <div className="relative">
            <button
              onClick={() => handleLogin('google')}
              disabled={isLoading.github || isLoading.google}
              className="group w-full flex justify-center py-4 px-6 border border-[var(--border)] rounded-xl shadow-sm bg-[var(--background)] text-lg font-medium text-[var(--foreground)] hover:bg-[var(--muted)] hover:shadow-md transition-all duration-200 relative overflow-hidden"
            >
              <span className="absolute inset-0 w-0 bg-black-100 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative flex items-center">
                {isLoading.google ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[var(--foreground)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#4285F4" d="M12 5c1.617 0 3.071.59 4.184 1.57l3.083-3.056C17.474 1.796 14.86 1 12 1a11 11 0 0 0-9.792 6.122l3.584 2.76A6.523 6.523 0 0 1 12 5z"/>
                    <path fill="#34A853" d="M5.792 14.118A6.532 6.532 0 0 1 5.502 12c0-.727.129-1.42.29-2.118L2.208 7.122A10.937 10.937 0 0 0 1 12c0 1.71.391 3.36 1.083 4.818l3.709-2.7z"/>
                    <path fill="#FBBC05" d="M12 19c-2.42 0-4.475-1.34-5.536-3.294L2.886 18.66A10.98 10.98 0 0 0 12 23c2.975 0 5.494-.89 7.331-2.419L16.172 17.5A6.84 6.84 0 0 1 12 19z"/>
                    <path fill="#EA4335" d="M23 12c0-.638-.064-1.26-.169-1.869H12v3.978h6.188a5.095 5.095 0 0 1-2.267 3.424l3.127 3.044C21.561 18.286 23 15.471 23 12z"/>
                  </svg>
                )}
                <span>{isLoading.google ? "Signing in..." : "Continue with Google"}</span>
              </span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[var(--background)] text-[var(--foreground)] opacity-70">or</span>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-[var(--primary)] hover:underline transition-colors font-medium">
            Return to Homepage
          </Link>
        </div>

        {/* Privacy Note */}
        <div className="text-center pt-4 mt-4 border-t border-[var(--border)]">
          <p className="text-sm text-[var(--foreground)] opacity-60">
            By continuing, you agree to PitchPerfect's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

