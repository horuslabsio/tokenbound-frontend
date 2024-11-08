import { ChangeEvent, useEffect, useState } from "react";
import { CloseIcon, RightArrow } from "@public/icons";
import { Spinner } from "ui/spinner";
import { useTokenBoundSDK } from "@hooks/index";
import { Button } from "ui/button";

type Props = {
  closeModal: () => void;
  tokenBoundAddress: string;
  contractAddress: string;
  tokenId: string;
};

const TransferNftModal = ({
  closeModal,
  tokenBoundAddress,
  contractAddress,
  tokenId,
}: Props) => {
  const { tokenbound } = useTokenBoundSDK();
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

  const transferNFTAssets = async () => {
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
      if (process.env.NODE_ENV !== "production") {
        console.log("there was an error transferring the assets", error);
      }
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
    <div className="grid h-full w-full place-content-center text-foreground-primary">
      <div className="flex min-h-[10rem] w-[27rem] flex-col justify-between rounded-[16px] bg-white p-4">
        <div className="flex w-full items-center justify-between">
          <h5 className="font-inter-variable">
            Send <span className="text-gradient uppercase">NFT</span>
          </h5>

          <button
            onClick={closeModal}
            className="grid h-10 w-10 place-content-center rounded-full bg-gray-100 text-lg text-black"
          >
            <CloseIcon />
          </button>
        </div>

        {tokenTransferredSuccessfully ? (
          <div className="flex-1 text-center">
            <p className="text-[4rem]">🎉</p>
            <p className="text-lg">Transaction successful!</p>
          </div>
        ) : (
          <form className="flex flex-1 flex-col justify-between pt-4">
            <label htmlFor="recipientWalletAddress" className="sr-only">
              recipient Wallet Address
            </label>
            <input
              className="mb-2 h-[2.8rem] rounded-full bg-gray-100 p-4 text-sm outline-none placeholder:text-base placeholder:text-foreground-tertiary"
              type="text"
              id="walletAddress"
              name="recipientWalletAddress"
              placeholder="Enter Wallet Address"
              value={transferDetails.recipientWalletAddress}
              onChange={handleInputChange}
            />

            <Button
              className={`rounded-full transition-all duration-300 ${disableSendBtn === "disableButton" ? "bg-gray-100 text-black" : "bg-black text-white"} `}
              disabled={disableSendBtn === "disableButton"}
              onClick={(e) => {
                e.preventDefault();
                transferNFTAssets();
              }}
            >
              {tokenTransferredSuccessfully === false ? (
                <span className="flex items-center justify-center gap-2">
                  <span>sending</span>
                  <Spinner size="18px" />
                </span>
              ) : (
                <>
                  <span>Send</span>
                  <span>
                    <RightArrow />
                  </span>
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
    // <Modal type="nft" closeModal={closeTransferModal} openModal={openModal}>
    //   <>
    //     {tokenTransferredSuccessfully ? (
    //       <div className="flex flex-col items-center justify-center gap-8">
    //         <div className="flex w-full items-end justify-end">
    //           <button onClick={closeTransferModal}>
    //             <XIcon />
    //           </button>
    //         </div>
    //         <div className="flex h-[7rem] w-[7rem] items-center justify-center rounded-full bg-deep-blue text-white">
    //           <CheckIcon />
    //         </div>
    //         <h3 className="font-bold">Completed</h3>
    //         <p>Transaction successful🎉</p>
    //         <button
    //           className={`w-full rounded-[8px] bg-deep-blue p-[.8rem] text-white`}
    //           onClick={closeTransferModal}
    //         >
    //           Close
    //         </button>
    //       </div>
    //     ) : (
    //       <>
    //         <div className="flex justify-between">
    //           <h3 className="text-[1.5em]">Send</h3>
    //           <button onClick={closeTransferModal}>
    //             <XIcon />
    //           </button>
    //         </div>
    //         <div className="flex flex-col gap-4">
    //           <div>
    //             <h4 className="mb-2 text-[1em]">Asset</h4>
    //             <div className="flex flex-wrap justify-between gap-2">
    //               <div className="flex flex-wrap items-center gap-4"></div>
    //             </div>
    //           </div>
    //           <form className="flex flex-col gap-4">
    //             <div className="flex flex-col gap-2">
    //               <label htmlFor="walletAddress">Recipient Address</label>
    //               <input
    //                 required
    //                 type="text"
    // id="walletAddress"
    // name="recipientWalletAddress"
    // placeholder="Enter Wallet Address"
    // value={transferDetails.recipientWalletAddress}
    // onChange={handleInputChange}
    //                 className="rounded-[8px] border-[1px] border-solid border-[#7A7A7A] p-[.8rem]"
    //               />
    //             </div>

    //             <button
    //               disabled={disableSendBtn === "disableButton"}
    //               onClick={(e) => {
    //                 e.preventDefault();
    //                 transferNFTAssets();
    //               }}
    //               className={`w-full rounded-[8px] bg-deep-blue p-[.8rem] text-white ${
    //                 disableSendBtn === "disableButton"
    //                   ? "!cursor-not-allowed opacity-50"
    //                   : "!cursor-pointer opacity-100"
    //               }`}
    //             >
    //               {tokenTransferredSuccessfully === false ? (
    //                 <span className="flex justify-center gap-2">
    //                   <span>sending</span>
    //                   <Spinner />
    //                 </span>
    //               ) : (
    //                 <>send &rarr;</>
    //               )}
    //             </button>
    //           </form>
    //         </div>
    //       </>
    //     )}
    //   </>
    // </Modal>
  );
};

export default TransferNftModal;
