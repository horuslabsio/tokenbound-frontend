"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import StarknetProvider from "@components/starknet-provider";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/footer/Footer";
import { metadata } from "./metadata";
import { TokenboundProvider } from "@hooks/useTokenboundHookContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StarknetProvider>
        <TokenboundProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
            <Footer />
          </body>
        </TokenboundProvider>
      </StarknetProvider>
    </html>
  );
}
