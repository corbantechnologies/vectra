/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kategoriaSchema, KategoriaFormValues } from "@/lib/form-schemas";
import { createKategoria } from "@/services/kategoria";
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

interface CreateKategoriaProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreateKategoria({
  onSuccess,
  onCancel,
}: CreateKategoriaProps) {
  const [loading, setLoading] = useState(false);
  const header = useAxiosAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<KategoriaFormValues>({
    resolver: zodResolver(kategoriaSchema),
    defaultValues: {
      name: "",
      is_shared: false,
    },
  });

  const onSubmit = async (data: KategoriaFormValues) => {
    setLoading(true);
    try {
      await createKategoria(data, header);
      toast.success("Category created successfully!");
      reset();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create category. Please try again.",
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
          placeholder="e.g. Family, Business, Personal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <FormControlLabel
          control={<Checkbox {...register("is_shared")} />}
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
            {loading ? "Creating..." : "Create Category"}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
