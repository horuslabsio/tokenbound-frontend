"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppWrapper from "@components/AppWrapper";
import Hero from "@components/Landing/Hero";
import Community from "@components/Landing/Community";
import Features from "@components/Landing/Features";
import Projects from "@components/Landing/Projects";
import ShowCase from "@components/Landing/ShowCase";
import FAQs from "@components/Landing/FQAs";

export default function Home() {
  return (
    // <AppWrapper>
    //   <h1 className="text-black">Use any NFT as a wallet</h1>

    //   <p className="text-gray-700 my-2 text-xl md:text-2xl lg:text-2xl w-full md:w-full lg:w-[65%]">
    //     ERC-6551 turns every NFT into a smart wallet that can own tokens and
    //     interact with dApps across the Ethereum ecosystem.
    //   </p>

    //   <section className="mt-6">
    //     <div>
    //       <h2>Frequently asked questions</h2>
    //       <p>
    //         Want to learn more?{" "}
    //         <span className="underline underline-offset-1 text-blue-600">
    //           {" "}
    //           <a
    //             href="https://t.me/+mXVPO0nwBPU3ODBk"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             Discuss all things ERC-6551 On Telegram
    //           </a>
    //         </span>
    //       </p>
    //     </div>

    //     <section>
    //       {FAQ.map((item, idx) => (
    //         <div key={idx} className="border-b last:border-b-0">
    //           <h3 className="my-6 text-xl font-bold">{item.title}</h3>
    //           <p className="my-6 text-gray-700 text-lg">{item.description}</p>
    //         </div>
    //       ))}
    //     </section>
    //   </section>
    // </AppWrapper>
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
