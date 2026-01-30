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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo / Branding - Left Side */}
        <Link href="/dashboard" className="flex-shrink-0 z-50 flex items-center gap-2">
          <div className="h-8 w-8 bg-emerald-600 rounded flex items-center justify-center">
            <div className="h-3 w-3 bg-white rounded-sm"></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 uppercase">
            VECTRA
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 h-full mx-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded transition-all duration-200 ${link.active
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <Icon
                  size={18}
                  className={link.active ? "text-emerald-600" : "text-gray-400"}
                />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions & User Profile */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-all">
            <Bell size={20} />
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="hidden sm:flex p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all items-center justify-center group"
            title="Sign Out"
          >
            <LogOut
              size={20}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>

          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-bold text-gray-900 leading-tight">
                {user?.first_name} {user?.last_name}
              </span>
              <span className="text-xs font-medium text-gray-500 mt-0.5">
                {user?.member_code || "Personal"}
              </span>
            </div>

            <div className="h-10 w-10 bg-emerald-600 rounded flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
              {user?.first_name?.[0]}
              {user?.last_name?.[0]}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-all"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-in slide-in-from-top duration-300">
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded text-sm font-bold border ${link.active
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <Icon
                    size={18}
                    className={
                      link.active ? "text-emerald-600" : "text-gray-400"
                    }
                  />
                  {link.name}
                </Link>
              );
            })}
            <hr className="my-2 border-gray-100" />
            <button
              onClick={() => {
                setIsMenuOpen(false);
                signOut({ callbackUrl: "/login" });
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
