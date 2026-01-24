/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  semikategoriaSchema,
  SemiKategoriaFormValues,
} from "@/lib/form-schemas";
import { createSemiKategoria } from "@/services/semikategoria";
import { toast } from "react-hot-toast";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";

interface CreateSemiKategoriaProps {
  kategoriaReference: string;
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SemiKategoriaFormValues>({
    resolver: zodResolver(semikategoriaSchema),
    defaultValues: {
      name: "",
      kategoria: kategoriaReference,
    },
  });

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
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 bg-white text-gray-900";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1";
  const errorClasses = "text-xs text-red-500 mt-1 font-medium";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto p-2"
    >
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

      <div className="flex flex-col gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            "Create Subcategory"
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full py-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
