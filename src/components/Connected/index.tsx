"use client";
import React, { useState } from "react";
import { shortenAddress } from "@utils/helper";
import { useAccount, useNetwork } from "@starknet-react/core";

import { Button } from "ui/button";
import Profile from "./Proile";
import { Tooltip } from "ui/tooltip";
import { Modal } from "ui/modal";
import { ProfileIcon, RightArrow } from "@public/icons";

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
          size={"sm"}
          startIcon={<ProfileIcon />}
          onClick={toggleModal}
          className="rounded-full"
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
