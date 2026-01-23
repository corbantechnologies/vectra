"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ minHeight: "screen", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Hero />
        <Features />
        {/* Additional sections can be added here */}
      </Box>
      <Footer />
    </Box>
  );
}
