import { ChangeEvent, useState } from "react";
import { CloseIcon, RightArrow } from "@public/icons";
import { Button } from "ui/button";
import { useTokenBoundSDK } from "@hooks/useTokenboundHookContext";

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
  const { tokenboundV2, tokenboundV3, activeVersion } = useTokenBoundSDK();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [transferStatus, setTransferStatus] = useState<
    "idle" | "error" | "pending" | "success"
  >("idle");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRecipientAddress(value);
  };

  const transferNFTAssets = async () => {
    const tokenbound =
      activeVersion?.version === "V2" ? tokenboundV2 : tokenboundV3;
    try {
      if (tokenbound) {
        setTransferStatus("pending");
        const status = await tokenbound.transferNFT({
          tbaAddress: tokenBoundAddress,
          contractAddress: contractAddress,
          tokenId: tokenId,
          sender: tokenBoundAddress,
          recipient: recipientAddress,
        });
        setTransferStatus("success");
        console.log("transferStat", status);
      }
    } catch (error) {
      setTransferStatus("error");
      setTimeout(() => {
        setTransferStatus("idle");
      }, 5000);
      if (process.env.NODE_ENV !== "production") {
        console.log("there was an error transferring the assets", error);
      }
    }
  };

  return (
    <div className="grid h-full w-full place-content-center text-foreground-primary">
      <div className="flex min-h-[10rem] w-[90vw] max-w-[27rem] flex-col justify-between rounded-[16px] bg-white p-4">
        <div className="flex w-full items-center justify-between">
          <h5 className="font-inter-variable">
            Send <span className="text-gradient uppercase">NFT</span>
          </h5>

          <button
            onClick={() => {
              closeModal();
              setRecipientAddress("");
              setTransferStatus("idle");
            }}
            className="grid h-10 w-10 place-content-center rounded-full bg-gray-100 text-lg text-black"
          >
            <CloseIcon />
          </button>
        </div>

        {transferStatus === "success" ? (
          <div className="flex-1 text-center">
            <p className="text-[4rem]">🎉</p>
            <p className="text-lg">Transaction successful!</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              transferNFTAssets();
            }}
            className="flex flex-1 flex-col justify-between pt-4"
          >
            <label htmlFor="recipientWalletAddress" className="sr-only">
              recipient Wallet Address
            </label>
            <input
              className="mb-2 h-[2.8rem] rounded-full bg-gray-100 p-4 text-sm outline-none placeholder:text-base placeholder:text-foreground-tertiary"
              type="text"
              id="walletAddress"
              name="recipientWalletAddress"
              placeholder="Enter Wallet Address"
              value={recipientAddress}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              variant={"gray"}
              endIcon={transferStatus === "error" ? null : <RightArrow />}
              isLoading={transferStatus === "pending"}
              className={`rounded-full transition-all duration-300 ${transferStatus === "error" ? "text-error" : "bg-black text-white disabled:bg-gray-100 disabled:text-black"}`}
              disabled={
                !recipientAddress ||
                transferStatus === "pending" ||
                transferStatus === "error"
              }
            >
              {transferStatus === "error" ? (
                <span>Failed to send</span>
              ) : (
                <span>Send</span>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TransferNftModal;
