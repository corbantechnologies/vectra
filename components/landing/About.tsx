"use client";

import React from "react";
import { Info, Target, Users, Shield } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Our Mission
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Empowering individuals to take control of their financial journey
            through intuitive, intelligent tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-6 p-6 rounded bg-gray-50 border border-gray-100 transform hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-200">
                <Target size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Simplicity First
                </h3>
                <p className="text-gray-600 leading-relaxed font-normal">
                  We believe financial management shouldn&apos;t be a chore.
                  Vectra is designed with a focus on speed and ease of use.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded bg-gray-50 border border-gray-100 transform hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-200">
                <Shield size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Secure by Default
                </h3>
                <p className="text-gray-600 leading-relaxed font-normal">
                  Your financial data is private and sensitive. We use
                  industry-standard encryption to keep your information safe and
                  sound.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded bg-gray-50 border border-gray-100 transform hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-14 h-14 rounded bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-200">
                <Users size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Community Driven
                </h3>
                <p className="text-gray-600 leading-relaxed font-normal">
                  Built for you, by people who care about financial health.
                  We&apos;re constantly evolving based on your feedback.
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-emerald-600/5 rounded blur-2xl group-hover:bg-emerald-600/10 transition-colors duration-500" />
            <div className="relative aspect-square md:aspect-auto md:h-[600px] w-full bg-emerald-900 rounded p-12 overflow-hidden flex flex-col justify-end shadow-2xl">
              <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <Info size={400} />
              </div>
              <h4 className="text-3xl font-black text-white mb-4 leading-tight">
                Vectra belongs to{" "}
                <span className="text-emerald-400">those who plan</span> for
                their future.
              </h4>
              <p className="text-emerald-100/70 text-lg font-medium leading-relaxed max-w-sm">
                Join thousands of users who have found financial peace of mind
                through structured tracking and insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
