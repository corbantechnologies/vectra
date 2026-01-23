"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Kategoria } from "@/services/kategoria";
import CategoryIcon from "@mui/icons-material/Category";

interface CategoryGridProps {
  categories: Kategoria[];
  onAddClick: () => void;
  onCategoryClick: (category: Kategoria) => void;
  loading?: boolean;
}

export default function CategoryGrid({
  categories,
  onAddClick,
  onCategoryClick,
  loading,
}: CategoryGridProps) {
  if (loading) {
    return (
      <Box>
        <Skeleton width={150} height={32} sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((i) => (
            <Grid size={{ xs: 6 }} key={i}>
              <Skeleton
                variant="rectangular"
                height={100}
                sx={{ borderRadius: 4 }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 900, color: "#1a1a1a" }}>
          Categories
        </Typography>
        <IconButton
          onClick={onAddClick}
          sx={{
            bgcolor: "#f8fdf9",
            color: "#357252",
            border: "1px solid rgba(53, 114, 82, 0.1)",
            "&:hover": { bgcolor: "#eef7f1" },
          }}
          size="small"
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        {categories.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                bgcolor: "#f8fdf9",
                borderRadius: 4,
                border: "1px dashed rgba(53, 114, 82, 0.2)",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                No categories found.
              </Typography>
            </Box>
          </Grid>
        ) : (
          categories.map((cat) => (
            <Grid size={{ xs: 6 }} key={cat.reference}>
              <Paper
                elevation={0}
                onClick={() => onCategoryClick(cat)}
                sx={{
                  p: 2.5,
                  textAlign: "center",
                  cursor: "pointer",
                  bgcolor: "#fff",
                  borderRadius: 5,
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "#357252",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 20px rgba(53, 114, 82, 0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: "rgba(53, 114, 82, 0.05)",
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1.5,
                    color: "#357252",
                  }}
                >
                  <CategoryIcon fontSize="small" />
                </Box>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 800, color: "#1a1a1a" }}
                >
                  {cat.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  Active
                </Typography>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
