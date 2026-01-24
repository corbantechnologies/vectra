/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionFormValues } from "@/lib/form-schemas";
import { createTransaction } from "@/services/transactions";
import { getKategoria, Kategoria } from "@/services/kategoria";
import { toast } from "react-hot-toast";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";

interface CreateTransactionProps {
  kategoriaReference: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreateTransaction({
  kategoriaReference,
  onSuccess,
  onCancel,
}: CreateTransactionProps) {
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [kategoria, setKategoria] = useState<Kategoria | null>(null);
  const header = useAxiosAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      transaction_type: "EXP",
      transaction_method: "CASH",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      kategoria: kategoriaReference,
      semikategoria: "",
    },
  });

  useEffect(() => {
    const fetchKategoria = async () => {
      try {
        const data = await getKategoria(header, kategoriaReference);
        setKategoria(data);
      } catch (error) {
        toast.error("Failed to load category metadata.");
      } finally {
        setFetchingData(false);
      }
    };
    if (header.token) {
      fetchKategoria();
    }
  }, [kategoriaReference, header]);

  const onSubmit = async (data: TransactionFormValues) => {
    setLoading(true);
    try {
      await createTransaction(data as any, header);
      toast.success("Transaction recorded successfully!");
      reset({
        transaction_type: data.transaction_type,
        transaction_method: data.transaction_method,
        amount: "",
        date: new Date().toISOString().split("T")[0],
        kategoria: kategoriaReference,
        semikategoria: "",
      });
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to record transaction. Please try again.",
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
      className="space-y-6 max-w-lg mx-auto p-2"
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

      {/* Amount Input */}
      <div>
        <label htmlFor="amount" className={labelClasses}>
          Amount
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          placeholder="0.00"
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
      {kategoria && kategoria.semikategorias.length > 0 && (
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
            {kategoria.semikategorias.map((s) => (
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
      <div className="flex flex-col gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            "Record Transaction"
          )}
        </button>
      </div>
    </form>
  );
}
