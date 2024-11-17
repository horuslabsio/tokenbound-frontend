export const WalletIcons = ({ id }: { id: string }) => {
  if (id === "argentX" || id === "argentMobile")
    return (
      <svg
        width={20}
        height={20}
        fill="#FF875B"
        viewBox="0 0 40 36"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-[12px]"
      >
        <path d="M24.7582 -3.97364e-07H14.6238C14.2851 -3.97364e-07 14.0138 0.281178 14.0064 0.630683C13.8017 10.4549 8.82234 19.7792 0.251893 26.3837C-0.0202046 26.5933 -0.0821946 26.9872 0.116734 27.2709L6.04623 35.734C6.24796 36.022 6.64099 36.087 6.91766 35.8754C12.2765 31.7728 16.5869 26.8236 19.691 21.338C22.7951 26.8236 27.1057 31.7728 32.4646 35.8754C32.741 36.087 33.1341 36.022 33.3361 35.734L39.2656 27.2709C39.4642 26.9872 39.4022 26.5933 39.1304 26.3837C30.5597 19.7792 25.5804 10.4549 25.3759 0.630683C25.3685 0.281178 25.0969 -3.97364e-07 24.7582 -3.97364e-07Z" />
      </svg>
    );

  if (id === "braavos")
    return (
      <svg
        viewBox="0 0 100 100"
        fill="url(#gradient)"
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        className="mr-[12px]"
      >
        <path d="M62.705 13.9116C62.8359 14.1333 62.6621 14.407 62.4039 14.407C57.1807 14.407 52.9348 18.5427 52.8351 23.6817C51.0465 23.3477 49.1933 23.3226 47.3626 23.6311C47.2361 18.5156 43.0009 14.407 37.7948 14.407C37.5365 14.407 37.3625 14.1331 37.4935 13.9112C40.0217 9.62809 44.7204 6.75 50.0991 6.75C55.4781 6.75 60.1769 9.62826 62.705 13.9116Z" />
        <path d="M78.7606 45.8718C80.2725 46.3297 81.7025 45.0055 81.1714 43.5222C76.4137 30.2334 61.3911 24.8039 50.0277 24.8039C38.6442 24.8039 23.2868 30.407 18.8754 43.5912C18.3824 45.0645 19.8083 46.3446 21.2978 45.8881L48.872 37.4381C49.5331 37.2355 50.2399 37.2344 50.9017 37.4348L78.7606 45.8718Z" />
        <path d="M18.8132 48.1707L48.8935 39.0472C49.5506 38.8478 50.2524 38.8473 50.9098 39.0456L81.1781 48.1752C83.6912 48.9332 85.411 51.2483 85.411 53.8735V81.2233C85.2944 87.8991 79.2977 93.25 72.6245 93.25H61.5406C60.4449 93.25 59.5577 92.3637 59.5577 91.268V81.6789C59.5577 77.9031 61.7921 74.4855 65.2498 72.9729C69.8849 70.9454 75.3681 68.2028 76.3994 62.6992C76.7323 60.9229 75.5741 59.2094 73.8024 58.8573C69.3226 57.9667 64.3562 58.3107 60.1564 60.1893C55.3887 62.3219 54.1415 65.8694 53.6797 70.6337L53.1201 75.7662C52.9491 77.3349 51.4785 78.5366 49.9014 78.5366C48.2699 78.5366 47.0465 77.294 46.8696 75.6712L46.3204 70.6337C45.9249 66.5529 45.2079 62.5887 40.9895 60.7018C36.1776 58.5494 31.3419 57.8347 26.1976 58.8573C24.426 59.2094 23.2678 60.9229 23.6007 62.6992C24.641 68.2507 30.0812 70.9305 34.7503 72.9729C38.208 74.4855 40.4424 77.9031 40.4424 81.6789V91.2663C40.4424 92.362 39.5555 93.25 38.4599 93.25H27.3756C20.7024 93.25 14.7057 87.8991 14.5891 81.2233V53.8663C14.5891 51.2446 16.3045 48.9316 18.8132 48.1707Z" />

        <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F5B75E" />
          <stop offset="100%" stopColor="#FF9600" />
        </linearGradient>
      </svg>
    );

  if (id == "argentWebWallet") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 56 56"
      >
        <path
          fill="black"
          d="M9.484 48.191h37.734c4.22 0 6.657-2.437 6.657-7.265V15.05c0-4.805-2.46-7.242-7.36-7.242H8.782c-4.195 0-6.656 2.414-6.656 7.242v25.875c0 4.851 2.484 7.265 7.36 7.265m15.727-19.007L7.516 11.723c.515-.211 1.124-.328 1.851-.328h37.29c.726 0 1.359.117 1.898.375L30.883 29.184c-1.008 1.007-1.899 1.453-2.836 1.453c-.938 0-1.828-.446-2.836-1.453M5.71 40.926v-26.11l13.476 13.22L5.734 41.323c-.023-.117-.023-.258-.023-.398m44.578-25.852v26.18L36.906 28.035L50.29 14.887zM9.367 44.606c-.68 0-1.242-.094-1.734-.305l14.015-13.852l1.524 1.5c1.64 1.617 3.21 2.297 4.875 2.297c1.64 0 3.234-.68 4.875-2.297l1.523-1.5l13.993 13.828c-.493.235-1.102.328-1.782.328Z"
        />
      </svg>
    );
  }
  if (id === "controller") {
    return (
      <div
        style={{
          width: "20px",
          height: "20px",
        }}
      >
        <img src="./icons/controller.png" />
      </div>
    );
  }
  return null;
};

export const ImageIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.5 20.5L9.41421 13.4142C8.63317 12.6332 7.36684 12.6332 6.58579 13.4142L3.5 16.5M5.5 20.5H18.5C19.6046 20.5 20.5 19.6046 20.5 18.5V5.5C20.5 4.39543 19.6046 3.5 18.5 3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V18.5C3.5 19.6046 4.39543 20.5 5.5 20.5ZM14.5 7L13.6667 8.66667L12 9.5L13.6667 10.3333L14.5 12L15.3333 10.3333L17 9.5L15.3333 8.66667L14.5 7Z"
      stroke="currentColor"
      strokeLinejoin="round"
    />
  </svg>
);

export const CryptoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.25 7.23695C11.7141 6.96901 12.2859 6.96901 12.75 7.23695L15.75 8.96895C16.2141 9.2369 16.5 9.7321 16.5 10.268V13.7319C16.5 14.2678 16.2141 14.763 15.75 15.031L12.75 16.763C12.2859 17.0309 11.7141 17.0309 11.25 16.763L8.25001 15.031C7.7859 14.763 7.5 14.2678 7.5 13.7319V10.268C7.5 9.7321 7.7859 9.2369 8.25001 8.96895L11.25 7.23695Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SwitchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 1a.5.5 0 0 1 .374.168l4 4.5l-.748.664L8 2.252l-3.626 4.08l-.748-.664l4-4.5A.5.5 0 0 1 8 1m0 12.747l-3.626-4.08l-.748.665l4 4.5a.5.5 0 0 0 .748 0l4-4.5l-.748-.664z"
      clipRule="evenodd"
    />
  </svg>
);

export const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd">
      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
      <path
        fill="currentColor"
        d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0"
      />
    </g>
  </svg>
);

export const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
    />
  </svg>
);

export const TwitterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 16 16"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#EC796B" }} />
          <stop offset="100%" style={{ stopColor: "#D672EF" }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient)"
        d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"
      />
    </svg>
  );
};

export const GithubIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#EC796B" }} />
          <stop offset="100%" style={{ stopColor: "#D672EF" }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient)"
        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.20 2.39.10 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
      />
    </svg>
  );
};

export const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.7em"
      height="1.7em"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3m0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9"
      />
    </svg>
  );
};

export const DownChevronIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m4 8.417l6.587 6.587a2.013 2.013 0 0 0 2.826 0L20 8.417"
      />
    </svg>
  );
};
export const CopyIcon = ({
  width = "1.8em",
  height = "1.8em",
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.45833 4.45833V1.95833C4.45833 1.4981 4.83143 1.125 5.29167 1.125H14.0417C14.5019 1.125 14.875 1.4981 14.875 1.95833V10.7167C14.875 11.1769 14.5019 11.55 14.0417 11.55H11.5417M1.125 5.29167V14.0417C1.125 14.5019 1.4981 14.875 1.95833 14.875H10.7083C11.1686 14.875 11.5417 14.5019 11.5417 14.0417V5.29167C11.5417 4.83143 11.1686 4.45833 10.7083 4.45833H1.95833C1.4981 4.45833 1.125 4.83143 1.125 5.29167Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CopyCheckIcon = ({ copied = true }: { copied?: boolean }) => {
  return (
    <svg
      style={{
        strokeDasharray: 200,
        strokeDashoffset: copied ? 0 : 200,
        transition: "stroke-dashoffset 2s ease-in-out",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" />
        <path d="M4.012 16.737A2.005 2.005 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1M11 14l2 2l4-4" />
      </g>
    </svg>
  );
};

export const RightArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.85"
      >
        <path strokeMiterlimit="10" d="M20 12H4" />
        <path
          strokeLinejoin="round"
          d="m12.968 19.66l6.572-6.572a1.53 1.53 0 0 0 0-2.176L12.968 4.34"
        />
      </g>
    </svg>
  );
};

export const SendIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#EC796B" }} />
          <stop offset="100%" style={{ stopColor: "#D672EF" }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient)"
        d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2M8 7.71v3.34l7.14.95l-7.14.95v3.34L18 12z"
      />
    </svg>
  );
};

export const UpRightArrowIcon = ({
  gradient = false,
}: {
  gradient?: boolean;
}) => {
  return (
    <>
      {gradient ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5834 5.41669L5.41675 14.5834M7.28768 4.79169H13.5418C14.4622 4.79169 15.2084 5.53788 15.2084 6.45835V13.5382"
            stroke="url(#paint0_linear_259_4184)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_259_4184"
              x1="10.3126"
              y1="4.79169"
              x2="10.3126"
              y2="14.5834"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D672EF" />
              <stop offset="1" stopColor="#EC796B" />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          >
            <path strokeMiterlimit="10" d="M17.657 6.343L6.343 17.657" />
            <path
              strokeLinejoin="round"
              d="M18.101 16.733V7.437A1.53 1.53 0 0 0 16.563 5.9H7.267"
            />
          </g>
        </svg>
      )}
    </>
  );
};

export const CalenderCheckedIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.99683 5.01758V3.01758M15.9968 5.01758V3.01758M9.49683 12.7676L10.9968 14.2676L14.4968 10.7676M6.99683 20.0176H16.9968C18.6537 20.0176 19.9968 18.6744 19.9968 17.0176V8.01758C19.9968 6.36072 18.6537 5.01758 16.9968 5.01758H6.99683C5.33997 5.01758 3.99683 6.36072 3.99683 8.01758V17.0176C3.99683 18.6744 5.33997 20.0176 6.99683 20.0176Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </g>
  </svg>
);

export const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.3em"
    height="1.3em"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.85"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" />
      <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6" />
    </g>
  </svg>
);

export const WalletIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.50008 5.41667C2.50008 3.80584 3.80592 2.5 5.41675 2.5H14.1667V6.66667H17.5001V17.5H9.58341V16.25H16.2501V7.91667H5.00008C4.54472 7.91667 4.1178 7.79492 3.75008 7.58221V10H2.50008V5.41667ZM3.75008 5.41667C3.75008 6.10702 4.30973 6.66667 5.00008 6.66667H12.9167V3.75H5.41675C4.49627 3.75 3.75008 4.49619 3.75008 5.41667ZM5.00008 10.4917L8.33341 12.4362V16.3138L5.00008 18.2583L1.66675 16.3138V12.4362L5.00008 10.4917ZM2.91675 13.1541V15.5959L5.00008 16.8112L7.08341 15.5959V13.1541L5.00008 11.9388L2.91675 13.1541Z"
      fill="white"
    />
    <path
      d="M12.9167 12.9167C13.377 12.9167 13.7501 12.5436 13.7501 12.0833C13.7501 11.6231 13.377 11.25 12.9167 11.25C12.4565 11.25 12.0834 11.6231 12.0834 12.0833C12.0834 12.5436 12.4565 12.9167 12.9167 12.9167Z"
      fill="white"
    />
  </svg>
);

export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586z"
    />
  </svg>
);

export const GlobeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75M12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75M12 21.25C9.65279 21.25 7.75 17.1086 7.75 12C7.75 6.89137 9.65279 2.75 12 2.75M12 21.25C14.3472 21.25 16.25 17.1086 16.25 12C16.25 6.89137 14.3472 2.75 12 2.75M21 12H3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>
);

export const GradientGlobeIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75M12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75M12 21.25C9.65279 21.25 7.75 17.1086 7.75 12C7.75 6.89137 9.65279 2.75 12 2.75M12 21.25C14.3472 21.25 16.25 17.1086 16.25 12C16.25 6.89137 14.3472 2.75 12 2.75M21 12H3"
      stroke="#8C8C8C"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <path
      d="M12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75M12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75M12 21.25C9.65279 21.25 7.75 17.1086 7.75 12C7.75 6.89137 9.65279 2.75 12 2.75M12 21.25C14.3472 21.25 16.25 17.1086 16.25 12C16.25 6.89137 14.3472 2.75 12 2.75M21 12H3"
      stroke="url(#paint0_linear_108_654)"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <defs>
      <linearGradient
        id="paint0_linear_108_654"
        x1="21.25"
        y1="12"
        x2="2.75"
        y2="12"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D672EF" />
        <stop offset="1" stopColor="#EC796B" />
      </linearGradient>
    </defs>
  </svg>
);

export const ExitIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.99984 2.66669L11.3332 2.66669C12.4377 2.66669 13.3332 3.56212 13.3332 4.66669V11.3334C13.3332 12.4379 12.4377 13.3334 11.3332 13.3334H9.99984M9.6665 8.00003H2.6665M9.6665 8.00003L7.33317 10.3334M9.6665 8.00003L7.33317 5.66669"
      stroke="currentColor"
      strokeWidth="1.41667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LeftChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M14.41 18.16L8.75 12.5l5.66-5.66l.7.71l-4.95 4.95l4.95 4.95z"
    />
  </svg>
);

export const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1zM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5"
      clipRule="evenodd"
    />
  </svg>
);

export const RefreshIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.0515 3.125V5.625C16.0515 6.08524 15.6784 6.45833 15.2182 6.45833H12.7182M3.95833 16.875V14.375C3.95833 13.9148 4.33143 13.5417 4.79167 13.5417H7.29167M3.17819 10.8594C3.14308 10.5778 3.125 10.291 3.125 10C3.125 6.20304 6.20304 3.125 10 3.125C12.2305 3.125 14.2593 4.18719 15.5268 5.83333M16.8218 9.14062C16.8569 9.42215 16.875 9.70896 16.875 10C16.875 13.797 13.797 16.875 10 16.875C7.76951 16.875 5.74073 15.8128 4.4732 14.1667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
