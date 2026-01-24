"use client";

import React from "react";
import { Wallet, PieChart, LayoutGrid, Users } from "lucide-react";

const features = [
  {
    title: "Expense Tracking",
    description:
      "Easily log every transaction and keep your finances organized in real-time.",
    icon: Wallet,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Insightful Analytics",
    description:
      "Visualize your spending patterns with beautiful charts and actionable data.",
    icon: PieChart,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Smart Categories",
    description:
      "Organize items using Kategoria and Semikategoria for precise tracking.",
    icon: LayoutGrid,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Shared Expenses",
    description:
      "Collaborate with family or business partners to manage shared budgets.",
    icon: Users,
    color: "bg-rose-50 text-rose-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Master Your Money
          </h2>
          <p className="text-lg text-gray-500 font-medium">
            Powerful features designed to give you a clear picture of where your
            money goes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500`}
                >
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
