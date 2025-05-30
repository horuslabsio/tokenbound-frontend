import { Connector } from "@starknet-react/core";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const supportSwitchNetwork = (connector?: Connector) => {
  return connector && connector.id === "argentX";
};
