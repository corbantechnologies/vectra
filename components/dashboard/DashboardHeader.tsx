"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";

import { useFetchAccount } from "@/hooks/accounts/actions";

export default function DashboardHeader() {
  const { data: user } = useFetchAccount();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", height: 72 }}>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              letterSpacing: 1,
              background: "linear-gradient(45deg, #357252 30%, #96ba94 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            }}
          >
            VECTRA
          </Typography>

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#f8fdf9",
                px: 2,
                py: 1,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "rgba(53, 114, 82, 0.1)",
                minWidth: 300,
              }}
            >
              <SearchIcon
                fontSize="small"
                sx={{ color: "#357252", mr: 1.5, opacity: 0.6 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Search for transactions, categories...
              </Typography>
            </Box>
          )}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={3}>
          <IconButton sx={{ bgcolor: "#f8fdf9", color: "#357252" }}>
            <NotificationsNoneIcon fontSize="small" />
          </IconButton>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 800, lineHeight: 1.2 }}
              >
                {user?.first_name} {user?.last_name}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                {user?.member_code || "Personal Account"}
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 44,
                height: 44,
                bgcolor: "#357252",
                boxShadow: "0 2px 8px rgba(53, 114, 82, 0.2)",
                fontSize: 18,
                fontWeight: 900,
                border: "2px solid #fff",
              }}
            >
              {user?.first_name?.[0]}
              {user?.last_name?.[0]}
            </Avatar>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
