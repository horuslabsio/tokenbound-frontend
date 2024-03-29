import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import CancelIcon from "svg/CancelIcon";
import { useTokenBoundSDK } from "@hooks/index";
import SyncLoader from "react-spinners/SyncLoader";
import CheckedIcon from "svg/CheckedIcon";
import Modal from "@components/utils/Modal";

type Props = {
  openModal: boolean;
  closeModal: () => void;
  abbreviation: string;
  name: string;
  balance: string;
  src: string;
  tokenBoundAddress: string;
  contractAddress: string;
  decimal: number;
};

const TransferModal = ({
  closeModal,
  openModal,
  balance,
  name,
  tokenBoundAddress,
  abbreviation,
  src,
  contractAddress,
  decimal,
}: Props) => {
  const [transferDetails, setTransferDetails] = useState({
    recipientWalletAddress: "",
    amount: "",
  });
  const [tokenTransferredSuccessfully, setTokenTransferredSuccessfully] =
    useState<boolean | null>(null);
  const [disableSendBtn, setDisableSendBtn] = useState("enableButton");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "amount") {
      const enteredAmount = parseFloat(value);
      if (value === "." && transferDetails.amount === "") {
        newValue = "0.";
      } else if (isNaN(enteredAmount)) {
        newValue = "";
      } else {
        const availableBalance = parseFloat(balance);
        if (enteredAmount > availableBalance) {
          newValue = balance.toString();
        }
      }
    }

    setTransferDetails((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  const closeTransferModal = () => {
    closeModal();
    setTransferDetails({
      amount: "",
      recipientWalletAddress: "",
    });
    setTokenTransferredSuccessfully(null);
  };
  const { tokenbound } = useTokenBoundSDK();
  const transferERC20Assets = async () => {
    try {
      setTokenTransferredSuccessfully(false);
      const status = await tokenbound.transferERC20({
        tbaAddress: tokenBoundAddress,
        contractAddress: contractAddress,
        recipient: transferDetails.recipientWalletAddress,
        amount: +transferDetails.amount * decimal,
      });
      setTokenTransferredSuccessfully(status);
      console.log("transferStat", status);
    } catch (error) {
      console.log("there was an error transferring the assets");
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
    <Modal closeModal={closeTransferModal} openModal={openModal}>
      <>
        {tokenTransferredSuccessfully ? (
          <div className="flex flex-col justify-center items-center gap-8">
            <div className="w-full flex justify-end items-end">
              <button onClick={closeTransferModal}>
                <CancelIcon />
              </button>
            </div>
            <div className="w-[7rem] h-[7rem] bg-deep-blue text-white flex justify-center items-center rounded-full">
              <CheckedIcon />
            </div>
            <h3 className="font-bold">Completed</h3>
            <p>Transaction successful🎉</p>
            <button
              className={`w-full p-[.8rem] bg-deep-blue rounded-[8px] text-white `}
              onClick={closeTransferModal}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between ">
              <h3 className="text-[1.5em]">Send</h3>
              <button onClick={closeTransferModal}>
                <CancelIcon />
              </button>
            </div>
            <div className=" flex flex-col gap-4">
              <div>
                <h4 className="text-[1em] mb-2">Asset</h4>
                <div className="flex justify-between flex-wrap gap-2">
                  <div className="flex items-center flex-wrap gap-4">
                    <div className="h-[2.2rem] w-[2.2rem] rounded-full">
                      <Image
                        alt=""
                        src={src}
                        width={10}
                        height={10}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="uppercase">{abbreviation}</p>
                      <p className="text-[.875em] text-[#5a5a5a]">{name}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div>
                      <p>{balance}</p>
                    </div>
                  </div>
                </div>
              </div>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="walletAddress">Wallet Address</label>
                  <input
                    required
                    type="text"
                    id="walletAddress"
                    name="recipientWalletAddress"
                    placeholder="Enter Wallet Address"
                    value={transferDetails.recipientWalletAddress}
                    onChange={handleInputChange}
                    className=" p-[.8rem] border-solid border-[1px] rounded-[8px] border-[#7A7A7A]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="amount">Amount</label>
                  <input
                    required
                    className=" p-[.8rem] border-solid border-[1px] rounded-[8px] border-[#7A7A7A]"
                    type="text"
                    id="amount"
                    name="amount"
                    value={transferDetails.amount}
                    onChange={handleInputChange}
                    placeholder="Enter Amount"
                  />
                </div>
                <button
                  disabled={disableSendBtn === "disableButton"}
                  onClick={(e) => {
                    e.preventDefault();
                    transferERC20Assets();
                  }}
                  className={`w-full p-[.8rem] bg-deep-blue rounded-[8px] text-white ${
                    disableSendBtn === "disableButton"
                      ? "opacity-50 !cursor-not-allowed"
                      : "opacity-100 !cursor-pointer"
                  }`}
                >
                  {tokenTransferredSuccessfully === false ? (
                    <span className="flex gap-2 justify-center">
                      <span>sending</span>
                      <SyncLoader
                        aria-label="Loading Spinner"
                        size={5}
                        color="#ffffff"
                      />
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

export default TransferModal;
