"use client";

import * as React from "react";

import { useNetwork } from "@starknet-react/core";

import {
  Command,
  CommandGroup,
  CommandItem,
} from "../components/utils/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/utils/popover";
import { cn } from "../lib/utils";
import { TBAVersion } from "starknet-tokenbound-sdk";
import { useTokenBoundSDK } from "@hooks/useTokenboundHookContext";
import Button from "ui/button";
import { CheckIcon, SwitchIcon } from "@public/icons/icon";

const VERSION_MAPPING: { [key: string]: string } = {
  V2: "V2",
  V3: "V3",
};

const versions = [
  {
    value: "V2",
    label: "V2",
  },
  {
    value: "V3",
    label: "V3",
  },
];

export function VersionSwitcher() {
  const { chain } = useNetwork();
  const [open, setOpen] = React.useState<boolean>(false);

  const { handleVersionSwitch, activeVersion } = useTokenBoundSDK();

  const [selectedVersion, setSelectedVersion] = React.useState(
    VERSION_MAPPING[activeVersion],
  );

  const switchVersion = async (value: string) => {
    setSelectedVersion(value);
    handleVersionSwitch(value);
  };

  React.useEffect(() => {
    setSelectedVersion(VERSION_MAPPING[TBAVersion.V3]);
  }, [chain.network]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-[3rem] w-[90px] justify-between"
        >
          {selectedVersion
            ? versions.find((version) => version.value === selectedVersion)
                ?.label
            : "Select Version..."}
          <span className="ml-2 h-4 w-4 shrink-0 opacity-50">
            <SwitchIcon />
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[90px] p-0">
        <Command>
          <CommandGroup>
            {versions.map((version) => (
              <CommandItem
                key={version.value}
                value={version.value}
                onSelect={() => {
                  switchVersion(version.value);
                  setOpen(false);
                }}
              >
                <span
                  className={`mr-2 h-4 w-4 ${selectedVersion === version.value ? "opacity-100" : "opacity-0"}`}
                >
                  <CheckIcon />
                </span>

                {version.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default VersionSwitcher;