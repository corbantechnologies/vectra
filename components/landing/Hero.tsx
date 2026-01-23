"use client";

import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

export default function Hero() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        pt: { xs: 8, md: 15 },
        pb: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Abstract background element */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(53,114,82,0.05) 0%, rgba(255,255,255,0) 70%)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Box
            sx={{
              display: "inline-block",
              px: 2,
              py: 0.5,
              borderRadius: "9999px",
              backgroundColor: "rgba(53, 114, 82, 0.08)",
              color: "#357252",
              fontWeight: 600,
              fontSize: "0.875rem",
              mb: 2,
            }}
          >
            New: Track shared expenses easily →
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "800px",
              letterSpacing: "-0.02em",
            }}
          >
            Take Control of Your{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(45deg, #357252 30%, #96ba94 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Financial Future
            </Box>
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: "600px",
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              lineHeight: 1.6,
            }}
          >
            Vectra helps you track expenses, manage budgets, and get deep
            insights into your spending habits. Simple, powerful, and secure.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" }, pt: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/signup"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                boxShadow: "0 10px 20px rgba(53, 114, 82, 0.2)",
              }}
            >
              Get Started for Free
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="#how-it-works"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
              }}
            >
              How it Works
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
