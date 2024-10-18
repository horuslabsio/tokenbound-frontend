import type { Metadata } from "next";
import Favicon from "@public/favicon.ico";

export const metadata: Metadata = {
  title: "Token Bound | Starknet",
  description: "An implementation of ERC 6551 on Starknet",
  icons: [{ rel: "icon", url: Favicon.src }],
};
