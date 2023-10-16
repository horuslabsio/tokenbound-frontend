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