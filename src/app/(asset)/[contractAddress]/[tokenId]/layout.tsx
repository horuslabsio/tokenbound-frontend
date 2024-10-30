"use client";
import { ReactNode } from "react";

export default function AssetRootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main>{children}</main>;
}
