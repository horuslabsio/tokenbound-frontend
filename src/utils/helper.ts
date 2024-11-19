import { Chain } from "@starknet-react/chains";
import axios from "axios";

export const shortenAddress = (address: string) => {
  if (!address) return null;
  return `${address.substr(0, 6)}...${address.substr(
    address.length - 4,
    address.length,
  )}`;
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
      console.error(err);
      return false;
    });
};

export const getVoyagerUrl = (chain: Chain, address: string): string => {
  const subdomain = chain.network === "sepolia" ? "sepolia." : "";
  return `https://${subdomain}voyager.online/contract/${address}?mtm_campaign=token-bound-iframe-redirect&mtm_source=horus-labs&mtm_medium=referral`;
};
