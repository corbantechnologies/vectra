/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionFormValues } from "@/lib/form-schemas";
import { updateTransaction, Transaction } from "@/services/transactions";
import { useFetchKategorias } from "@/hooks/kategoria/actions";
import { toast } from "react-hot-toast";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";

interface UpdateTransactionProps {
  transaction: Transaction;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function UpdateTransaction({
  transaction,
  onSuccess,
  onCancel,
}: UpdateTransactionProps) {
  const [loading, setLoading] = useState(false);
  const header = useAxiosAuth();

  const { data: kategorias = [], isLoading: fetchingData } =
    useFetchKategorias();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transaction_type: transaction.transaction_type as any,
      transaction_method: transaction.transaction_method as any,
      amount: transaction.amount,
      date: transaction.date.split("T")[0],
      kategoria: transaction.kategoria,
      semikategoria: transaction.semikategoria || "",
    },
  });

  const selectedKategoriaRef = watch("kategoria");

  const selectedKategoria = useMemo(() => {
    return kategorias.find((k) => k.reference === selectedKategoriaRef);
  }, [kategorias, selectedKategoriaRef]);

  // Reset subcategory if kategoria changes manually
  useEffect(() => {
    if (selectedKategoriaRef !== transaction.kategoria) {
      setValue("semikategoria", "");
    }
  }, [selectedKategoriaRef, setValue, transaction.kategoria]);

  const onSubmit = async (data: TransactionFormValues) => {
    setLoading(true);
    try {
      await updateTransaction(data as any, header, transaction.reference);
      toast.success("Transaction updated!");
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update transaction.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin h-8 w-8 border-b-2 border-emerald-600 rounded"></div>
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-colors text-sm bg-white text-gray-900";
  const labelClasses = "block text-xs font-semibold text-gray-700 mb-1.5";
  const errorClasses = "text-xs text-red-500 mt-1 font-medium";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Transaction Type Toggle */}
      <Controller
        name="transaction_type"
        control={control}
        render={({ field }) => (
          <div className="flex bg-gray-100 p-1 rounded">
            <button
              type="button"
              onClick={() => field.onChange("EXP")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-all ${field.value === "EXP"
                ? "bg-white text-red-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => field.onChange("IN")}
              className={`flex-1 py-2 text-sm font-bold rounded transition-all ${field.value === "IN"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Income
            </button>
          </div>
        )}
      />

      {/* Main Amount Input */}
      <div>
        <label htmlFor="amount" className="sr-only">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">
            KES
          </span>
          <input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount")}
            className="w-full pl-16 pr-4 py-4 text-3xl font-bold border border-gray-200 rounded focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-gray-900 placeholder-gray-300 transition-colors text-left"
          />
        </div>
        {errors.amount && <p className="text-left text-xs text-red-500 mt-1 font-medium">{errors.amount.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Date Input */}
        <div>
          <label htmlFor="date" className={labelClasses}>
            Date
          </label>
          <input
            id="date"
            type="date"
            {...register("date")}
            className={inputClasses}
          />
          {errors.date && <p className={errorClasses}>{errors.date.message}</p>}
        </div>

        {/* Payment Method Select */}
        <div>
          <label htmlFor="method" className={labelClasses}>
            Method
          </label>
          <select
            id="method"
            {...register("transaction_method")}
            className={inputClasses}
          >
            <option value="" disabled>Select...</option>
            <option value="CASH">Cash</option>
            <option value="MPESA">M-Pesa</option>
            <option value="CARD">Card</option>
            <option value="CHEQUE">Cheque</option>
            <option value="TRANSFER">Transfer</option>
          </select>
          {errors.transaction_method && (
            <p className={errorClasses}>{errors.transaction_method.message}</p>
          )}
        </div>
      </div>

      {/* Category Select */}
      <div>
        <label htmlFor="kategoria" className={labelClasses}>
          Category
        </label>
        <select
          id="kategoria"
          {...register("kategoria")}
          className={inputClasses}
        >
          {kategorias.map((k) => (
            <option key={k.reference} value={k.reference}>
              {k.name}
            </option>
          ))}
        </select>
        {errors.kategoria && (
          <p className={errorClasses}>{errors.kategoria.message}</p>
        )}
      </div>

      {/* Subcategory Select (Conditional) */}
      {selectedKategoria && selectedKategoria.semikategorias.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          <label htmlFor="semikategoria" className={labelClasses}>
            Subcategory
          </label>
          <select
            id="semikategoria"
            {...register("semikategoria")}
            className={inputClasses}
          >
            <option value="">None</option>
            {selectedKategoria.semikategorias.map((s) => (
              <option key={s.reference} value={s.reference}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-4 flex gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded hover:bg-gray-200 transition-colors text-sm"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 px-4 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 shadow-sm hover:shadow transition-all text-sm flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded"></div>
          ) : (
            "Update Record"
          )}
        </button>
      </div>
    </form>
  );
}
