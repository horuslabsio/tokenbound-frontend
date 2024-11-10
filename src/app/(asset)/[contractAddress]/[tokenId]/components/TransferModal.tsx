import { ChangeEvent, useState } from "react";
import { CloseIcon, RightArrow } from "@public/icons";
import { Button } from "ui/button";
import { useTokenBoundSDK } from "@hooks/useTokenboundHookContext";

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
  const [formValues, setFormValues] = useState<{
    amount: string | number;
    recipient: string;
  }>({
    amount: "",
    recipient: "",
  });

  const { tokenboundV2, tokenboundV3, activeVersion } = useTokenBoundSDK();
  const [transferStatus, setTransferStatus] = useState<
    "idle" | "error" | "pending" | "success"
  >("idle");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => {
      if (name === "amount") {
        const validNumberPattern = /^[0-9]*\.?[0-9]*$/;
        if (!validNumberPattern.test(value)) {
          return prevValues;
        }

        const numericValue = parseFloat(value);
        const numericBalance = parseFloat(balance);
        const amountNewValue =
          numericValue > numericBalance ? numericBalance.toString() : value;

        return {
          ...prevValues,
          [name]: amountNewValue,
        };
      } else {
        return {
          ...prevValues,
          [name]: value,
        };
      }
    });
  };

  const transferERC20Assets = async () => {
    const tokenbound =
      activeVersion?.version === "V2" ? tokenboundV2 : tokenboundV3;
    const bigInitAmount = +formValues.amount * decimal;
    try {
      if (tokenbound) {
        setTransferStatus("pending");
        const status = await tokenbound.transferERC20({
          tbaAddress: tokenBoundAddress,
          contractAddress: contractAddress,
          recipient: formValues.recipient,
          amount: bigInitAmount.toString(),
        });
        setTransferStatus("success");
      }
    } catch (error) {
      setTransferStatus("error");
      setTimeout(() => {
        setTransferStatus("idle");
      }, 5000);
      if (process.env.NODE_ENV !== "production") {
        console.log("there was an error transferring the assets:", error);
      }
    }
  };

  return (
    <div className="grid h-full w-full place-content-center text-foreground-primary">
      <div className="flex min-h-[18rem] w-[90vw] max-w-[27rem] flex-col justify-between rounded-[16px] bg-white p-4">
        <div className="flex w-full items-center justify-between">
          <h5 className="font-inter-variable">
            Send <span className="text-gradient uppercase">{abbreviation}</span>
          </h5>

          <button
            onClick={() => {
              closeModal();
              setFormValues({
                amount: "",
                recipient: "",
              });
              setTransferStatus("idle");
            }}
            className="grid h-10 w-10 place-content-center rounded-full bg-gray-100 text-lg text-black"
          >
            <CloseIcon />
          </button>
        </div>

        {transferStatus === "success" ? (
          <div className="flex-1 text-center">
            <p className="text-[6rem]">🎉</p>
            <p className="text-lg">Transaction successful!</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              transferERC20Assets();
            }}
            className="flex flex-1 flex-col justify-between pt-4"
          >
            <label htmlFor="recipient" className="sr-only">
              recipient Wallet Address
            </label>
            <input
              className="mb-2 h-[2.8rem] rounded-full bg-gray-100 p-4 outline-none placeholder:text-base placeholder:text-foreground-tertiary"
              type="text"
              id="recipient"
              name="recipient"
              placeholder="Enter Address"
              value={formValues.recipient}
              onChange={handleInputChange}
            />
            <label htmlFor="amount" className="sr-only"></label>
            <div className="relative">
              <input
                type="text"
                className="h-[2.8rem] w-full rounded-full bg-gray-100 p-4 outline-none placeholder:text-base placeholder:text-foreground-tertiary"
                id="amount"
                name="amount"
                value={formValues.amount}
                onChange={handleInputChange}
                placeholder="Amount"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFormValues((prevState) => ({
                    ...prevState,
                    amount: parseFloat(balance) || 0,
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
              type="submit"
              variant={"gray"}
              endIcon={transferStatus === "error" ? null : <RightArrow />}
              isLoading={transferStatus === "pending"}
              className={`rounded-full transition-all duration-300 ${transferStatus === "error" ? "text-error" : "bg-black text-white disabled:bg-gray-100 disabled:text-black"}`}
              disabled={
                !Object.values(formValues).every((v) => v !== "") ||
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

export default TransferModal;
