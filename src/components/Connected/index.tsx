"use client";
import React, { useRef, useState } from "react";
import { shortenAddress } from "@utils/helper";
import { useAccount, useNetwork } from "@starknet-react/core";
import { Button } from "ui/button";
import Profile from "./Proile";
import { Tooltip } from "ui/tooltip";
import { Modal } from "ui/modal";
import { ProfileIcon, UpRightArrowIcon } from "@public/icons";

function ConnectedNavBar() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const profileRef = useRef<HTMLDialogElement | null>(null);
  const [show, setShow] = useState<boolean>(false);
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
        className="absolute top-[4rem] z-[100]"
        ref={profileRef}
      >
        <Profile closeModal={closeModal} />
      </dialog>
    </div>
  );
}

export default ConnectedNavBar;
