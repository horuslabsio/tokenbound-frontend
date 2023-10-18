"use client";
import { useAccount, useDisconnect } from "@starknet-react/core";
import React from "react";
import { toast } from "react-toastify";
import { copyToClipBoard,shortenAddress } from "../../../utils/helper";
function Disconnect() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const copy = () => {
    let status = copyToClipBoard(address as string);
    if (status) {
      return toast.info(`copied - ${address}`);
    } else {
      return toast.error("failed to copy");
    }
  };
  return (
    <section>
      <h2 className="text-lg font-medium leading-6 text-gray-300 my-2">
        Connected with{" "}
        <span className="address">{shortenAddress(address as string)}</span>{" "}
      </h2>

      <div className="flex space-x-12 mt-4">
        <button
          type="button"
          onClick={() => disconnect()}
          className="text-gray-300 outline outline-2 rounded-lg p-2 outline-blue-500 outline-offset-2 "
        >
          Disconnect
        </button>
        <button
          onClick={copy}
          className="text-gray-300 outline outline-2 rounded-lg p-2 outline-blue-500 outline-offset-2 "
        >
          Copy Address
        </button>
      </div>
    </section>
  );
}

export default Disconnect;