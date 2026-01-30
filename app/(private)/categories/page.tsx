/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { FolderPlus, Layers, Trash2, Plus, ChevronRight, Folder } from "lucide-react";
import { useFetchKategorias } from "@/hooks/kategoria/actions";
import Link from "next/link";
import LoadingSpinner from "@/components/general/LoadingSpinner";

export default function CategoriesPage() {
  const { data: kategorias = [], isLoading } = useFetchKategorias();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-emerald-600 border-t-transparent rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Categories
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Manage your financial buckets and subcategories.
          </p>
        </div>

        {/* Action Button - Rounded */}
        <button className="px-5 py-3 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 transition-all text-sm flex items-center gap-2 shadow-sm hover:shadow-md">
          <Plus size={18} />
          New Category
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kategorias.map((cat) => (
          <Link
            key={cat.reference}
            href={`/categories/${cat.reference}`}
            className="group bg-white border border-gray-200 rounded p-0 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 flex flex-col h-full overflow-hidden"
          >
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-white border border-gray-100 rounded flex items-center justify-center text-gray-400 group-hover:text-emerald-600 group-hover:border-emerald-200 transition-colors shadow-sm">
                  <Folder size={20} />
                </div>
                <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {cat.name}
                </span>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-emerald-600" />
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-2xl font-bold text-gray-900">
                  {cat.semikategorias?.length || 0}
                </span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Subcategories
                </span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-gray-900">
                  {cat.transactions?.length || 0}
                </span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Transactions
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {kategorias.length === 0 && (
        <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded bg-gray-50">
          <p className="text-gray-400 font-bold text-sm">No categories found.</p>
        </div>
      )}
    </div>
  );
}
