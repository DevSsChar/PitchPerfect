"use client";

import { useSession } from "next-auth/react";
import DemoDashboard from "@/components/dashboard/page";
import UserDashboard from "@/components/user-dashboard/user-dashboard";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    // Not authenticated: show demo dashboard
    return <DemoDashboard />;
  }

  // Authenticated: show user dashboard
  return <UserDashboard />;
}