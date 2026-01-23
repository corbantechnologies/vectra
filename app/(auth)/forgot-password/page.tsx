/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/lib/auth-schemas";
import { forgotPassword } from "@/services/accounts";
import AuthLayout from "@/components/auth/AuthLayout";
import { TextField, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true);
    try {
      await forgotPassword(data);
      setEmailSent(true);
      toast.success("Reset instructions sent to your email!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent password reset instructions to your inbox."
      >
        <Stack spacing={3} alignItems="center">
          <Typography variant="body1" align="center">
            If an account exists with that email, you will receive a code to
            reset your password.
          </Typography>
          <Button
            fullWidth
            component={Link}
            href="/reset-password"
            variant="contained"
            sx={{ py: 1.5 }}
          >
            Enter Reset Code
          </Button>
          <Button
            fullWidth
            onClick={() => setEmailSent(false)}
            variant="text"
            sx={{ fontWeight: 600 }}
          >
            Try another email
          </Button>
        </Stack>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a code to reset your password."
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
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? "Sending Code..." : "Send Reset Code"}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Remember your password?{" "}
            <Link
              href="/login"
              style={{
                color: "inherit",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Back to Login
            </Link>
          </Typography>
        </Stack>
      </form>
    </AuthLayout>
  );
}
