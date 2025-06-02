import "./globals.css";
import type { Metadata } from "next";
import Favicon from "@public/favicon.ico";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import Providers from "@components/Providers";
import { Analytics } from "@components/Analytics";

export const metadata: Metadata = {
  title: "Token Bound Explorer | ERC-6551 on Starknet",
  description:
    "Explore NFTs as wallets on Starknet with our ERC-6551 implementation. Token Bound Explorer makes NFT-powered wallets a reality.",
  icons: [{ rel: "icon", url: Favicon.src }],
  openGraph: {
    title: "Token Bound Explorer | ERC-6551 on Starknet",
    description:
      "Unlock the potential of NFTs as wallets with our ERC-6551 implementation on Starknet. Visit Token Bound Explorer now!",
    url: "https://www.tbaexplorer.com/",
    siteName: "Token Bound Explorer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Token Bound Explorer | ERC-6551 on Starknet",
    description:
      "Unlock the potential of NFTs as wallets with our ERC-6551 implementation on Starknet. Visit Token Bound Explorer now!",
    creator: "@horuslabsio",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-inter font-normal`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
