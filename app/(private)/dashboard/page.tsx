"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Layers, FolderPlus, CreditCard, X } from "lucide-react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import TransactionList from "@/components/dashboard/TransactionList";
import { useFetchKategorias } from "@/hooks/kategoria/actions";
import { useFetchTransactions } from "@/hooks/transactions/actions";
import CreateKategoria from "@/forms/kategoria/CreateKategoria";
import CreateTransaction from "@/forms/transactions/CreateTransaction";
import CreateSemiKategoria from "@/forms/semikategoria/CreateSemiKategoria";
import { useFetchAccount } from "@/hooks/accounts/actions";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import Modal from "@/components/general/Modal";

export default function Dashboard() {
  const { data: user } = useFetchAccount();
  const [openKategoria, setOpenKategoria] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openSemiKategoria, setOpenSemiKategoria] = useState(false);
  const [isFabExpanded, setIsFabExpanded] = useState(false);
  const [selectedKategoriaRef, setSelectedKategoriaRef] = useState<
    string | null
  >(null);
  const [activeTab, setActiveTab] = useState("all");

  const {
    data: kategorias = [],
    isLoading: loadingKats,
    refetch: refetchKats,
  } = useFetchKategorias();
  const {
    data: transactions = [],
    isLoading: loadingTrans,
    refetch: refetchTrans,
  } = useFetchTransactions();

  // Calculate summary
  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        const amount = parseFloat(curr.amount);
        if (curr.transaction_type === "IN") {
          acc.income += amount;
        } else {
          acc.expenses += amount;
        }
        return acc;
      },
      { income: 0, expenses: 0 },
    );
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (activeTab === "all") return transactions;
    return transactions.filter((t) => t.kategoria === activeTab);
  }, [transactions, activeTab]);

  const handleOpenTransaction = (kRef?: string) => {
    setSelectedKategoriaRef(kRef || null);
    setOpenTransaction(true);
    setIsFabExpanded(false);
  };

  if (loadingKats || loadingTrans) {
    return <LoadingSpinner fullPage text="Syncing your financial data..." />;
  }

  const fabActions = [
    {
      label: "Transaction",
      icon: CreditCard,
      onClick: () => handleOpenTransaction(),
      color: "bg-emerald-600",
    },
    {
      label: "Category",
      icon: FolderPlus,
      onClick: () => {
        setOpenKategoria(true);
        setIsFabExpanded(false);
      },
      color: "bg-indigo-600",
    },
    {
      label: "Subcategory",
      icon: Layers,
      onClick: () => {
        setOpenSemiKategoria(true);
        setIsFabExpanded(false);
      },
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="space-y-10 pb-24">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            My Finances
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Hello{" "}
            <span className="text-emerald-600 font-bold">
              {user?.first_name || "there"}
            </span>
            , welcome back to Vectra.
          </p>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <SummaryCards income={totals.income} expenses={totals.expenses} />

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap border-2 ${
              activeTab === "all"
                ? "bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-100"
                : "bg-white border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
            }`}
          >
            Overview
          </button>
          {kategorias.map((cat) => (
            <button
              key={cat.reference}
              onClick={() => setActiveTab(cat.reference)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 whitespace-nowrap border-2 ${
                activeTab === cat.reference
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-100"
                  : "bg-white border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden transform transition-all duration-500">
          <TransactionList transactions={filteredTransactions.slice(0, 15)} />
          <div className="p-6 text-center border-t border-gray-50">
            <Link
              href="/categories"
              className="text-sm font-bold text-gray-400 hover:text-emerald-600 transition-colors"
            >
              Manage categories & subcategories &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Expandable Floating Action Button */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-[100]">
        {/* Action Menu */}
        {isFabExpanded && (
          <div className="flex flex-col gap-3 mb-2 animate-in slide-in-from-bottom-5 fade-in duration-300">
            {fabActions.map((action, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <span className="bg-white px-3 py-1.5 rounded-xl shadow-lg border border-gray-100 text-xs font-black text-gray-700 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  {action.label}
                </span>
                <button
                  onClick={action.onClick}
                  className={`w-14 h-14 ${action.color} text-white rounded-2xl shadow-xl flex items-center justify-center transform hover:scale-110 active:scale-95 transition-all duration-200 border-4 border-white`}
                >
                  <action.icon size={22} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={() => setIsFabExpanded(!isFabExpanded)}
          className={`w-16 h-16 ${isFabExpanded ? "bg-gray-900" : "bg-emerald-600"} text-white rounded-[1.5rem] shadow-2xl flex items-center justify-center transform active:scale-95 transition-all duration-300 z-50 border-4 border-white ring-8 ring-emerald-500/5`}
        >
          {isFabExpanded ? (
            <X size={32} strokeWidth={2.5} />
          ) : (
            <Plus size={32} strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* Backdrop for expanded FAB */}
      {isFabExpanded && (
        <div
          className="fixed inset-0 bg-white/60 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          onClick={() => setIsFabExpanded(false)}
        />
      )}

      {/* Modals */}
      <Modal
        isOpen={openKategoria}
        onClose={() => setOpenKategoria(false)}
        title="New Category Bucket"
        maxWidth="xs"
      >
        <CreateKategoria
          onSuccess={() => {
            setOpenKategoria(false);
            refetchKats();
          }}
          onCancel={() => setOpenKategoria(false)}
        />
      </Modal>

      <Modal
        isOpen={openSemiKategoria}
        onClose={() => setOpenSemiKategoria(false)}
        title="New Subcategory"
        maxWidth="xs"
      >
        <CreateSemiKategoria
          kategoriaReference={kategorias[0]?.reference || ""}
          onSuccess={() => {
            setOpenSemiKategoria(false);
            refetchKats();
          }}
          onCancel={() => setOpenSemiKategoria(false)}
        />
      </Modal>

      <Modal
        isOpen={openTransaction}
        onClose={() => setOpenTransaction(false)}
        title="Quick Transaction"
        maxWidth="xs"
      >
        <CreateTransaction
          kategoriaReference={
            selectedKategoriaRef || kategorias[0]?.reference || ""
          }
          onSuccess={() => {
            setOpenTransaction(false);
            refetchTrans();
          }}
          onCancel={() => setOpenTransaction(false)}
        />
      </Modal>
    </div>
  );
}
