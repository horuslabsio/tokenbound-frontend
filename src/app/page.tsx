"use client";
import dynamic from "next/dynamic";
import Community from "@components/Landing/Community";
import FAQs from "@components/Landing/FQAs";
import USPs from "@components/Landing/USPs";
import ShowCase from "../components/Landing/ShowCase";
import Hero from "@components/Landing/hero/Hero";
const Features = dynamic(
  () => import("../components/Landing/features/Features"),
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pb-16 pt-32">
      <Hero />
      <USPs />
      <Features />
      <ShowCase />
      <FAQs />
      <Community />
    </main>
  );
}
