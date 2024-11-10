"use client";
import React, { useRef } from "react";
import { shortenAddress } from "@utils/helper";
import { useAccount, useNetwork } from "@starknet-react/core";
import { Button } from "ui/button";
import Profile from "./Profile";
import { Tooltip } from "ui/tooltip";
import { ProfileIcon, UpRightArrowIcon } from "@public/icons";

function ConnectedNavBar() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const profileRef = useRef<HTMLDialogElement | null>(null);
  const closeModal = () => {
    profileRef?.current?.close();
  };
  return (
    <div className="relative flex flex-col gap-4 md:flex-row md:items-center">
      {chain.network === "mainnet" ? (
        <Button
          onClick={() => profileRef?.current?.show()}
          size={"sm"}
          startIcon={<ProfileIcon />}
          endIcon={<UpRightArrowIcon gradient />}
          className="rounded-full"
        >
          {shortenAddress(address as any)}
        </Button>
      ) : (
        <Tooltip message="This network is currently not supported">
          <Button asChild>
            <p>Network Unavailable</p>
          </Button>
        </Tooltip>
      )}

      <dialog
        onClick={() => {
          closeModal();
        }}
        className="absolute top-[4rem] z-[100] h-screen bg-red-700 md:h-auto"
        ref={profileRef}
      >
        <Profile closeModal={closeModal} />
      </dialog>
    </div>
  );
}

export default ConnectedNavBar;
