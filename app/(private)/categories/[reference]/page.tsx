"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useFetchKategoria } from "@/hooks/kategoria/actions";
import { useFetchTransactions } from "@/hooks/transactions/actions";
import {
  ChevronLeft,
  Plus,
  Settings,
  Layers,
  ListOrdered,
  Calendar,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import TransactionList from "@/components/dashboard/TransactionList";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateSemiKategoria from "@/forms/semikategoria/CreateSemiKategoria";

export default function CategoryDetailPage() {
  const params = useParams();
  const reference = params.reference as string;
  const [openSub, setOpenSub] = useState(false);

  const {
    data: kategoria,
    isLoading: loadingKat,
    refetch: refetchKat,
  } = useFetchKategoria(reference);
  const { data: allTransactions = [], isLoading: loadingTrans } =
    useFetchTransactions();

  const categoryTransactions = allTransactions.filter(
    (t) => t.kategoria === reference,
  );

  if (loadingKat || loadingTrans) {
    return <LoadingSpinner fullPage text="Fetching category details..." />;
  }

  if (!kategoria) return null;

  return (
    <div className="space-y-8">
      {/* Back & Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/categories"
          className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold transition-colors group"
        >
          <div className="p-2 bg-gray-100 rounded group-hover:bg-emerald-50 transition-colors">
            <ChevronLeft size={20} />
          </div>
          <span>Back to Categories</span>
        </Link>
        <button className="p-3 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-all">
          <Settings size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-gray-100 rounded p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
                {kategoria.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded text-xs font-black uppercase tracking-widest border border-emerald-100">
                  {kategoria.is_shared ? "Shared" : "Personal"}
                </span>
                <span className="text-gray-400 text-sm font-bold flex items-center gap-1">
                  <Calendar size={14} /> Created{" "}
                  {new Date(kategoria.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Total Impact
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 bg-emerald-50 rounded flex items-center justify-center text-emerald-600">
                    <Wallet size={20} />
                  </div>
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    {categoryTransactions.length}{" "}
                    <span className="text-sm font-bold text-gray-400">
                      Txns
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <TransactionList transactions={categoryTransactions} />
        </div>

        {/* Sidebar: Subcategories */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-100 rounded p-6 shadow-sm overflow-hidden relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded">
                  <Layers size={20} />
                </div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight">
                  Subcategories
                </h3>
              </div>
              <button
                onClick={() => setOpenSub(true)}
                className="p-2 bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
              >
                <Plus size={18} />
              </button>
            </div>

            {kategoria.semikategorias.length === 0 ? (
              <div className="text-center py-10 px-4 bg-gray-50 rounded border border-dashed border-gray-200">
                <p className="text-xs font-bold text-gray-400">
                  No subcategories yet.
                </p>
                <button
                  onClick={() => setOpenSub(true)}
                  className="mt-4 text-emerald-600 text-xs font-black uppercase tracking-wider hover:underline"
                >
                  Create your first +
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {kategoria.semikategorias.map((sub) => (
                  <div
                    key={sub.reference}
                    className="p-4 bg-gray-50 rounded flex items-center justify-between group hover:bg-emerald-50 transition-colors cursor-default"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {sub.name}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        Active
                      </span>
                    </div>
                    <div className="h-8 w-8 rounded bg-white border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-emerald-500 transition-colors shadow-sm">
                      <ListOrdered size={14} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subcategory Modal */}
      <Dialog
        open={openSub}
        onClose={() => setOpenSub(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          style: { borderRadius: "1.5rem", padding: "1rem" },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h6" component="span" sx={{ fontWeight: 800 }}>
            New Subcategory
          </Typography>
          <IconButton onClick={() => setOpenSub(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CreateSemiKategoria
            kategoriaReference={reference}
            onSuccess={() => {
              setOpenSub(false);
              refetchKat();
            }}
            onCancel={() => setOpenSub(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
