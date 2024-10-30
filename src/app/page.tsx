"use client";
import React from "react";
import Hero from "@components/Landing/Hero";
import Community from "@components/Landing/Community";
import Features from "@components/Landing/Features";
import Projects from "@components/Landing/Projects";
import ShowCase from "@components/Landing/ShowCase";
import FAQs from "@components/Landing/FQAs";

export default function Home() {
  return (
    <main className="min-h-screen pb-16 pt-32 flex flex-col gap-8">
      <Hero />
      <Features />
      <ShowCase />
      <FAQs />
      <Projects />
      <Community />
    </main>
  );
}
