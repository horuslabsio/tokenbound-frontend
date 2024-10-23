import { ChangeEvent, useEffect, useState } from "react";
import { useTokenBoundSDK } from "@hooks/useTokenboundHookContext";
import { CheckIcon, XIcon } from "@public/icons/icon";
import { Modal } from "ui/Modal";
import Spinner from "ui/Spinner";

type Props = {
  openModal: boolean;
  closeModal: () => void;
  tokenBoundAddress: string;
  contractAddress: string;
  tokenId: string;
};

const TransferNftModal = ({
  closeModal,
  openModal,
  tokenBoundAddress,
  contractAddress,
  tokenId,
}: Props) => {
  const { tokenboundV2, tokenboundV3, activeVersion } = useTokenBoundSDK();
  const [transferDetails, setTransferDetails] = useState({
    recipientWalletAddress: "",
  });

  const [tokenTransferredSuccessfully, setTokenTransferredSuccessfully] =
    useState<boolean | null>(null);
  const [disableSendBtn, setDisableSendBtn] = useState("enableButton");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "recipientWalletAddress") {
      if (value === "" && transferDetails.recipientWalletAddress === "") {
        newValue = "0x";
      }
    }

    setTransferDetails((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  const closeTransferModal = () => {
    closeModal();
  };
  const transferNFTAssets = async () => {
    const tokenbound =
      activeVersion.version === "V2" ? tokenboundV2 : tokenboundV3;
    try {
      if (tokenbound) {
        setTokenTransferredSuccessfully(false);
        const status = await tokenbound.transferNFT({
          tbaAddress: tokenBoundAddress,
          contractAddress: contractAddress,
          tokenId: tokenId,
          sender: tokenBoundAddress,
          recipient: transferDetails.recipientWalletAddress,
        });
        setTokenTransferredSuccessfully(status);
        console.log("transferStat", status);
      }
    } catch (error) {
      console.log(error);
      console.log("there was an error transferring the assets");
    }
  };

  useEffect(() => {
    if (!transferDetails.recipientWalletAddress) {
      setDisableSendBtn("disableButton");
    } else {
      setDisableSendBtn("enableButton");
    }
    if (tokenTransferredSuccessfully === false) {
      setDisableSendBtn("disableButton");
    }
  }, [tokenTransferredSuccessfully, transferDetails]);

  return (
    <Modal type="nft" closeModal={closeTransferModal} openModal={openModal}>
      <>
        {tokenTransferredSuccessfully ? (
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex w-full items-end justify-end">
              <button onClick={closeTransferModal}>
                <XIcon />
              </button>
            </div>
            <div className="flex h-[7rem] w-[7rem] items-center justify-center rounded-full bg-deep-blue text-white">
              <CheckIcon />
            </div>
            <h3 className="font-bold">Completed</h3>
            <p>Transaction successful🎉</p>
            <button
              className={`w-full rounded-[8px] bg-deep-blue p-[.8rem] text-white`}
              onClick={closeTransferModal}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <h3 className="text-[1.5em]">Send</h3>
              <button onClick={closeTransferModal}>
                <XIcon />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="mb-2 text-[1em]">Asset</h4>
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-4"></div>
                </div>
              </div>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="walletAddress">Recipient Address</label>
                  <input
                    required
                    type="text"
                    id="walletAddress"
                    name="recipientWalletAddress"
                    placeholder="Enter Wallet Address"
                    value={transferDetails.recipientWalletAddress}
                    onChange={handleInputChange}
                    className="rounded-[8px] border-[1px] border-solid border-[#7A7A7A] p-[.8rem]"
                  />
                </div>

                <button
                  disabled={disableSendBtn === "disableButton"}
                  onClick={(e) => {
                    e.preventDefault();
                    transferNFTAssets();
                  }}
                  className={`w-full rounded-[8px] bg-deep-blue p-[.8rem] text-white ${
                    disableSendBtn === "disableButton"
                      ? "!cursor-not-allowed opacity-50"
                      : "!cursor-pointer opacity-100"
                  }`}
                >
                  {tokenTransferredSuccessfully === false ? (
                    <span className="flex justify-center gap-2">
                      <span>sending</span>
                      <Spinner />
                    </span>
                  ) : (
                    <>send &rarr;</>
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </>
    </Modal>
  );
};

export default TransferNftModal;
