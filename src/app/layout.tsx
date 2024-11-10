import "./globals.css";
import type { Metadata } from "next";
import Favicon from "@public/favicon.ico";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import Providers from "@components/Providers";

export const metadata: Metadata = {
  title: "Token Bound | Starknet",
  description: "An implementation of ERC 6551 on Starknet",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={`font-inter font-normal`}>
          <Header />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
