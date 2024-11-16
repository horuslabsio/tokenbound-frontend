"use client";
import {
  useAccount,
  useDisconnect,
  useStarkProfile,
} from "@starknet-react/core";

import {
  CloseIcon,
  ExitIcon,
  GlobeIcon,
  GradientGlobeIcon,
  RightArrow,
} from "@public/icons";
import { useRouter } from "next/navigation";
import { CopyButton } from "ui/copy-button";

const Profile = ({ closeModal }: { closeModal: () => void }) => {
  const router = useRouter();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: starknetProfile } = useStarkProfile({
    address: address,
  });

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="mt-[25%] flex h-[14rem] w-[95vw] max-w-[27rem] flex-col items-center gap-2 rounded-[16px] bg-white p-4 text-foreground-primary md:absolute md:mt-0 md:-translate-x-[58%]"
    >
      <div className="flex w-full items-center justify-between">
        <h5 className="font-inter-variable">
          My <span className="text-gradient">Wallet</span>
        </h5>
        <div className="flex items-center gap-4">
          <CopyButton
            textToCopy={address || ""}
            className="flex w-[10rem] items-center justify-between rounded-full bg-gray-100 px-4 py-2 shadow-inner outline-none md:outline"
            copyIcon
          />

          <button
            onClick={closeModal}
            className="grid h-10 w-10 place-content-center rounded-full bg-gray-100 text-lg text-black"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="mx-auto h-[5.3rem] w-[6.3rem] rounded-[16px] bg-[#EFC58E]">
          {starknetProfile?.profilePicture && (
            <img
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.opacity = "0";
              }}
              className="rounded-[16px] object-cover"
              src={starknetProfile?.profilePicture}
              alt="your starknet profile picture"
            />
          )}
        </div>

        <button
          onClick={() => {
            closeModal();
            router.push(`/collections/${address}`);
          }}
          className="group flex h-[5.3rem] w-[18.4rem] flex-col justify-between rounded-[16px] bg-gray-100 px-4 py-3 text-start transition-all duration-300 hover:bg-black hover:text-white"
          type="button"
        >
          <span aria-hidden className="relative">
            <span className="absolute opacity-100 group-hover:opacity-0">
              <GlobeIcon />
            </span>
            <span className="absolute opacity-0 group-hover:opacity-100">
              <GradientGlobeIcon />
            </span>
          </span>
          <span className="flex items-center gap-2">
            View my NFTs
            <span
              aria-hidden
              className="text-xl opacity-0 group-hover:opacity-100"
            >
              <RightArrow />
            </span>
          </span>
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => disconnect()}
          className="flex h-[3rem] items-center gap-2 rounded-[8px] px-4 text-[#CE5A4C] transition-all hover:bg-gray-100"
        >
          <span>Disconnect</span>
          <span>
            <ExitIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
