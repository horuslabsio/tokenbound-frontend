"use client";
import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../Landing/Navbar";
import Footer from "../Landing/Footer";
import {
  StarknetConfig,
  InjectedConnector,
} from "@starknet-react/core";
import { Provider, constants } from "starknet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type IWrapper = {
  children: React.ReactNode;
};


function AppWrapper({ children }: IWrapper) {
  const connectors = [
    new InjectedConnector({ options: { id: "argentX" } }),
    new InjectedConnector({ options: { id: "braavos" } }),
  ];

  const provider = useMemo(() => {
    return new Provider({
      sequencer: {
        network: constants.NetworkName.SN_GOERLI2,
      },
    });
  }, []);

  return (
    <>
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <StarknetConfig
        connectors={connectors}
        autoConnect={true}
        defaultProvider={provider}
      >
        <NavBar />
        <main className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-24 mb-32">
          {children}
        </main>
        <Footer />
      </StarknetConfig>
    </>
  );
}

export default AppWrapper;
