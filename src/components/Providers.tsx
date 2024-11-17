"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactLenis } from "@utils/lenis";
import StarknetProvider from "./StarknetProvider";
const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <ReactLenis root>
      <StarknetProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </StarknetProvider>
    </ReactLenis>
  );
};

export default Providers;
