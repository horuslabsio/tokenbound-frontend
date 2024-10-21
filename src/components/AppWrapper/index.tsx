"use client";
import React from "react";

type IWrapper = {
  children: React.ReactNode;
};

function AppWrapper({ children }: IWrapper) {
  return (
    <>
      {/* <ToastContainer
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
      /> */}

      <main className="mx-auto mb-32 max-w-[1800px] px-4 sm:px-6 lg:px-[72px]">
        {children}
      </main>
    </>
  );
}

export default AppWrapper;
