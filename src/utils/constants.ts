import { TokenDetailsProps } from "../types/index";

export const TBAcontractAddress: string =
  "0x7f63abcad960f980c12d650b2cc4c27a8f63ee1f6eb36ea8286a946a2330c1b";
export const TBAImplementationAccount: string =
  "0x45d67b8590561c9b54e14dd309c9f38c4e2c554dd59414021f9d079811621bd";

export const ETHER_TOKEN_DETAILS: TokenDetailsProps = {
  address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  decimal: 1e18,
};
export const USDC_TOKEN_DETAILS: TokenDetailsProps = {
  address: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
  decimal: 1e6,
};
export const DAI_TOKEN_DETAILS: TokenDetailsProps = {
  address: "0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3",
  decimal: 1e18,
};
export const USDT_TOKEN_DETAILS: TokenDetailsProps = {
  address: "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
  decimal: 1e6,
};
export const STARK_TOKEN_DETAILS: TokenDetailsProps = {
  address: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
  decimal: 1e18,
};

export const TBAcontractAddress_SEPOLIA: string =
  "0x4101d3fa033024654083dd982273a300cb019b8cb96dd829267a4daf59f7b7e";

export const TBAImplementationAccount_SEPOLIA: string =
  "0x45d67b8590561c9b54e14dd309c9f38c4e2c554dd59414021f9d079811621bd";

export type ChainId = "mainnet" | "sepolia";

export const AccountClassHashes = {
  V2: {
    mainnet:
      "0x45d67b8590561c9b54e14dd309c9f38c4e2c554dd59414021f9d079811621bd",
    sepolia:
      "0x45d67b8590561c9b54e14dd309c9f38c4e2c554dd59414021f9d079811621bd",
  },
  V3: {
    mainnet: "0xbe8863311f24317dff8af16deb1285ec5b035e57cf9beda545c341c339b925",
    sepolia:
      "0x29d2a1b11dd97289e18042502f11356133a2201dd19e716813fb01fbee9e9a4",
  },
};

export const HOTJAR_ID:number = 5222294