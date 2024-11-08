import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { CheckIcon, CloseIcon, RightArrow, XIcon } from "@public/icons";

import { useTokenBoundSDK } from "@hooks/index";
import { Modal } from "ui/modal";
import { Spinner } from "ui/spinner";
import { Button } from "ui/button";

type Props = {
  closeModal: () => void;
  abbreviation: string;
  balance: string;
  tokenBoundAddress: string;
  contractAddress: string;
  decimal: number;
};

const TransferModal = ({
  closeModal,
  balance,
  tokenBoundAddress,
  abbreviation,
  contractAddress,
  decimal,
}: Props) => {
  const [transferDetails, setTransferDetails] = useState({
    recipientWalletAddress: "",
    amount: "",
  });
  const { tokenbound } = useTokenBoundSDK();

  const [tokenTransferredSuccessfully, setTokenTransferredSuccessfully] =
    useState<boolean | null>(null);
  const [disableSendBtn, setDisableSendBtn] = useState("enableButton");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTransferDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   // let newValue = value;
  //   // if (name === "amount") {
  //   //   const enteredAmount = parseFloat(value);
  //   //   if (value === "." && transferDetails.amount === "") {
  //   //     newValue = "0.";
  //   //   } else if (isNaN(enteredAmount)) {
  //   //     newValue = "";
  //   //   } else {
  //   //     const availableBalance = parseFloat(balance);
  //   //     if (enteredAmount > availableBalance) {
  //   //       newValue = balance.toString();
  //   //     }
  //   //   }
  //   // }

  //   setTransferDetails((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const transferERC20Assets = async () => {
    try {
      if (tokenbound) {
        setTokenTransferredSuccessfully(false);
        const status = await tokenbound.transferERC20({
          tbaAddress: tokenBoundAddress,
          contractAddress: contractAddress,
          recipient: transferDetails.recipientWalletAddress,
          amount: (+transferDetails.amount * decimal).toString(),
        });
        setTokenTransferredSuccessfully(status);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.log("there was an error transferring the assets:", error);
      }
    }
  };

  useEffect(() => {
    if (!transferDetails.amount || !transferDetails.recipientWalletAddress) {
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
      <div
        onClick={(e) => {
          setTransferDetails({
            amount: "",
            recipientWalletAddress: "",
          });
          setTokenTransferredSuccessfully(null);
        }}
        className="flex min-h-[18rem] w-[27rem] flex-col justify-between rounded-[16px] bg-white p-4"
      >
        <div className="flex w-full items-center justify-between">
          <h5 className="font-inter-variable">
            Send <span className="text-gradient uppercase">{abbreviation}</span>
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
            <p className="text-[6rem]">🎉</p>
            <p className="text-lg">Transaction successful!</p>
          </div>
        ) : (
          <form className="flex flex-1 flex-col justify-between pt-4">
            <label htmlFor="recipientWalletAddress" className="sr-only">
              recipient Wallet Address
            </label>
            <input
              className="mb-2 h-[2.8rem] rounded-full bg-gray-100 p-4 outline-none placeholder:text-base placeholder:text-foreground-tertiary"
              type="text"
              id="recipientWalletAddress"
              name="recipientWalletAddress"
              placeholder="Enter Address"
              value={transferDetails.recipientWalletAddress}
              onChange={handleInputChange}
            />
            <label htmlFor="amount" className="sr-only"></label>
            <div className="relative">
              <input
                type="text"
                className="h-[2.8rem] w-full rounded-full bg-gray-100 p-4 outline-none placeholder:text-base placeholder:text-foreground-tertiary"
                id="amount"
                name="amount"
                value={transferDetails.amount}
                onChange={handleInputChange}
                placeholder="Amount"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setTransferDetails((prevState) => ({
                    ...prevState,
                    amount: balance,
                  }));
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
              >
                Max
              </button>
            </div>
            <p className="ml-auto flex w-fit gap-1 text-foreground-tertiary">
              <span>Available:</span>
              <span className="text-foreground-secondary">{balance}</span>
              <span className="uppercase">{abbreviation}</span>
            </p>
            <Button
              variant={"gray"}
              disabled={disableSendBtn === "disableButton"}
              onClick={(e) => {
                e.preventDefault();
                transferERC20Assets();
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
    // <Modal type="erc20" closeModal={closeTransferModal} openModal={openModal}>
    //   <>
    //     {tokenTransferredSuccessfully ? (
    // <div className="flex flex-col items-center justify-center gap-8">
    //   <div className="flex w-full items-end justify-end">
    //     <button onClick={closeTransferModal}>
    //       <XIcon />
    //     </button>
    //   </div>
    //   <div className="flex h-[7rem] w-[7rem] items-center justify-center rounded-full bg-deep-blue text-white">
    //     <CheckIcon />
    //   </div>
    //   <h3 className="font-bold">Completed</h3>
    //   <p>Transaction successful🎉</p>
    //   <button
    //     className={`w-full rounded-[8px] bg-deep-blue p-[.8rem] text-white`}
    //     onClick={closeTransferModal}
    //   >
    //     Close
    //   </button>
    // </div>
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
    //               <div className="flex flex-wrap items-center gap-4">
    //                 <div className="h-[2.2rem] w-[2.2rem] rounded-full">
    //                   <Image
    //                     alt=""
    //                     src={src}
    //                     width={10}
    //                     height={10}
    //                     className="rounded-full"
    //                   />
    //                 </div>
    //                 <div>
    //                   <p className="uppercase">{abbreviation}</p>
    //                   <p className="text-[.875em] text-[#5a5a5a]">{name}</p>
    //                 </div>
    //               </div>
    //               <div className="flex items-center gap-1">
    //                 <div>
    //                   <p>{balance}</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <form className="flex flex-col gap-4">
    //             <div className="flex flex-col gap-2">
    //               <label htmlFor="walletAddress">Wallet Address</label>
    //               <input
    //                 required
    //                 type="text"
    //                 id="walletAddress"
    //                 name="recipientWalletAddress"
    //                 placeholder="Enter Wallet Address"
    //                 value={transferDetails.recipientWalletAddress}
    //                 onChange={handleInputChange}
    //                 className="rounded-[8px] border-[1px] border-solid border-[#7A7A7A] p-[.8rem]"
    //               />
    //             </div>
    //             <div className="flex flex-col gap-2">
    //               <label htmlFor="amount">Amount</label>
    //               <input
    //                 required
    //                 className="rounded-[8px] border-[1px] border-solid border-[#7A7A7A] p-[.8rem]"
    //                 type="text"
    //                 id="amount"
    //                 name="amount"
    // value={transferDetails.amount}
    // onChange={handleInputChange}
    //                 placeholder="Enter Amount"
    //               />
    //             </div>
    //             <button
    //               disabled={disableSendBtn === "disableButton"}
    // onClick={(e) => {
    //   e.preventDefault();
    //   transferERC20Assets();
    // }}
    //               className={`w-full rounded-[8px] bg-deep-blue p-[.8rem] text-white ${
    //                 disableSendBtn === "disableButton"
    //                   ? "!cursor-not-allowed opacity-50"
    //                   : "!cursor-pointer opacity-100"
    //               }`}
    //             >
    // {tokenTransferredSuccessfully === false ? (
    //   <span className="flex justify-center gap-2">
    //     <span>sending</span>
    //     <Spinner />
    //   </span>
    // ) : (
    //   <>send &rarr;</>
    // )}
    //             </button>
    //           </form>
    //         </div>
    //       </>
    //     )}
    //   </>
    // </Modal>
  );
};

export default TransferModal;
