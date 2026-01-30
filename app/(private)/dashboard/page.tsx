"use client";

import React, { useState, useMemo } from "react";
import { useFetchAccount } from "@/hooks/accounts/actions";
import { useFetchTransactions } from "@/hooks/transactions/actions";
import { useFetchKategorias } from "@/hooks/kategoria/actions";
import SummaryCards from "@/components/dashboard/SummaryCards";
import TransactionList from "@/components/dashboard/TransactionList";
import Modal from "@/components/general/Modal";
import CreateTransaction from "@/forms/transactions/CreateTransaction";
import CreateKategoria from "@/forms/kategoria/CreateKategoria";
import CreateSemiKategoria from "@/forms/semikategoria/CreateSemiKategoria";
import { CreditCard, FolderPlus, Layers, Plus } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { data: user } = useFetchAccount();
  const { data: transactions = [], isLoading: loadingTx } = useFetchTransactions();
  const { data: kategorias = [] } = useFetchKategorias();

  const [activeTab, setActiveTab] = useState("all");
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openKategoria, setOpenKategoria] = useState(false);
  const [openSemiKategoria, setOpenSemiKategoria] = useState(false);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    if (activeTab === "all") return transactions;
    return transactions.filter((t) => t.kategoria === activeTab);
  }, [activeTab, transactions]);

  // Calculate totals
  const totals = useMemo(() => {
    return filteredTransactions.reduce(
      (acc, t) => {
        const amount = parseFloat(t.amount);
        if (t.transaction_type === "IN") {
          acc.income += amount;
        } else {
          acc.expenses += amount;
        }
        return acc;
      },
      { income: 0, expenses: 0 },
    );
  }, [filteredTransactions]);

  const handleOpenTransaction = () => setOpenTransaction(true);

  return (
    <div className="space-y-8 pb-24">
      {/* Welcome Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Overview
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Welcome back,{" "}
            <span className="text-emerald-700 font-bold">
              {user?.first_name || "Guest"}
            </span>
          </p>
        </div>

        {/* Desktop Quick Actions - Rounded */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleOpenTransaction()}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-200 hover:border-emerald-500 hover:text-emerald-700 rounded transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-wide shadow-sm"
          >
            <CreditCard size={16} />
            <span>Record</span>
          </button>
          <button
            onClick={() => setOpenKategoria(true)}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-200 hover:border-emerald-500 hover:text-emerald-700 rounded transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-wide shadow-sm"
          >
            <FolderPlus size={16} />
            <span>Category</span>
          </button>
          <button
            onClick={() => setOpenSemiKategoria(true)}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-200 hover:border-emerald-500 hover:text-emerald-700 rounded transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-wide shadow-sm"
          >
            <Layers size={16} />
            <span>Subcat</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <SummaryCards income={totals.income} expenses={totals.expenses} />

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded text-sm font-bold transition-all duration-300 whitespace-nowrap border ${activeTab === "all"
              ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-100"
              : "bg-white border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            All
          </button>
          {kategorias.map((cat) => (
            <button
              key={cat.reference}
              onClick={() => setActiveTab(cat.reference)}
              className={`px-5 py-2.5 rounded text-sm font-bold transition-all duration-300 whitespace-nowrap border ${activeTab === cat.reference
                ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-100"
                : "bg-white border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded shadow-sm">
          <TransactionList transactions={filteredTransactions.slice(0, 15)} />
          {filteredTransactions.length > 15 && (
            <div className="p-4 text-center border-t border-gray-100">
              <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-700 transition-colors">
                View All Transactions
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals - All using standard Widths */}
      <Modal
        isOpen={openTransaction}
        onClose={() => setOpenTransaction(false)}
        title="Record Transaction"
        maxWidth="sm"
      >
        <CreateTransaction
          kategoriaReference={activeTab !== "all" ? activeTab : ""}
          onSuccess={() => {
            setOpenTransaction(false);
          }}
          onCancel={() => setOpenTransaction(false)}
        />
      </Modal>

      <Modal
        isOpen={openKategoria}
        onClose={() => setOpenKategoria(false)}
        title="New Category"
        maxWidth="sm"
      >
        <CreateKategoria
          onSuccess={() => setOpenKategoria(false)}
          onCancel={() => setOpenKategoria(false)}
        />
      </Modal>

      <Modal
        isOpen={openSemiKategoria}
        onClose={() => setOpenSemiKategoria(false)}
        title="New Subcategory"
        maxWidth="sm"
      >
        <CreateSemiKategoria
          kategoriaReference={activeTab !== "all" ? activeTab : ""}
          onSuccess={() => setOpenSemiKategoria(false)}
          onCancel={() => setOpenSemiKategoria(false)}
        />
      </Modal>
    </div>
  );
}
