import "./globals.css";
import type { Metadata } from "next";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import Providers from "@components/Providers";
import { ReactLenis } from "@utils/lenis";

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
        <ReactLenis root>
          <body className={`font-inter font-normal`}>
            <Header />
            {children}
            <Footer />
          </body>
        </ReactLenis>
      </Providers>
    </html>
  );
}
