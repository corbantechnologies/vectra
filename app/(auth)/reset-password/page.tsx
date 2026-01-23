/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/lib/auth-schemas";
import { resetPassword } from "@/services/accounts";
import AuthLayout from "@/components/auth/AuthLayout";
import {
  TextField,
  Button,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    try {
      await resetPassword(data);
      toast.success("Password reset successfully! You can now log in.");
      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Invalid code or expired request.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter the code sent to your email and your new password."
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
          <TextField
            fullWidth
            label="Reset Code"
            variant="outlined"
            {...register("code")}
            error={!!errors.code}
            helperText={errors.code?.message}
          />
          <TextField
            fullWidth
            label="New Password"
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
          <TextField
            fullWidth
            label="Confirm New Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            {...register("password_confirmation")}
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation?.message}
          />
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
