"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import UserDashboard from "@/components/user-dashboard/user-dashboard";

const UserDashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <UserDashboard />
      </div>
    );
  }

  return null;
};

export default UserDashboardPage;
