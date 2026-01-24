import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import About from "@/components/landing/About";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <About />
      </main>
      <Footer />
    </div>
  );
}
