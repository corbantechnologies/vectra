/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionFormValues } from "@/lib/form-schemas";
import { createTransaction } from "@/services/transactions";
import { getKategoria, Kategoria } from "@/services/kategoria";
import {
  TextField,
  Button,
  Stack,
  Box,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  CircularProgress,
} from "@mui/material";
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
    setValue,
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
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Type
          </Typography>
          <Controller
            name="transaction_type"
            control={control}
            render={({ field }) => (
              <ToggleButtonGroup
                color="primary"
                value={field.value || "EXP"}
                exclusive
                onChange={(_, value) => value && field.onChange(value)}
                fullWidth
              >
                <ToggleButton value="EXP">Expense</ToggleButton>
                <ToggleButton value="IN">Income</ToggleButton>
              </ToggleButtonGroup>
            )}
          />
        </Box>

        <TextField
          fullWidth
          label="Amount"
          variant="outlined"
          type="number"
          placeholder="0.00"
          {...register("amount")}
          error={!!errors.amount}
          helperText={errors.amount?.message}
        />

        <TextField
          fullWidth
          label="Date"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register("date")}
          error={!!errors.date}
          helperText={errors.date?.message}
        />

        <TextField
          select
          fullWidth
          label="Method"
          variant="outlined"
          {...register("transaction_method")}
          error={!!errors.transaction_method}
          helperText={errors.transaction_method?.message}
        >
          <MenuItem value="CASH">Cash</MenuItem>
          <MenuItem value="CARD">Card / Digital Payment</MenuItem>
        </TextField>

        {kategoria && kategoria.semikategorias.length > 0 && (
          <TextField
            select
            fullWidth
            label="Subcategory (Optional)"
            variant="outlined"
            {...register("semikategoria")}
            error={!!errors.semikategoria}
            helperText={errors.semikategoria?.message}
          >
            <MenuItem value="">None</MenuItem>
            {kategoria.semikategorias.map((s) => (
              <MenuItem key={s.reference} value={s.reference}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>
        )}

        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}
        >
          {onCancel && (
            <Button variant="outlined" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Recording..." : "Record Transaction"}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
