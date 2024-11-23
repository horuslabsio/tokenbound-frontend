import { TokenboundContext } from "context/TokenboundContext";
import { useContext } from "react";

export const useTokenBoundSDK = () => {
  const context = useContext(TokenboundContext);
  if (!context) {
    throw new Error(
      "useTokenBoundSDK must be used within a TokenboundProvider",
    );
  }
  return context;
};
