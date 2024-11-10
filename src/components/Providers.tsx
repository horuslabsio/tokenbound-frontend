"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StarknetProvider from "./starknet-provider";
import { TokenboundProvider } from "context/TokenboundContext";
const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <StarknetProvider>
      <QueryClientProvider client={queryClient}>
        <TokenboundProvider>{children}</TokenboundProvider>
      </QueryClientProvider>
    </StarknetProvider>
  );
};

export default Providers;
