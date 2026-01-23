"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Skeleton,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface SummaryCardsProps {
  income: number;
  expenses: number;
  loading?: boolean;
}

export default function SummaryCards({
  income,
  expenses,
  loading,
}: SummaryCardsProps) {
  const balance = income - expenses;

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((i) => (
          <Grid size={{ xs: 12, md: 4 }} key={i}>
            <Skeleton
              variant="rectangular"
              height={140}
              sx={{ borderRadius: 4 }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card
          elevation={0}
          sx={{
            height: "100%",
            bgcolor: "#357252",
            color: "#fff",
            borderRadius: 6,
            position: "relative",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              top: -20,
              right: -20,
              width: 120,
              height: 120,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "50%",
            },
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="overline"
              sx={{ fontWeight: 800, opacity: 0.8, letterSpacing: 1.5 }}
            >
              Net Balance
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, mt: 1, mb: 0.5 }}>
              {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card
          elevation={0}
          sx={{
            height: "100%",
            borderRadius: 6,
            bgcolor: "#fff",
            border: "1px solid",
            borderColor: "rgba(53, 114, 82, 0.1)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  p: 1,
                  bgcolor: "rgba(53, 114, 82, 0.05)",
                  borderRadius: 2,
                  color: "#357252",
                }}
              >
                <ArrowUpwardIcon fontSize="small" />
              </Box>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 800,
                  color: "text.secondary",
                  letterSpacing: 1.5,
                }}
              >
                Total Income
              </Typography>
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#357252" }}>
              {income.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card
          elevation={0}
          sx={{
            height: "100%",
            borderRadius: 6,
            bgcolor: "#fff",
            border: "1px solid",
            borderColor: "rgba(211, 47, 47, 0.1)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  p: 1,
                  bgcolor: "rgba(211, 47, 47, 0.05)",
                  borderRadius: 2,
                  color: "#d32f2f",
                }}
              >
                <ArrowDownwardIcon fontSize="small" />
              </Box>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 800,
                  color: "text.secondary",
                  letterSpacing: 1.5,
                }}
              >
                Total Expenses
              </Typography>
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#d32f2f" }}>
              {expenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
