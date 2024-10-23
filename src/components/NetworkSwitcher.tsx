"use client";

import { useAccount, useNetwork } from "@starknet-react/core";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useRouter, usePathname } from "next/navigation";
import { CheckIcon, SwitchIcon } from "@public/icons/icon";
import { useEffect, useState } from "react";
import { Button } from "ui/button";

const NETWORK_MAPPING: { [key: string]: string } = {
  mainnet: "SN_MAIN",
  sepolia: "SN_SEPOLIA",
};

const networks = [
  {
    value: "SN_MAIN",
    label: "Mainnet",
  },
  {
    value: "SN_SEPOLIA",
    label: "Sepolia",
  },
];

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { push } = useRouter();
  const path = usePathname();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedNetwork, setSelectedNetwork] = useState(
    NETWORK_MAPPING[chain.network]
  );
  const switchNetwork = async (newNetworkId: string, networkLabel: string) => {
    try {
      await window?.starknet?.request({
        type: "wallet_switchStarknetChain",
        params: { chainId: newNetworkId },
      });
      setSelectedNetwork(newNetworkId);
      if (path.startsWith("/asset")) {
        push(`/wallet/${address}`);
      }
    } catch (error) {
      console.error("Failed to switch networks:", error);
    }
  };

  // Update selectedNetwork when chain.network changes
  useEffect(() => {
    setSelectedNetwork(NETWORK_MAPPING[chain.network]);
  }, [chain.network]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-[3rem] w-[200px] justify-between"
        >
          {selectedNetwork
            ? networks.find((network) => network.value === selectedNetwork)
                ?.label
            : "Select Network..."}
          <span className="ml-2 h-4 w-4 shrink-0 opacity-50">
            <SwitchIcon />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 w-[200px] p-0">
        <Command className="">
          <CommandGroup className="min-h-[4.3rem]">
            {networks.map((network) => (
              <CommandItem
                key={network.value}
                value={network.value}
                onSelect={() => {
                  switchNetwork(network.value, network.label);
                  setOpen(false);
                }}
                className="cursor-pointer hover:bg-[#0C0C4F20]"
              >
                <span
                  className={`h-4 w-4 ${selectedNetwork === network.value ? "opacity-100" : "opacity-0"}`}
                >
                  <CheckIcon />
                </span>
                <span>{network.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default NetworkSwitcher;
