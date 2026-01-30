import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Header */}
      <DashboardHeader />

      {/* Main Content Container */}
      <main className="flex-grow flex flex-col w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
