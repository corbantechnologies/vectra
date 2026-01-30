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
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
        <div className="bg-white border border-gray-100 rounded overflow-hidden shadow-sm">
          <div className="p-4 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 w-full bg-gray-50 animate-pulse rounded"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50 bg-white">
        <h3 className="text-xl font-black text-gray-900 tracking-tight">
          Recent Transactions
        </h3>
        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded border border-emerald-100">
          {transactions.length} Total
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="p-16 text-center">
          <p className="text-sm font-bold text-gray-400">
            No activity recorded yet.
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Type
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Category
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:table-cell">
                    Date
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">
                    Method
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
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
                      <td className="px-6 py-4">
                        <div
                          className={`h-9 w-9 rounded flex items-center justify-center transition-transform group-hover:scale-110 ${isExpense
                            ? "text-red-600 bg-red-50"
                            : "text-emerald-600 bg-emerald-50"
                            }`}
                        >
                          {isExpense ? (
                            <ArrowDownLeft size={18} />
                          ) : (
                            <ArrowUpRight size={18} />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900 leading-tight">
                            {transaction.kategoria_name}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                            {transaction.semikategoria_name || "General"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded">
                          {date}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-[10px] font-black text-gray-400 uppercase bg-white px-2 py-1 rounded border border-gray-100 shadow-sm">
                          {transaction.transaction_method}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`text-base font-black tabular-nums ${isExpense ? "text-red-600" : "text-emerald-600"
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
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-50">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded border border-gray-200 bg-white text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-emerald-600 hover:border-emerald-200 transition-all active:scale-95"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded border border-gray-200 bg-white text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-emerald-600 hover:border-emerald-200 transition-all active:scale-95"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
