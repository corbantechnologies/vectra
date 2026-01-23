"use client";

import { Box, CssBaseline } from "@mui/material";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#f8fdf9",
      }}
    >
      <CssBaseline />

      {/* Top Header */}
      <DashboardHeader />

      {/* Main Content Container */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, sm: 3, md: 4 },
          maxWidth: "1600px",
          width: "100%",
          mx: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
