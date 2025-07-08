"use client";
import React, { useEffect } from "react";
import RecordPage from "@/components/record";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const showToast = (message) => {
  if (typeof window !== "undefined") {
    // Simple toast implementation
    let toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "32px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#1e293b";
    toast.style.color = "#fff";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "1rem";
    toast.style.zIndex = 9999;
    toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = "opacity 0.5s";
      toast.style.opacity = 0;
      setTimeout(() => document.body.removeChild(toast), 500);
    }, 2000);
  }
};

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      showToast("Please authenticate to access this page.");
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <RecordPage />
      </div>
    );
  }
  return null;
};

export default Page;