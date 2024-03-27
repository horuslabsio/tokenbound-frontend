import { useState } from "react";
import CopyCheckIcon from "svg/CopyCheckIcon";
import CopyIcon from "svg/CopyIcon";
import { copyToClipBoard } from "@utils/helper";

type Props = {
  textToCopy: string;
  textDisplayed?: string;
  style?: string;
};

const CopyButton = ({ textToCopy, textDisplayed, style }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipBoardHandler = async (text: string) => {
    const success = await copyToClipBoard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };
  return (
    <button
      className={
        style
          ? style
          : "inline-flex items-center px-[12px] py-[4px] bg-gray-200 text-sm cursor-pointer rounded-full text-gray-700"
      }
      onClick={() => copyToClipBoardHandler(textToCopy!)}
    >
      <span>
        {textDisplayed
          ? textDisplayed
          : `${textToCopy?.slice(0, 4)}...${textToCopy?.slice(61, 66)}`}
      </span>

      <span className="ml-2 border-l border-gray-500 relative">
        <div
          style={{
            color: copied ? "#e5e7eb" : "",
            transition: "opacity 300ms ease-in-out 2s",
          }}
          className={`flex pl-[6px]  py-[2px] ${
            copied ? "opacity-0" : "opacity-100"
          }`}
        >
          <CopyIcon width="1.3em" height="1.3em" />
        </div>
        <div
          style={{
            left: "calc(50% - 0.5em / 2)",
          }}
          className="absolute top-[4px]"
        >
          <CopyCheckIcon copied={copied} width="1.2em" height="1.2em" />
        </div>
      </span>
    </button>
  );
};

export default CopyButton;
