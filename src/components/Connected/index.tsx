"use client";
import React, { useState } from "react";
import { shortenAddress } from "@utils/helper";
import { useAccount } from "@starknet-react/core";
import Disconnect from "../Disconnect/page";
import { usePathname } from "next/navigation";
import Modal from "@components/utils/Modal";

function ConnectedNavBar() {
  const { address, account } = useAccount();
  const [show, setShow] = useState<boolean>(false);
  const path = usePathname();
  const closeModal = () => {
    setShow(!show);
  };
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div
        onClick={closeModal}
        className="h-[3rem] w-[10rem] cursor-pointer rounded-full border-[1px] border-solid border-[#C4C4C4] bg-gray-200 px-4 py-3 xsm:w-[90%] lg:mx-auto lg:my-0"
      >
        <p className="text-center">{shortenAddress(address as any)}</p>
      </div>

      <Modal type="" closeModal={closeModal} openModal={show}>
        <Disconnect closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default ConnectedNavBar;
