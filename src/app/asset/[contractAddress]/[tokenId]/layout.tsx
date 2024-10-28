"use client";
import { TokenboundProvider } from "context/TokenboundContext";
import { ReactNode } from "react";

export default function AssetRootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
      <TokenboundProvider>{children}</TokenboundProvider>
    </main>
  );
}
