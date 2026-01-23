"use client";

import "./globals.css";
import NextAuthProvider from "@/providers/NextAuthProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>
          Vectra App | Track your expenses, income, and budget on the go
        </title>
        <meta
          name="description"
          content="Track your expenses, income, and budget on the go with Vectra App"
        />
        <meta
          name="keywords"
          content="budgeting app, expense tracker, budget planner, finance management, budgeting, expense tracking, budget planning, finance management, budgeting app, expense tracker, budget planner, finance management"
        />
      </head>
      <body>
        <Toaster position="bottom-center" reverseOrder={false} />
        <NextAuthProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </NextAuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
