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
import { TextField, Button, Stack, Box } from "@mui/material";
import { toast } from "react-hot-toast";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";

interface CreateSemiKategoriaProps {
  kategoriaReference: string; // The parent category reference
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
    reset,
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
      reset({ name: "", kategoria: kategoriaReference });
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Subcategory Name"
          variant="outlined"
          placeholder="e.g. Food, Transport, Rent"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}
        >
          {onCancel && (
            <Button variant="outlined" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Creating..." : "Create Subcategory"}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
