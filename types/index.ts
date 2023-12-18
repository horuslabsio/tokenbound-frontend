export interface INavBarType {
    value: string,
    link: string
}

export interface IWalletModal {
    isWalletOpen: boolean,
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
      tokenType: 'UNKNOWN';
    };
    description: string;
    image: {
      cachedUrl: string;
      thumbnailUrl: string;
      pngUrl: string;
      contentType: 'image/png';
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
      metadata: { /* define metadata properties */ };
      error: null;
    };
    timeLastUpdated: string;
    tokenId: string;
    tokenType: 'ERC721';
    tokenUri: string;
  }
  
  export type raw = {
    tokenUri: string;
    metadata: { image: string };
    error: null;
  }