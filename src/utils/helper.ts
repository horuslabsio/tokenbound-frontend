import { Chain } from "@starknet-react/chains";
import { useBalance } from "@starknet-react/core";
import { useTokenBalanceProps } from "../types/index";
import axios from "axios";
import confetti from "canvas-confetti";

export const shortenAddress = (address: string) => {
  if (!address) return null;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const fallbackCopyToClipBoard = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    return successful;
  } catch (err) {
    return false;
  } finally {
    document.body.removeChild(textArea);
  }
};

export const copyToClipBoard = (text: string) => {
  if (!navigator.clipboard) return fallbackCopyToClipBoard(text);
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      return true;
    })
    .catch((err) => {
      if (process.env.NODE_ENV !== "production") {
        console.error(err);
      }
      return false;
    });
};

export const instance = axios.create({
  headers: {
    accept: "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_ARK_API_KEY,
  },
});

export function launchConfetti() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    return;
  }
  confetti({
    origin: { y: 0.7 },
    spread: 100,
    startVelocity: 55,
    particleCount: Math.floor(200 * 0.5),
  });
}

export const getVoyagerUrl = (chain: Chain, address: string): string => {
  const subdomain = chain.network === "sepolia" ? "sepolia." : "";
  return `https://${subdomain}voyager.online/contract/${address}?mtm_campaign=token-bound-iframe-redirect&mtm_source=horus-labs&mtm_medium=referral`;
};

export function formatAddressTo0x0(address?: string): `0x0${string}` {
  if (!address) return `0x0`;
  if (address.startsWith("0x") && !address.startsWith("0x0")) {
    return `0x0${address.slice(2)}`;
  }
  if (address.startsWith("0x0")) {
    return address as `0x0${string}`;
  }
  return `0x0${address}`;
}

export function formatAddressTo0x(address?: string): `0x${string}` {
  if (!address) return `0x0`;
  if (address.startsWith("0x0")) {
    return `0x${address.slice(3)}` as `0x${string}`;
  }
  return address as `0x${string}`;
}

export function useTokenBalance({
  tokenAddress,
  accountAddress,
}: useTokenBalanceProps) {
  const { data, refetch, error, ...rest } = useBalance({
    token: tokenAddress,
    address: accountAddress,
    watch: true,
    refetchInterval: 1000,
  });
  const { value, decimals, symbol, formatted } = data || {};
  return { value, decimals, symbol, formatted, refetch, error, ...rest };
}
