"use client";

import React from "react";

interface LoadingSpinnerProps {
  fullPage?: boolean;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function LoadingSpinner({
  fullPage = false,
  size = "md",
  text,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  const containerClasses = fullPage
    ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
    : "flex flex-col items-center justify-center p-8 w-full";

  return (
    <div className={containerClasses}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-gray-100 border-t-emerald-600`}
      ></div>
      {text && (
        <p className="mt-4 text-sm font-bold text-gray-500 uppercase tracking-widest animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
