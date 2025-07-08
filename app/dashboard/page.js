"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Welcome!</h2>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {session.user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {session.user?.email}
                </p>
                <p>
                  <strong>Provider:</strong> {session.user?.provider}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-gray-200"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}