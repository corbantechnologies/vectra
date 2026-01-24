"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
              V
            </div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              VECTRA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
              >
                {item.label}
              </Link>
            ))}
            <div className="w-px h-6 bg-gray-100 mx-4" />
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-bold text-gray-600 hover:text-emerald-600 transition-all"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[70px] z-[90] bg-white md:hidden animate-in fade-in slide-in-from-top-4 duration-300 h-screen overflow-y-auto">
          <div className="px-4 pt-4 pb-24 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-4 text-lg font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-2xl transition-all"
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-4 border-gray-50" />
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-4 text-lg font-bold text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-2xl"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="block w-full px-6 py-4 bg-emerald-600 text-white text-center text-lg font-bold rounded-2xl shadow-xl shadow-emerald-100"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
