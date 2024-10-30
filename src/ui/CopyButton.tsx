import { forwardRef, useState } from "react";
import { copyToClipBoard } from "@utils/helper";
import { CopyCheckIcon, CopyIcon } from "@public/icons";
import { Tooltip } from "./tooltip";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textToCopy: string;
  textDisplayed?: string;
  copyIcon?: boolean;
}

const CopyButton = forwardRef<HTMLButtonElement, Props>(
  ({ textToCopy, textDisplayed, className, copyIcon }, ref) => {
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
      <Tooltip message={copied ? "Copied" : " Click to copy"}>
        <button
          ref={ref}
          aria-label="Click to copy"
          className={className}
          onClick={() => copyToClipBoardHandler(textToCopy!)}
        >
          <span>
            {textDisplayed
              ? textDisplayed
              : `${textToCopy?.slice(0, 4)}...${textToCopy?.slice(61, 66)}`}
          </span>
          {copyIcon && (
            <span className="relative ml-2 border-l border-gray-500">
              <div
                style={{
                  color: copied ? "#e5e7eb" : "",
                  transition: "opacity 300ms ease-in-out 2s",
                }}
                className={`flex py-[2px] pl-[6px] ${
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
          )}
        </button>
      </Tooltip>
    );
  }
);
CopyButton.displayName = "CopyButton";
export { CopyButton };
