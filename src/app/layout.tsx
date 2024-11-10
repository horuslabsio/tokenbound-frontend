import "./globals.css";
import type { Metadata } from "next";
import StarknetProvider from "@components/starknet-provider";
import Favicon from "@public/favicon.ico";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";

export const metadata: Metadata = {
  title: "Token Bound | Starknet",
  description: "An implementation of ERC 6551 on Starknet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StarknetProvider>
        <body className={`font-inter font-normal`}>
          <Header />
          {children}
          <Footer />
        </body>
</StarknetProvider>
    </html>
  );
}
