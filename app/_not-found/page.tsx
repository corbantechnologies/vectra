"use client";

import Link from "next/link";
import { MoveLeft, Home, Search, AlertCircle } from "lucide-react";
import {
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Stack,
} from "@mui/material";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
        p: 3,
      }}
    >
      {/* Decorative Animated Blobs */}
      <Box
        sx={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: { xs: "60vw", md: "40vw" },
          height: { xs: "60vw", md: "40vw" },
          borderRadius: "50%",
          bgcolor: "primary.light",
          opacity: 0.15,
          filter: "blur(100px)",
          animation: "float 20s infinite ease-in-out",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: { xs: "70vw", md: "50vw" },
          height: { xs: "70vw", md: "50vw" },
          borderRadius: "50%",
          bgcolor: "secondary.main",
          opacity: 0.2,
          filter: "blur(120px)",
          animation: "float 25s infinite ease-in-out reverse",
          zIndex: 0,
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 5, md: 8 },
            borderRadius: 6,
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Large Ghost 404 Background Text */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "8rem", md: "12rem" },
              fontWeight: 900,
              color: "primary.main",
              opacity: 0.05,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: -1,
              lineHeight: 1,
              letterSpacing: -10,
              userSelect: "none",
            }}
          >
            404
          </Typography>

          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "20px",
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 4,
              boxShadow: "0 15px 30px rgba(53, 114, 82, 0.2)",
              color: "white",
              transform: "rotate(-5deg)",
            }}
          >
            <AlertCircle size={40} strokeWidth={2.5} />
          </Box>

          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: "text.primary",
              letterSpacing: -0.5,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
            }}
          >
            Oops! Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 6,
              maxWidth: "380px",
              mx: "auto",
              lineHeight: 1.6,
              fontSize: "1.1rem",
            }}
          >
            We couldn&apos;t find the page you&apos;re looking for. It might
            have been moved or deleted, or you may have mistyped the address.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2.5}
            justifyContent="center"
          >
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              startIcon={<Home size={20} />}
              sx={{
                borderRadius: "16px",
                px: 5,
                py: 2,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 10px 20px rgba(53, 114, 82, 0.2)",
                "&:hover": {
                  boxShadow: "0 15px 30px rgba(53, 114, 82, 0.3)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              Take Me Home
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => window.history.back()}
              startIcon={<MoveLeft size={20} />}
              sx={{
                borderRadius: "16px",
                px: 5,
                py: 2,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                borderWidth: "2px",
                "&:hover": {
                  borderWidth: "2px",
                  bgcolor: "rgba(53, 114, 82, 0.04)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              Go Back
            </Button>
          </Stack>
        </Paper>

        <Box sx={{ mt: 6, textAlign: "center", opacity: 0.6 }}>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              fontWeight: 500,
            }}
          >
            <Search size={16} /> Need help finding something?
            <Link
              href="/support"
              style={{
                color: "#357252",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Contact Support
            </Link>
          </Typography>
        </Box>
      </Container>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(2%, 5%);
          }
          66% {
            transform: translate(-3%, -2%);
          }
        }
      `}</style>
    </Box>
  );
}
