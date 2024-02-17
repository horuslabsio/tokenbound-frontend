export interface INavBarType {
  title: string;
  url: string;
}

export interface IWalletModal {
  isWalletOpen: boolean;
  closeWalletModal: () => void;
  openWalletModal: () => void;
}

export type WalletIconsProps = {
  id: string;
};

export type NftItem = {
  acquiredAt: { blockTimestamp: null; blockNumber: null };
  balance: string;
  collection: null;
  contract: {
    address: string;
    name: null;
    symbol: null;
    totalSupply: null;
    tokenType: "UNKNOWN";
  };
  description: string;
  image: {
    cachedUrl: string;
    thumbnailUrl: string;
    pngUrl: string;
    contentType: "image/png";
    size: number;
  };
  mint: {
    mintAddress: null;
    blockNumber: null;
    timestamp: null;
    transactionHash: null;
  };
  name: string;
  owners: null;
  raw: {
    tokenUri: string;
    metadata: {
      /* define metadata properties */
    };
    error: null;
  };
  timeLastUpdated: string;
  tokenId: string;
  tokenType: "ERC721";
  tokenUri: string;
};

export type raw = {
  name: string;
  description: string;
  image: string;
};

export type IAccountParam = {
  contractAddress: string;
  tokenId: string;
};

export interface TokenInfo {
  contract_address: string;
  metadata: {
    metadata_updated_at: number;
    normalized: {
      image_mime_type: string;
      image_key: string;
      image: string;
      image_data: string;
      external_url: string;
      name: string;
      description: string;
    };
    raw: string;
  };
  mint_info: {
    address: string;
    timestamp: number;
    transaction_hash: string;
  };
  owner: string;
  token_id: string;
  token_id_hex: string;
}
