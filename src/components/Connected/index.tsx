"use client";
import React, { useRef, useState } from "react";
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
    <div className="flex flex-col gap-4 md:relative md:flex-row md:items-center">
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
        className="absolute left-0 top-0 z-[100] h-screen bg-transparent md:top-[4rem] md:h-auto"
        ref={profileRef}
      >
        <div className="flex h-full w-screen justify-center md:block md:w-fit">
          <Profile closeModal={closeModal} />
        </div>
      </dialog>
    </div>
  );
}

export default ConnectedNavBar;
