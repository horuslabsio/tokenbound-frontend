import { forwardRef, useState } from "react";
import { copyToClipBoard } from "@utils/helper";
import { CopyCheckIcon, CopyIcon } from "@public/icons";

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
          <span className="relative h-6 w-6">
            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${copied ? "opacity-0" : "opacity-100"}`}
            >
              <CopyIcon />
            </span>

            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${copied ? "opacity-100" : "opacity-0"}`}
            >
              <CopyCheckIcon copied={copied} />
            </span>
          </span>
        )}
      </button>
    );
  },
);
CopyButton.displayName = "CopyButton";
export { CopyButton };
