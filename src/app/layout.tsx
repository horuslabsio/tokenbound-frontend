import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/footer/Footer";
import { Metadata } from "next";
import Providers from "@components/Providers";

const inter = Inter({ subsets: ["latin"] });

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
      <Providers>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
