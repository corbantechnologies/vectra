/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  semikategoriaSchema,
  SemiKategoriaFormValues,
} from "@/lib/form-schemas";
import { createSemiKategoria } from "@/services/semikategoria";
import { useFetchKategorias } from "@/hooks/kategoria/actions";
import { toast } from "react-hot-toast";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";

interface CreateSemiKategoriaProps {
  kategoriaReference?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreateSemiKategoria({
  kategoriaReference,
  onSuccess,
  onCancel,
}: CreateSemiKategoriaProps) {
  const [loading, setLoading] = useState(false);
  const header = useAxiosAuth();
  const { data: kategorias = [], isLoading: loadingCats } = useFetchKategorias();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SemiKategoriaFormValues>({
    resolver: zodResolver(semikategoriaSchema),
    defaultValues: {
      name: "",
      kategoria: kategoriaReference || "",
    },
  });

  useEffect(() => {
    if (kategoriaReference) {
      setValue("kategoria", kategoriaReference);
    }
  }, [kategoriaReference, setValue]);

  const onSubmit = async (data: SemiKategoriaFormValues) => {
    setLoading(true);
    try {
      await createSemiKategoria(data, header);
      toast.success("Subcategory created successfully!");
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create subcategory. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 bg-white text-gray-900 text-sm";
  const labelClasses = "block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide";
  const errorClasses = "text-xs text-red-500 mt-1 font-bold";

  if (loadingCats && !kategoriaReference) {
    return (
      <div className="flex justify-center p-8">
        <div className="h-6 w-6 border-2 border-emerald-600 border-t-transparent rounded animate-spin"></div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto"
    >
      {/* Category Selection (Only if not provided) */}
      {!kategoriaReference && (
        <div className="animate-in fade-in slide-in-from-top-2">
          <label htmlFor="kategoria" className={labelClasses}>
            Select Category
          </label>
          <select
            id="kategoria"
            {...register("kategoria")}
            className={inputClasses}
          >
            <option value="">-- Choose Category --</option>
            {kategorias.map((cat) => (
              <option key={cat.reference} value={cat.reference}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.kategoria && <p className={errorClasses}>{errors.kategoria.message}</p>}
        </div>
      )}

      <div>
        <label htmlFor="name" className={labelClasses}>
          Subcategory Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Groceries, Rent, Salary"
          {...register("name")}
          className={`${inputClasses} ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
      </div>

      <div className="flex gap-4 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 px-4 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded h-5 w-5 border-2 border-white/30 border-t-white"></div>
          ) : (
            "Create Subcategory"
          )}
        </button>
      </div>
    </form>
  );
}
