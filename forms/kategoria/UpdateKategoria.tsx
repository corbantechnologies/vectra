/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kategoriaSchema, KategoriaFormValues } from "@/lib/form-schemas";
import { updateKategoria, Kategoria } from "@/services/kategoria";
import {
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { toast } from "react-hot-toast";
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";

interface UpdateKategoriaProps {
  kategoria: Kategoria;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function UpdateKategoria({
  kategoria,
  onSuccess,
  onCancel,
}: UpdateKategoriaProps) {
  const [loading, setLoading] = useState(false);
  const header = useAxiosAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KategoriaFormValues>({
    resolver: zodResolver(kategoriaSchema),
    defaultValues: {
      name: kategoria.name,
      is_shared: kategoria.is_shared,
    },
  });

  const onSubmit = async (data: KategoriaFormValues) => {
    setLoading(true);
    try {
      await updateKategoria(data, header, kategoria.reference);
      toast.success("Category updated successfully!");
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update category. Please try again.",
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
          label="Category Name"
          variant="outlined"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("is_shared")}
              defaultChecked={kategoria.is_shared}
            />
          }
          label="Share this category with others"
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
            {loading ? "Updating..." : "Update Category"}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
