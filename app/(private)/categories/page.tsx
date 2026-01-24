"use client";

import React from "react";
import { useFetchKategorias } from "@/hooks/kategoria/actions";
import { ChevronRight, Plus, Folder } from "lucide-react";
import Link from "next/link";

export default function CategoriesPage() {
  const { data: kategorias = [], isLoading } = useFetchKategorias();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-40 w-full bg-white border border-gray-100 animate-pulse rounded-2xl shadow-sm"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Categories
          </h2>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Manage your financial buckets and subcategories.
          </p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95">
          <Plus size={20} />
          New Category
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kategorias.map((cat) => (
          <Link
            key={cat.reference}
            href={`/categories/${cat.reference}`}
            className="group bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 hover:border-emerald-100 transition-all duration-300 relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <Folder size={24} />
                </div>
                <div className="p-2 text-gray-300 group-hover:text-emerald-500 transition-colors">
                  <ChevronRight size={20} />
                </div>
              </div>

              <h3 className="text-lg font-black text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                {cat.name}
              </h3>

              <div className="mt-auto pt-4 flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-xl font-black text-gray-900">
                    {cat.semikategorias?.length || 0}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Subcategories
                  </span>
                </div>
                <div className="h-8 w-px bg-gray-100"></div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-gray-900">
                    {cat.transactions?.length || 0}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Transactions
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
