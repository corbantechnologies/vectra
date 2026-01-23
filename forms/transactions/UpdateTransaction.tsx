/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionFormValues } from "@/lib/form-schemas";
import { updateTransaction, Transaction } from "@/services/transactions";
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
  const [fetchingData, setFetchingData] = useState(true);
  const [kategoria, setKategoria] = useState<Kategoria | null>(null);
  const header = useAxiosAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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

  useEffect(() => {
    const fetchKategoria = async () => {
      try {
        const data = await getKategoria(header, transaction.kategoria);
        setKategoria(data);
      } catch (error) {
        toast.error("Failed to load category metadata.");
      } finally {
        setFetchingData(false);
      }
    };
    if (header.headers.Authorization !== "Token undefined") {
      fetchKategoria();
    }
  }, [transaction.kategoria, header]);

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
                value={field.value}
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
            {loading ? "Updating..." : "Update Transaction"}
          </Button>
        </Box>
      </Stack>
    </form>
  );
}
