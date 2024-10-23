"use client";
import React, { useState } from "react";
import { shortenAddress } from "@utils/helper";
import { useAccount } from "@starknet-react/core";
import { Modal } from "ui/Modal";
import Profile from "./Profile";

function ConnectedNavBar() {
  const { address } = useAccount();
  const [show, setShow] = useState<boolean>(false);
  const toggleModal = () => {
    setShow(!show);
  };
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div
        onClick={toggleModal}
        className="h-[3rem] w-[10rem] cursor-pointer rounded-full border-[1px] border-solid border-[#C4C4C4] bg-gray-200 px-4 py-3 xsm:w-[90%] lg:mx-auto lg:my-0"
      >
        <p className="text-center">{shortenAddress(address as any)}</p>
      </div>

      <Modal type="" closeModal={toggleModal} openModal={show}>
        <Profile closeModal={toggleModal} />
      </Modal>
    </div>
  );
}

export default ConnectedNavBar;
