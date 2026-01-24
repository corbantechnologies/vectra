"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Stack,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import SummaryCards from "@/components/dashboard/SummaryCards";
import CategoryGrid from "@/components/dashboard/CategoryGrid";
import TransactionList from "@/components/dashboard/TransactionList";
import { useFetchKategorias } from "@/hooks/kategoria/actions";
import { useFetchTransactions } from "@/hooks/transactions/actions";
import CreateKategoria from "@/forms/kategoria/CreateKategoria";
import CreateTransaction from "@/forms/transactions/CreateTransaction";
import { Kategoria } from "@/services/kategoria";
import { useFetchAccount } from "@/hooks/accounts/actions";
import LoadingSpinner from "@/components/general/LoadingSpinner";

export default function Dashboard() {
  const { data: user } = useFetchAccount();
  const [openKategoria, setOpenKategoria] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
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
  };

  const handleKategoriaClick = (k: Kategoria) => {
    handleOpenTransaction(k.reference);
  };

  if (loadingKats || loadingTrans) {
    return <LoadingSpinner fullPage text="Syncing your financial data..." />;
  }

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#1a1a1a" }}>
            My Finances
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            {`Hello ${user?.first_name || "there"}, welcome back to Vectra.`}
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <Box
            onClick={() => setOpenKategoria(true)}
            sx={{
              cursor: "pointer",
              px: 3,
              py: 1.5,
              borderRadius: 3,
              border: "1px solid #357252",
              color: "#357252",
              fontWeight: 700,
              transition: "all 0.2s",
              "&:hover": { bgcolor: "rgba(53, 114, 82, 0.05)" },
            }}
          >
            + New Category
          </Box>
          <Box
            onClick={() => handleOpenTransaction()}
            sx={{
              cursor: "pointer",
              px: 3,
              py: 1.5,
              borderRadius: 3,
              bgcolor: "#357252",
              color: "#fff",
              fontWeight: 700,
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "#2d6146",
                boxShadow: "0 4px 12px rgba(53, 114, 82, 0.2)",
              },
            }}
          >
            + Add Transaction
          </Box>
        </Stack>
      </Box>

      {/* Financial Summary */}
      <SummaryCards income={totals.income} expenses={totals.expenses} />

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap ${
            activeTab === "all"
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
              : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
          }`}
        >
          Overview
        </button>
        {kategorias.map((cat) => (
          <button
            key={cat.reference}
            onClick={() => setActiveTab(cat.reference)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap ${
              activeTab === cat.reference
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            {cat.name}
          </button>
        ))}
        <button
          onClick={() => setOpenKategoria(true)}
          className="px-4 py-2.5 rounded-xl text-sm font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
        >
          <AddIcon sx={{ fontSize: 18 }} /> New
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <TransactionList transactions={filteredTransactions.slice(0, 10)} />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <CategoryGrid
            categories={kategorias.slice(0, 6)}
            onAddClick={() => setOpenKategoria(true)}
            onCategoryClick={handleKategoriaClick}
          />

          {/* Subcategory Provision (Quick Link/Placeholder for now) */}
          <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-200 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-lg font-black mb-1">Subcategories</h4>
              <p className="text-emerald-100 text-sm mb-4 font-medium opacity-90">
                Organize your expenses with precision.
              </p>
              <Link href="/categories">
                <button className="bg-white text-emerald-600 px-4 py-2 rounded-xl text-sm font-black hover:bg-emerald-50 transition-colors shadow-sm">
                  Manage Subcategories
                </button>
              </Link>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile Quick Actions */}
      <Fab
        color="primary"
        aria-label="add transaction"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: { sm: "none" },
        }}
        onClick={() => handleOpenTransaction()}
      >
        <AddIcon />
      </Fab>

      {/* Modals */}
      <Dialog
        open={openKategoria}
        onClose={() => setOpenKategoria(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography variant="h6" component="span" sx={{ fontWeight: 800 }}>
            New Category
          </Typography>
          <IconButton onClick={() => setOpenKategoria(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <CreateKategoria
            onSuccess={() => {
              setOpenKategoria(false);
              refetchKats();
            }}
            onCancel={() => setOpenKategoria(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openTransaction}
        onClose={() => setOpenTransaction(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography variant="h6" component="span" sx={{ fontWeight: 800 }}>
            New Transaction
          </Typography>
          <IconButton onClick={() => setOpenTransaction(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
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
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
