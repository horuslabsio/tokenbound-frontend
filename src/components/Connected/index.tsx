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
    <div className="flex flex-col gap-4 md:items-center md:flex-row">
      <div
        onClick={closeModal}
        className="bg-gray-200 cursor-pointer xsm:w-[90%] w-[10rem]  p-4  border-solid border-[1px] border-[#C4C4C4] rounded-full lg:my-0 lg:mx-auto"
      >
        <p className="text-center">{shortenAddress(address as any)}</p>
      </div>

      <Modal closeModal={closeModal} openModal={show}>
        <Disconnect closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default ConnectedNavBar;
