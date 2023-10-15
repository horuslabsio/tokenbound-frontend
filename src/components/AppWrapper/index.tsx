"use client";
import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../Landing/Navbar";
import Footer from "../Landing/Footer";

type IWrapper = {
  children: React.ReactNode;
};

function AppWrapper({ children }: IWrapper) {
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-24 mb-32">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default AppWrapper;
