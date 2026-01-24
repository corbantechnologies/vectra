"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useFetchAccount } from "@/hooks/accounts/actions";
import { LogOut, Bell } from "lucide-react";

export default function DashboardHeader() {
  const { data: user } = useFetchAccount();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center">
          <h1 className="text-2xl font-black tracking-tighter cursor-pointer bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            VECTRA
          </h1>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Notifications */}
          <button className="p-2.5 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <Bell size={20} />
          </button>

          <div className="h-10 w-px bg-gray-100 hidden sm:block"></div>

          {/* User Profile & Sign Out */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-bold text-gray-900 leading-tight">
                {user?.first_name} {user?.last_name}
              </span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                {user?.member_code || "Personal Account"}
              </span>
            </div>

            {/* Avatar */}
            <div className="h-11 w-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-200 border-2 border-white ring-1 ring-emerald-600/10">
              {user?.first_name?.[0]}
              {user?.last_name?.[0]}
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="ml-2 p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-red-500"
              title="Sign Out"
            >
              <LogOut
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
