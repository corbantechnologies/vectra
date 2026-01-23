"use client";

import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Skeleton,
  Paper,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Kategoria } from "@/services/kategoria";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
        <Stack spacing={1}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={60}
              sx={{ borderRadius: 3 }}
            />
          ))}
        </Stack>
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

      {categories.length === 0 ? (
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
      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 5,
            bgcolor: "#fff",
            border: "1px solid rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <List disablePadding>
            {categories.map((cat, index) => (
              <React.Fragment key={cat.reference}>
                <ListItem
                  onClick={() => onCategoryClick(cat)}
                  sx={{
                    py: 2,
                    px: 3,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "#f8fdf9",
                    },
                  }}
                  secondaryAction={
                    <ChevronRightIcon
                      sx={{ color: "text.disabled", fontSize: 20 }}
                    />
                  }
                >
                  <ListItemIcon sx={{ minWidth: 48 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "rgba(53, 114, 82, 0.05)",
                        borderRadius: 2.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#357252",
                      }}
                    >
                      <CategoryIcon fontSize="small" />
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 800, color: "#1a1a1a" }}
                      >
                        {cat.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 600 }}
                      >
                        {cat.semikategorias?.length || 0} Subcategories
                      </Typography>
                    }
                  />
                </ListItem>
                {index < categories.length - 1 && (
                  <Box sx={{ height: 1, bgcolor: "rgba(0,0,0,0.03)", mx: 2 }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
