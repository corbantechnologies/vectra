"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/auth-schemas";
import AuthLayout from "@/components/auth/AuthLayout";
import {
  TextField,
  Button,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back!");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Please enter your details to sign in explore your finances."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Box>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Link
                href="/forgot-password"
                style={{
                  fontSize: "0.875rem",
                  color: "inherit",
                  opacity: 0.7,
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Link>
            </Box>
          </Box>

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              style={{
                color: "inherit",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Get Started
            </Link>
          </Typography>
        </Stack>
      </form>
    </AuthLayout>
  );
}

// Minimal Box import wrapper if needed within the file, but better to import from MUI
import { Box } from "@mui/material";
