"use client";

import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";
import { Transaction } from "@/services/transactions";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
}

export default function TransactionList({
  transactions,
  loading,
}: TransactionListProps) {
  if (loading) {
    return (
      <Box>
        <Skeleton width={200} height={32} sx={{ mb: 2 }} />
        <Stack spacing={2}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={80}
              sx={{ borderRadius: 4 }}
            />
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 900, mb: 3, color: "#1a1a1a" }}
      >
        Recent Transactions
      </Typography>

      {transactions.length === 0 ? (
        <Box
          sx={{
            py: 10,
            textAlign: "center",
            bgcolor: "#fff",
            borderRadius: 6,
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            No activity found.
          </Typography>
        </Box>
      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <List sx={{ p: 0 }}>
            {transactions.map((transaction, index) => {
              const isExpense = transaction.transaction_type === "EXP";
              const date = new Date(transaction.date).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                },
              );

              return (
                <React.Fragment key={transaction.reference}>
                  <ListItem
                    sx={{
                      py: 3,
                      px: 4,
                      "&:hover": { bgcolor: "#f8fdf9" },
                    }}
                  >
                    <ListItemAvatar sx={{ mr: 2 }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: isExpense
                            ? "rgba(211, 47, 47, 0.05)"
                            : "rgba(53, 114, 82, 0.05)",
                          color: isExpense ? "#d32f2f" : "#357252",
                        }}
                      >
                        {isExpense ? (
                          <ArrowDownwardIcon fontSize="small" />
                        ) : (
                          <ArrowUpwardIcon fontSize="small" />
                        )}
                      </Avatar>
                    </ListItemAvatar>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 800, color: "#1a1a1a" }}
                      >
                        {transaction.kategoria_name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 600 }}
                      >
                        {transaction.semikategoria_name || "General"} • {date}
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: "right" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 900,
                          color: isExpense ? "#d32f2f" : "#357252",
                        }}
                      >
                        {isExpense ? "-" : "+"}
                        {parseFloat(transaction.amount).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2 },
                        )}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 700, textTransform: "uppercase" }}
                      >
                        {transaction.transaction_method}
                      </Typography>
                    </Box>
                  </ListItem>
                  {index < transactions.length - 1 && (
                    <Divider sx={{ opacity: 0.5 }} />
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
      )}
    </Box>
  );
}
