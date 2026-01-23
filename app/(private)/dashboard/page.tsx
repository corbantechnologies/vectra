"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Stack,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SummaryCards from "@/components/dashboard/SummaryCards";
import CategoryGrid from "@/components/dashboard/CategoryGrid";
import TransactionList from "@/components/dashboard/TransactionList";
import { useFetchKategorias } from "@/hooks/kategoria/actions";
import { useFetchTransactions } from "@/hooks/transactions/actions";
import CreateKategoria from "@/forms/kategoria/CreateKategoria";
import CreateTransaction from "@/forms/transactions/CreateTransaction";
import { Kategoria } from "@/services/kategoria";
import { useFetchAccount } from "@/hooks/accounts/actions";

export default function Dashboard() {
  const { data: user } = useFetchAccount();
  const [openKategoria, setOpenKategoria] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [selectedKategoriaRef, setSelectedKategoriaRef] = useState<
    string | null
  >(null);

  const {
    data: kategorias = [],
    isLoading: loadingKats,
    refetch: refetchKats,
  } = useFetchKategorias();
  const {
    data: transactions = [],
    isLoading: loadingTrans,
    refetch: refetchTrans,
  } = useFetchTransactions();

  // Calculate summary
  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        const amount = parseFloat(curr.amount);
        if (curr.transaction_type === "IN") {
          acc.income += amount;
        } else {
          acc.expenses += amount;
        }
        return acc;
      },
      { income: 0, expenses: 0 },
    );
  }, [transactions]);

  const handleOpenTransaction = (kRef?: string) => {
    setSelectedKategoriaRef(kRef || null);
    setOpenTransaction(true);
  };

  const handleKategoriaClick = (k: Kategoria) => {
    handleOpenTransaction(k.reference);
  };

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#1a1a1a" }}>
            My Finances
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            {loadingKats || loadingTrans
              ? "Loading your financial data..."
              : `Hello ${user?.first_name || "there"}, welcome back to Vectra.`}
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <Box
            onClick={() => setOpenKategoria(true)}
            sx={{
              cursor: "pointer",
              px: 3,
              py: 1.5,
              borderRadius: 3,
              border: "1px solid #357252",
              color: "#357252",
              fontWeight: 700,
              transition: "all 0.2s",
              "&:hover": { bgcolor: "rgba(53, 114, 82, 0.05)" },
            }}
          >
            + New Category
          </Box>
          <Box
            onClick={() => handleOpenTransaction()}
            sx={{
              cursor: "pointer",
              px: 3,
              py: 1.5,
              borderRadius: 3,
              bgcolor: "#357252",
              color: "#fff",
              fontWeight: 700,
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "#2d6146",
                boxShadow: "0 4px 12px rgba(53, 114, 82, 0.2)",
              },
            }}
          >
            + Add Transaction
          </Box>
        </Stack>
      </Box>

      {/* Financial Summary */}
      <SummaryCards income={totals.income} expenses={totals.expenses} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <TransactionList transactions={transactions.slice(0, 10)} />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={4}>
            <CategoryGrid
              categories={kategorias.slice(0, 6)}
              onAddClick={() => setOpenKategoria(true)}
              onCategoryClick={handleKategoriaClick}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* Floating Action Button for Mobile Quick Actions */}
      <Fab
        color="primary"
        aria-label="add transaction"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: { sm: "none" },
        }}
        onClick={() => handleOpenTransaction()}
      >
        <AddIcon />
      </Fab>

      {/* Modals */}
      <Dialog
        open={openKategoria}
        onClose={() => setOpenKategoria(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography variant="h6" component="span" sx={{ fontWeight: 800 }}>
            New Category
          </Typography>
          <IconButton onClick={() => setOpenKategoria(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <CreateKategoria
            onSuccess={() => {
              setOpenKategoria(false);
              refetchKats();
            }}
            onCancel={() => setOpenKategoria(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openTransaction}
        onClose={() => setOpenTransaction(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography variant="h6" component="span" sx={{ fontWeight: 800 }}>
            New Transaction
          </Typography>
          <IconButton onClick={() => setOpenTransaction(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <CreateTransaction
            kategoriaReference={
              selectedKategoriaRef || kategorias[0]?.reference || ""
            }
            onSuccess={() => {
              setOpenTransaction(false);
              refetchTrans();
            }}
            onCancel={() => setOpenTransaction(false)}
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
