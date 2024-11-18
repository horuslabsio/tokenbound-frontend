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
