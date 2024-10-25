"use client";
import React, { useState } from "react";
import { shortenAddress } from "@utils/helper";
import { useAccount, useNetwork } from "@starknet-react/core";
import { Modal } from "ui/Modal";
import Profile from "./Profile";
import { Tooltip } from "ui/tooltip";
import { Button } from "ui/button";

function ConnectedNavBar() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [show, setShow] = useState<boolean>(false);
  const toggleModal = () => {
    setShow(!show);
  };
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      {chain.network === "mainnet" ? (
        <Button
          variant={"ghost"}
          onClick={toggleModal}
          className="h-[3rem] w-[10rem] cursor-pointer rounded-full border-[1px] border-solid border-[#C4C4C4] bg-gray-200 p-1 xsm:w-[90%] lg:mx-auto lg:my-0"
        >
          {shortenAddress(address as any)}
        </Button>
      ) : (
        <Tooltip message="This network is currently unavailable">
          <p className="grid h-[3rem] min-w-[10rem] place-content-center rounded-full border-[1px] border-solid border-[#C4C4C4] bg-gray-200 p-1 text-sm">
            Network Unavailable
          </p>
        </Tooltip>
      )}

      <Modal type="" closeModal={toggleModal} openModal={show}>
        <Profile closeModal={toggleModal} />
      </Modal>
    </div>
  );
}

export default ConnectedNavBar;
