'use client'

import { useAccount } from "@starknet-react/core";
import React, { useState } from "react";
import { TokenboundClient, WalletClient } from 'starknet-tokenbound-sdk'; // Import BigNumberish
import { BigNumberish } from 'starknet'; // Import BigNumberish from starknet

function WalletInteractionForm() {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const walletClient: WalletClient = {
    address: "0x03553b785b4e9a6496118b6341c44700f209c60e50b8db7ef4ba8fb681a05cde",
    privateKey: process.env.PRIVATE_KEY || "",
  }

  const options = {
    walletClient: walletClient,
    registryAddress: "0x1b0ef7a47d9db8652f8a9010ecaf3e6537442bfab3afed13449b571fa1da37a",
    implementationAddress: "0x011bc9fabead984d714cf82ec46ffa23f4558f27ae73561542fed9fa8fb510ae",
    jsonRPC: `https://starknet-mainnet.public.blastapi.io`
  }
  const tokenbound = new TokenboundClient(options)

  const handleTransferNFT = async () => {
    try {
      setLoading(true);
      setError("");

      const transactionHash = await tokenbound.transferNFT({
        tbaAddress: walletClient.address || "",
        contractAddress: "0x042e7815d9e90b7ea53f4550f74dc12207ed6a0faaef57ba0dbf9a66f3762d82", // Update with NFT contract address
        tokenId: "68478765892699379673", // Convert token ID to BigNumberish format
        sender: walletClient.address,
        recipient: recipientAddress || "0x03553b785b4e9a6496118b6341c44700f209c60e50b8db7ef4ba8fb681a05cde"
      });

      console.log("NFT transfer successful. Transaction hash:", transactionHash);
    } catch (error) {
      setError("Error transferring NFT: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTransferERC20 = async () => {
    try {
      setLoading(true);
      setError("");

      const transactionHash = await tokenbound.transferERC20({
        // tbaAddress: walletClient.address,
        tbaAddress:"0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af",
        contractAddress: "0x3553b785b4e9a6496118b6341c44700f209c60e50b8db7ef4ba8fb681a05cde", // Update with ERC20 contract address
        recipient: recipientAddress || "0x004f2eec6954a594924816514e947b2ca492091852aeeedf7990e204029e330c",
        amount: amount // Use BigNumberish.fromString for string conversion
      });

      console.log("ERC20 transfer successful. Transaction hash:", transactionHash);
    } catch (error) {
      setError("Error transferring ERC20 tokens: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col px-9 pt-6 pb-12 rounded-2xl shadow-2xl bg-neutral-50 max-w-[425px]">
      {/* Your UI elements */}
      <div className="mt-6 text-sm font-medium text-indigo-950"> Wallet Address </div>
      <input
        className="justify-center px-4 py-3.5 mt-2 text-base whitespace-nowrap rounded-lg border border-solid bg-neutral-50 border-stone-300 text-neutral-500"
        placeholder="Enter Wallet Address"
        type="text"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <div className="mt-4 text-sm font-medium text-indigo-950">Amount</div>
      <input
        className="justify-center px-4 py-3.5 mt-2 text-base whitespace-nowrap rounded-lg border border-solid bg-neutral-50 border-stone-300 text-neutral-500"
        placeholder="Enter Amount"
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="flex justify-center items-center px-16 py-3.5 mt-6 w-full text-base text-center whitespace-nowrap rounded-lg bg-indigo-950 text-neutral-50"
        onClick={handleTransferNFT}
        disabled={loading}
        type="button"
      >
        <div className="flex gap-1">
          <span className="grow">Transfer NFT</span>
        </div>
      </button>
      <button
        className="flex justify-center items-center px-16 py-3.5 mt-4 w-full text-base text-center whitespace-nowrap rounded-lg bg-indigo-950 text-neutral-50"
        onClick={handleTransferERC20}
        disabled={loading}
        type="button"
      >
        <div className="flex gap-1">
          <span className="grow">Transfer ERC20</span>
        </div>
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </section>
  );
}

export default WalletInteractionForm;
