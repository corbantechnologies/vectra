"use client";

import React from "react";
import { Box, Container, Paper, Typography, BoxProps } from "@mui/material";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eef7f1",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            component={Link}
            href="/"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.5px",
              background: "linear-gradient(45deg, #357252 30%, #96ba94 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
            }}
          >
            VECTRA
          </Typography>
        </Box>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "rgba(53, 114, 82, 0.1)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
          }}
        >
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {children}
        </Paper>
      </Container>
    </Box>
  );
}
