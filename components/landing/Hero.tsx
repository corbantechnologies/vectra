"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-100/50 text-emerald-700 text-sm font-black mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles size={16} />
            <span>Smart Financial Tracking for Modern Teams</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight leading-[0.95] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Take Control of Your{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent italic">
              Financial Future
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Vectra helps you track expenses, manage budgets, and get deep
            insights into your spending habits. Simple, powerful, and secure.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-10 py-5 bg-emerald-600 text-white text-lg font-black rounded-[2rem] shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Get Started for Free
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 text-lg font-black rounded-[2rem] border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center justify-center"
            >
              How it Works
            </Link>
          </div>
        </div>

        {/* Hero Visual Placeholder */}
        <div className="mt-20 relative animate-in fade-in zoom-in-95 duration-1000 delay-700">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
          <div className="aspect-[16/9] w-full max-w-5xl mx-auto bg-gray-50 rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="grid grid-cols-3 gap-6 w-full">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-64 bg-white rounded-3xl border border-gray-100 shadow-sm animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
