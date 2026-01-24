"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useFetchAccount } from "@/hooks/accounts/actions";
import {
  LogOut,
  Bell,
  LayoutDashboard,
  FolderOpen,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const { data: user } = useFetchAccount();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      name: "Categories",
      href: "/categories",
      icon: FolderOpen,
      active: pathname.startsWith("/categories"),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm backdrop-blur-md bg-white/90">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo / Branding - Left Side */}
        <Link href="/dashboard" className="flex-shrink-0 z-50">
          <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-200">
            VECTRA
          </h1>
        </Link>

        {/* Desktop Navigation - Hidden on Mobile */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-50 p-1 rounded-2xl border border-gray-100 mx-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 ${
                  link.active
                    ? "bg-white text-emerald-600 shadow-sm ring-1 ring-gray-100"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                <Icon
                  size={18}
                  className={link.active ? "text-emerald-500" : "text-gray-400"}
                />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions & User Profile */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* Notifications & Desktop Sign Out */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="p-2 sm:p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200">
              <Bell size={20} />
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="hidden sm:flex p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
              title="Sign Out"
            >
              <LogOut
                size={20}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>

          <div className="h-8 w-px bg-gray-100 hidden sm:block"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-bold text-gray-900 leading-tight">
                {user?.first_name} {user?.last_name}
              </span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">
                {user?.member_code || "Personal"}
              </span>
            </div>

            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-200 border-2 border-white ring-1 ring-emerald-600/10">
              {user?.first_name?.[0]}
              {user?.last_name?.[0]}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 z-50"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl overflow-hidden animate-in slide-in-from-top duration-300">
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-base font-bold transition-all duration-200 ${
                    link.active
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      link.active ? "text-emerald-600" : "text-gray-400"
                    }
                  />
                  {link.name}
                </Link>
              );
            })}
            <hr className="my-2 border-gray-50" />
            <button
              onClick={() => {
                setIsMenuOpen(false);
                signOut({ callbackUrl: "/auth/login" });
              }}
              className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-base font-bold text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
