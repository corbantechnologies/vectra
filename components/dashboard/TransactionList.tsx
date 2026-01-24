"use client";

import React, { useState, useMemo } from "react";
import { Transaction } from "@/services/transactions";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
}

const ITEMS_PER_PAGE = 5;

export default function TransactionList({
  transactions,
  loading,
}: TransactionListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = begin + ITEMS_PER_PAGE;
    return transactions.slice(begin, end);
  }, [transactions, currentPage]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md" />
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 w-full bg-gray-50 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-gray-900 tracking-tight">
          Recent Transactions
        </h3>
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
          Total: {transactions.length}
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
          <p className="text-sm font-bold text-gray-400">
            No activity recorded yet.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Type
                  </th>
                  <th className="px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    Category
                  </th>
                  <th className="px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-widest hidden sm:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">
                    Method
                  </th>
                  <th className="px-4 py-3 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentData.map((transaction) => {
                  const isExpense = transaction.transaction_type === "EXP";
                  const date = new Date(transaction.date).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    },
                  );

                  return (
                    <tr
                      key={transaction.reference}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-4 py-2.5">
                        <div
                          className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                            isExpense
                              ? "text-red-600 bg-red-50"
                              : "text-emerald-600 bg-emerald-50"
                          }`}
                        >
                          {isExpense ? (
                            <ArrowDownLeft size={16} />
                          ) : (
                            <ArrowUpRight size={16} />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-900 leading-none mb-1">
                            {transaction.kategoria_name}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            {transaction.semikategoria_name || "General"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 hidden sm:table-cell">
                        <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
                          {date}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 hidden md:table-cell">
                        <span className="text-[10px] font-black text-gray-400 uppercase bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200/50">
                          {transaction.transaction_method}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <span
                          className={`text-sm font-black tabular-nums ${
                            isExpense ? "text-red-600" : "text-emerald-600"
                          }`}
                        >
                          {isExpense ? "-" : "+"}
                          {parseFloat(transaction.amount).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                            },
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-3 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
