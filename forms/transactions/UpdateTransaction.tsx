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
    // Only reset if it's not the initial value set by the transaction prop
    if (selectedKategoriaRef !== transaction.kategoria) {
      setValue("semikategoria", "");
    }
  }, [selectedKategoriaRef, setValue, transaction.kategoria]);

  const onSubmit = async (data: TransactionFormValues) => {
    setLoading(true);
    try {
      await updateTransaction(data as any, header, transaction.reference);
      toast.success("Transaction updated successfully!");
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update transaction. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-white text-gray-900";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1";
  const errorClasses = "text-xs text-red-500 mt-1 font-medium";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto p-4"
    >
      {/* Transaction Type Toggle */}
      <div className="space-y-2">
        <label className={labelClasses}>Transaction Type</label>
        <Controller
          name="transaction_type"
          control={control}
          render={({ field }) => (
            <div className="flex p-1 bg-gray-100 rounded-xl space-x-1">
              <button
                type="button"
                onClick={() => field.onChange("EXP")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
                  field.value === "EXP"
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => field.onChange("IN")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
                  field.value === "IN"
                    ? "bg-white text-emerald-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Income
              </button>
            </div>
          )}
        />
        {errors.transaction_type && (
          <p className={errorClasses}>{errors.transaction_type.message}</p>
        )}
      </div>

      {/* Category Select */}
      <div>
        <label htmlFor="kategoria" className={labelClasses}>
          Category
        </label>
        <select
          id="kategoria"
          {...register("kategoria")}
          className={`${inputClasses} ${errors.kategoria ? "border-red-500" : "border-gray-300"}`}
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

      {/* Amount Input */}
      <div>
        <label htmlFor="amount" className={labelClasses}>
          Amount
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          {...register("amount")}
          className={`${inputClasses} ${errors.amount ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.amount && (
          <p className={errorClasses}>{errors.amount.message}</p>
        )}
      </div>

      {/* Date Input */}
      <div>
        <label htmlFor="date" className={labelClasses}>
          Date
        </label>
        <input
          id="date"
          type="date"
          {...register("date")}
          className={`${inputClasses} ${errors.date ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.date && <p className={errorClasses}>{errors.date.message}</p>}
      </div>

      {/* Transaction Method Select */}
      <div>
        <label htmlFor="method" className={labelClasses}>
          Payment Method
        </label>
        <select
          id="method"
          {...register("transaction_method")}
          className={`${inputClasses} ${errors.transaction_method ? "border-red-500" : "border-gray-300"}`}
        >
          <option value="CASH">Cash</option>
          <option value="MPESA">M-Pesa</option>
          <option value="CARD">Card / Digital Payment</option>
          <option value="CHEQUE">Cheque</option>
          <option value="TRANSFER">Bank Transfer</option>
        </select>
        {errors.transaction_method && (
          <p className={errorClasses}>{errors.transaction_method.message}</p>
        )}
      </div>

      {/* Subcategory Select */}
      {selectedKategoria && selectedKategoria.semikategorias.length > 0 && (
        <div>
          <label htmlFor="semikategoria" className={labelClasses}>
            Subcategory (Optional)
          </label>
          <select
            id="semikategoria"
            {...register("semikategoria")}
            className={`${inputClasses} ${errors.semikategoria ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">None</option>
            {selectedKategoria.semikategorias.map((s) => (
              <option key={s.reference} value={s.reference}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.semikategoria && (
            <p className={errorClasses}>{errors.semikategoria.message}</p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2 px-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200/50 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
          )}
          {loading ? "Updating..." : "Update Transaction"}
        </button>
      </div>
    </form>
  );
}
