"use client";

import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: "Features", href: "#features" },
      { label: "Integrations", href: "#" },
      { label: "Changelog", href: "#" },
    ],
    Company: [
      { label: "About Us", href: "#about" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Legal", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tighter">
                VECTRA
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed font-medium max-w-xs">
              Take control of your financial future with Vectra. The most
              intuitive way to track your expenses and income on the go.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, key: "fb" },
                { icon: Twitter, key: "tw" },
                { icon: Linkedin, key: "li" },
                { icon: Instagram, key: "ig" },
              ].map((item) => (
                <Link
                  key={item.key}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-emerald-600 transition-all duration-300"
                >
                  <item.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-bold mb-6">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-6">
            <h4 className="text-lg font-bold">Newsletter</h4>
            <p className="text-gray-400 font-medium">
              Subscribe to get the latest updates on personal finance
              management.
            </p>
            <div className="flex bg-gray-800 rounded-2xl p-1.5 border border-gray-700 focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-none focus:ring-0 px-4 py-2 w-full text-sm font-medium outline-none"
              />
              <button className="bg-emerald-600 px-4 py-2 rounded-xl text-sm font-black hover:bg-emerald-700 transition-colors">
                Join
              </button>
            </div>
            <p className="text-[10px] text-gray-500 italic mt-4">
              Powered by Corban Technologies LTD
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm font-medium">
          <p>© {currentYear} Corban Technologies LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
