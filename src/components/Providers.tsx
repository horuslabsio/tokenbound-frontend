"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StarknetProvider from "./starknet-provider";
const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <StarknetProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </StarknetProvider>
  );
};

export default Providers;
