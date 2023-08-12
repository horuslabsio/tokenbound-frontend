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
      <main className="max-w-[90%] md:max-w-[70%] lg:max-w-[70%] mx-auto py-4">
        <NavBar />
        {children}
      </main>
        <Footer />
    </>
  );
}

export default AppWrapper;
