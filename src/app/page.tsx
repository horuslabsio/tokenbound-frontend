"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "@components/Landing/Hero";
import Community from "@components/Landing/Community";
import Features from "@components/Landing/Features";
import Projects from "@components/Landing/Projects";
import ShowCase from "@components/Landing/ShowCase";
import FAQs from "@components/Landing/FQAs";
import { useFetchUserNFT } from "@hooks/index";

export default function Home() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <main className="min-h-screen pb-16 pt-32">
        <Hero />
        <Features />
        <ShowCase />
        <FAQs />
        <Projects />
        <Community />
      </main>
    </>
  );
}
