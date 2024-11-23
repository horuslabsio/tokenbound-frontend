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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="20"
        height="20"
      >
        <path
          fill="#191A1A"
          d="m218.69 57.839 2.692-.015c2.942-.015 5.883-.022 8.825-.027l6.132-.017c4.288-.01 8.576-.017 12.864-.02 5.492-.006 10.983-.03 16.474-.058 4.223-.019 8.446-.024 12.67-.026 2.024-.003 4.048-.01 6.072-.024 2.834-.017 5.668-.015 8.502-.008l2.527-.028c6.326.045 10.403 1.485 15.24 5.759 5.298 6.015 6.449 10.904 6.41 18.8l-.01 3.507-.026 3.63-.013 3.69c-.012 3-.028 5.999-.049 8.998l2.79-.105c22.748-.487 42.502 9.109 63.022 17.855a17675.688 17675.688 0 0 0 14.973 6.36 2160.91 2160.91 0 0 0 21.328 8.89l5.858 2.419c2.795 1.154 5.59 2.305 8.391 3.445 21.349 8.69 38.159 19.123 48.24 40.538 4.958 12.194 5.698 23.988 5.689 37.015.006 1.63.012 3.261.02 4.892.017 4.401.022 8.802.024 13.204 0 2.758.005 5.516.01 8.274.019 9.647.027 19.294.026 28.941-.002 8.953.02 17.906.051 26.859.026 7.719.037 15.438.036 23.157 0 4.596.005 9.192.026 13.788.02 4.328.02 8.656.005 12.984-.002 1.575.003 3.15.015 4.726.198 27.313-11.163 43.352-29.68 62.241-1.139 1.156-2.279 2.31-3.42 3.464a524.574 524.574 0 0 0-3.416 3.498c-13.147 13.581-26.716 24.243-46.513 25.058-2.278.022-4.555.023-6.833.005l-3.843.019c-3.476.016-6.951.008-10.427-.004-3.766-.01-7.531.005-11.297.016-7.36.018-14.719.014-22.078.002-5.986-.009-11.971-.01-17.957-.006l-2.589.002-5.208.004c-16.25.011-32.5-.002-48.75-.023-13.92-.018-27.84-.015-41.76.003a23344.54 23344.54 0 0 1-53.773.014l-2.579-.002c-5.972-.003-11.945.003-17.918.012-7.287.011-14.573.008-21.86-.013-3.712-.01-7.424-.015-11.136-.001-4.037.014-8.072-.003-12.109-.023l-3.502.027c-25.358-.24-40.375-15.868-57.189-32.573a720.183 720.183 0 0 0-3.725-3.664c-14.928-14.577-24.816-29.328-25.203-50.784-.022-2.95-.019-5.9-.014-8.849l-.015-4.902c-.013-4.413-.014-8.827-.012-13.24.001-3.697-.003-7.395-.008-11.092-.011-8.731-.012-17.462-.006-26.194a8840.2 8840.2 0 0 0-.027-26.928c-.018-7.734-.024-15.467-.02-23.2.001-4.608-.001-9.215-.015-13.822-.013-4.337-.01-8.674.002-13.011.002-1.58 0-3.162-.009-4.743-.103-21.266 5.09-40.25 19.768-56.107 9.275-8.784 20.428-14.064 32.18-18.739 1.876-.76 3.752-1.522 5.627-2.286l4.08-1.657c8.604-3.491 17.162-7.093 25.724-10.687 2.81-1.179 5.623-2.355 8.435-3.531 7.73-3.234 15.458-6.47 23.165-9.76 14.403-6.131 28.356-12.03 44.281-11.829l2.086.014c1.68.012 3.36.03 5.039.049l-.048-2.244c-.062-3.398-.101-6.795-.14-10.194l-.076-3.529c-.07-8.218.223-15.446 5.701-21.908 6.246-5.18 10.111-6.275 18.254-6.286Z"
        />
        <path
          fill="#191A1A"
          d="m218.69 57.839 2.692-.015c2.942-.015 5.883-.022 8.825-.027l6.132-.017c4.288-.01 8.576-.017 12.864-.02 5.492-.006 10.983-.03 16.474-.058 4.223-.019 8.446-.024 12.67-.026 2.024-.003 4.048-.01 6.072-.024 2.834-.017 5.668-.015 8.502-.008l2.527-.028c6.326.045 10.403 1.485 15.24 5.759 5.298 6.015 6.449 10.904 6.41 18.8l-.01 3.507-.026 3.63-.013 3.69c-.012 3-.028 5.999-.049 8.998l2.79-.105c22.748-.487 42.502 9.109 63.022 17.855a17675.688 17675.688 0 0 0 14.973 6.36 2160.91 2160.91 0 0 0 21.328 8.89l5.858 2.419c2.795 1.154 5.59 2.305 8.391 3.445 21.349 8.69 38.159 19.123 48.24 40.538 4.958 12.194 5.698 23.988 5.689 37.015.006 1.63.012 3.261.02 4.892.017 4.401.022 8.802.024 13.204 0 2.758.005 5.516.01 8.274.019 9.647.027 19.294.026 28.941-.002 8.953.02 17.906.051 26.859.026 7.719.037 15.438.036 23.157 0 4.596.005 9.192.026 13.788.02 4.328.02 8.656.005 12.984-.002 1.575.003 3.15.015 4.726.198 27.313-11.163 43.352-29.68 62.241-1.139 1.156-2.279 2.31-3.42 3.464a524.574 524.574 0 0 0-3.416 3.498c-13.147 13.581-26.716 24.243-46.513 25.058-2.278.022-4.555.023-6.833.005l-3.843.019c-3.476.016-6.951.008-10.427-.004-3.766-.01-7.531.005-11.297.016-7.36.018-14.719.014-22.078.002-5.986-.009-11.971-.01-17.957-.006l-2.589.002-5.208.004c-16.25.011-32.5-.002-48.75-.023-13.92-.018-27.84-.015-41.76.003a23344.54 23344.54 0 0 1-53.773.014l-2.579-.002c-5.972-.003-11.945.003-17.918.012-7.287.011-14.573.008-21.86-.013-3.712-.01-7.424-.015-11.136-.001-4.037.014-8.072-.003-12.109-.023l-3.502.027c-25.358-.24-40.375-15.868-57.189-32.573a720.183 720.183 0 0 0-3.725-3.664c-14.928-14.577-24.816-29.328-25.203-50.784-.022-2.95-.019-5.9-.014-8.849l-.015-4.902c-.013-4.413-.014-8.827-.012-13.24.001-3.697-.003-7.395-.008-11.092-.011-8.731-.012-17.462-.006-26.194a8840.2 8840.2 0 0 0-.027-26.928c-.018-7.734-.024-15.467-.02-23.2.001-4.608-.001-9.215-.015-13.822-.013-4.337-.01-8.674.002-13.011.002-1.58 0-3.162-.009-4.743-.103-21.266 5.09-40.25 19.768-56.107 9.275-8.784 20.428-14.064 32.18-18.739 1.876-.76 3.752-1.522 5.627-2.286l4.08-1.657c8.604-3.491 17.162-7.093 25.724-10.687 2.81-1.179 5.623-2.355 8.435-3.531 7.73-3.234 15.458-6.47 23.165-9.76 14.403-6.131 28.356-12.03 44.281-11.829l2.086.014c1.68.012 3.36.03 5.039.049l-.048-2.244c-.062-3.398-.101-6.795-.14-10.194l-.076-3.529c-.07-8.218.223-15.446 5.701-21.908 6.246-5.18 10.111-6.275 18.254-6.286ZM237 99v44l-11.242-.105c-3.618-.024-7.235-.042-10.853-.06-2.502-.015-5.004-.035-7.507-.061-3.609-.037-7.218-.054-10.828-.067l-3.356-.047c-10.517-.002-18.974 3.043-28.523 7.156-.868.37-1.737.738-2.632 1.118a3643.674 3643.674 0 0 0-8.497 3.628c-2.998 1.278-5.998 2.553-8.998 3.828l-6.19 2.633c-7.17 3.05-14.353 6.065-21.546 9.059l-2.954 1.23c-3.769 1.57-7.538 3.139-11.31 4.702-21.224 7.505-21.224 7.505-34.915 24.062-1.02 3.024-1.027 5.85-1.03 9.027l-.014 2.06c-.012 2.258-.003 4.516.007 6.775a2512.229 2512.229 0 0 0-.015 18.095c.008 4.614 0 9.23-.004 13.844-.006 7.748.002 15.496.016 23.244.016 8.953.01 17.906-.006 26.859-.013 7.694-.015 15.387-.007 23.08.004 4.593.005 9.185-.005 13.777-.009 4.317-.003 8.633.015 12.95.004 1.582.003 3.165-.004 4.748-.008 2.163.002 4.325.017 6.489l.003 3.665c.596 5.227 2.799 9.108 6.485 12.79l1.831 1.85 1.96 1.933 2.037 2.038c1.417 1.414 2.837 2.825 4.261 4.232 2.174 2.15 4.333 4.313 6.491 6.478a5010.1 5010.1 0 0 0 4.149 4.127l1.948 1.95 1.85 1.822 1.608 1.594c3.86 3.287 6.922 4.872 12.023 4.877l3.174.026c1.716-.01 1.716-.01 3.466-.018l3.698.016c3.385.012 6.769.01 10.153.003 3.651-.005 7.302.008 10.953.018 7.152.017 14.304.018 21.456.013 5.813-.004 11.626-.003 17.44.002l2.506.003 5.04.004c15.762.014 31.523.009 47.284-.003 14.418-.01 28.837.003 43.255.027 14.805.024 29.61.034 44.414.027 8.312-.003 16.623 0 24.935.017 7.076.014 14.153.015 21.229-.002 3.61-.009 7.22-.011 10.83.004 3.914.017 7.828.002 11.743-.016l3.453.03c8.278-.078 13.335-1.8 19.315-7.751.613-.605 1.227-1.209 1.86-1.831.635-.642 1.27-1.284 1.926-1.945l2.04-2.032c1.413-1.411 2.822-2.826 4.228-4.244a1121.04 1121.04 0 0 1 6.483-6.464c1.376-1.378 2.75-2.756 4.124-4.135l1.957-1.939 1.811-1.84 1.592-1.599c3.303-4.222 3.624-8.353 3.644-13.587l.016-2.046c.015-2.255.016-4.51.016-6.765.008-1.62.016-3.24.026-4.86.022-4.397.03-8.794.035-13.19.004-2.75.01-5.5.017-8.25.025-9.601.038-19.203.042-28.804.003-8.936.033-17.871.075-26.807.035-7.682.05-15.363.05-23.045.002-4.583.01-9.167.039-13.75.026-4.315.028-8.63.012-12.945a419.37 419.37 0 0 1 .02-4.733c.094-9.805-.439-18.255-7.316-25.836-4.025-3.847-8.695-5.956-13.814-7.988l-2.493-1.03c-2.703-1.113-5.414-2.207-8.124-3.303-1.901-.779-3.802-1.56-5.702-2.342a4921.21 4921.21 0 0 0-8.932-3.67 1908.25 1908.25 0 0 1-21.632-9.027l-3.055-1.295c-3.932-1.668-7.863-3.337-11.793-5.008-23.407-10.298-23.407-10.298-48.503-13.568l-3.405.005c-3.576.005-7.152.018-10.728.03-2.43.006-4.86.01-7.29.014-5.944.01-11.89.03-17.835.049V99h-38Z"
        />
        <path
          fill="#F9C949"
          d="M237 99h38v44l10.734-.105c3.466-.024 6.931-.042 10.396-.06 2.392-.015 4.784-.035 7.175-.061 3.456-.037 6.911-.054 10.367-.067 1.054-.015 2.107-.03 3.193-.047 10.53-.002 19.959 2.479 29.545 6.719l2.287.983c1.618.697 3.234 1.398 4.85 2.102 3.47 1.515 6.947 3.009 10.425 4.504 1.836.79 3.67 1.58 5.505 2.372 10.557 4.55 21.164 8.98 31.773 13.41l5.434 2.272 2.611 1.091 4.987 2.086c3.485 1.457 6.972 2.909 10.472 4.33l3.234 1.319 2.697 1.086c6.534 3.009 10.188 7.56 13.268 13.956 2.111 6.272 1.722 12.847 1.662 19.388a1534.285 1534.285 0 0 1-.01 18.058c-.02 4.608-.013 9.214-.011 13.821 0 7.73-.02 15.46-.052 23.19-.037 8.932-.046 17.862-.039 26.793.007 8.606-.004 17.212-.024 25.818-.008 3.657-.01 7.314-.009 10.97 0 4.305-.013 8.61-.04 12.914-.006 1.577-.008 3.155-.005 4.733a602.33 602.33 0 0 1-.03 6.469l-.012 3.653c-.605 5.214-2.807 9.098-6.474 12.782l-1.821 1.85-1.951 1.933-2.03 2.038a1161.1 1161.1 0 0 1-4.248 4.232 1119.41 1119.41 0 0 0-6.459 6.478 4118.72 4118.72 0 0 1-4.138 4.127l-1.933 1.95c-.61.602-1.22 1.203-1.85 1.822l-1.6 1.594c-6.328 5.044-12.131 4.93-19.898 4.898l-3.698.02c-3.38.016-6.76.019-10.14.015-3.649 0-7.297.016-10.946.03-7.144.025-14.289.033-21.434.035-5.807.002-11.615.008-17.423.017a28389.686 28389.686 0 0 1-54.793.038c-14.405-.002-28.81.027-43.214.07-14.795.042-29.589.063-44.383.06-8.305 0-16.61.008-24.914.04-7.07.027-14.14.034-21.21.014-3.606-.01-7.212-.01-10.818.016-3.912.028-7.823.009-11.735-.014l-3.443.046c-7.414-.097-11.495-1.642-16.83-6.788l-1.877-1.722c-1.767-1.64-3.475-3.326-5.178-5.032l-1.902-1.889c-1.311-1.306-2.62-2.614-3.927-3.925-1.998-2.002-4.01-3.99-6.022-5.977a4207.77 4207.77 0 0 1-3.836-3.834l-1.815-1.787-1.68-1.7-1.475-1.472c-3.244-4.187-3.542-8.333-3.562-13.498l-.016-2.046c-.015-2.255-.016-4.51-.016-6.765-.008-1.62-.016-3.24-.026-4.86-.022-4.397-.03-8.794-.035-13.19-.004-2.75-.01-5.5-.017-8.25-.025-9.601-.038-19.203-.042-28.804-.003-8.936-.033-17.871-.075-26.807-.035-7.682-.05-15.363-.05-23.045-.002-4.583-.01-9.167-.039-13.75-.026-4.315-.028-8.63-.012-12.945a419.37 419.37 0 0 0-.02-4.733c-.094-9.804.446-18.234 7.3-25.828 4.146-3.983 9.067-6.124 14.338-8.25l2.644-1.105c2.859-1.191 5.724-2.364 8.59-3.536 2.001-.83 4.002-1.66 6.002-2.493 4.152-1.725 8.308-3.444 12.465-5.158a2845.707 2845.707 0 0 0 18.361-7.67l5.816-2.446 2.832-1.191 2.774-1.167 2.709-1.14c31.213-13.117 31.213-13.117 39.11-13.099h3.215l3.45.016 3.548.005c3.74.005 7.479.018 11.218.03 2.535.006 5.07.01 7.605.014 6.215.01 12.43.03 18.645.049V99Zm-132 84a82.553 82.553 0 0 0-.254 7.25l-.01 2.29c-.007 2.546-.001 5.092.005 7.638a4755.13 4755.13 0 0 0-.01 20.316c.005 5.173 0 10.347-.002 15.52-.004 8.69 0 17.378.01 26.068.011 10.057.008 20.115-.003 30.173-.01 8.622-.01 17.245-.006 25.867.004 5.156.004 10.311-.003 15.466-.005 4.846-.001 9.692.01 14.538.003 1.783.002 3.565-.002 5.348-.006 2.425.001 4.85.011 7.276l-.013 2.16c-.074 3.99-.074 3.99 2.267 7.09 2.247.304 2.247.304 4.892.254l3.152.018 3.49-.011 3.686.011c3.387.009 6.775.008 10.162.004 3.649-.002 7.298.007 10.947.014 7.153.013 14.306.015 21.459.012 5.812-.001 11.623 0 17.435.005l2.503.001 5.033.004c15.747.01 31.494.009 47.241.003 14.418-.006 28.837.006 43.255.025 14.79.02 29.581.027 44.372.024 8.31-.002 16.62 0 24.929.014 7.073.012 14.147.014 21.221.002 3.612-.006 7.223-.007 10.834.005 3.91.012 7.819.002 11.728-.01l3.483.022 3.16-.022h2.737c2.764-.454 3.655-1.12 5.281-3.375a55.86 55.86 0 0 0 .381-7.288l.014-2.266c.012-2.513.003-5.025-.007-7.538a3092.18 3092.18 0 0 0 .015-20.067c-.008-5.111 0-10.222.004-15.334.006-8.585-.002-17.17-.016-25.755-.016-9.933-.01-19.866.006-29.8.013-8.52.015-17.039.007-25.559-.004-5.092-.005-10.184.005-15.277.009-4.787.003-9.573-.015-14.36-.004-1.76-.003-3.52.004-5.28.008-2.396-.002-4.791-.017-7.188l.02-2.125c-.024-3.65-.024-3.65-1.611-6.84-2.382-1.76-3.858-1.698-6.808-1.698l-3.16-.022-3.483.023-3.69-.012c-3.388-.008-6.775-.003-10.162.008-3.65.01-7.3 0-10.95-.005-7.154-.01-14.307-.003-21.46.009-8.324.013-16.647.012-24.971.01-14.847-.003-29.695.008-44.542.028-14.42.019-28.839.026-43.259.02a42368.356 42368.356 0 0 0-52.082.01l-2.492.001c-5.808.004-11.615.004-17.423.002-7.073-.002-14.145.003-21.218.017-3.611.008-7.223.012-10.834.007-3.908-.005-7.815.006-11.722.018l-3.49-.011-3.152.018-2.736.002c-2.368.05-2.368.05-4.156 2.252Z"
        />
        <path
          fill="#F9C949"
          d="m334.125 230.602 2.375-.01c1.655-.001 3.309.004 4.963.017 2.528.016 5.055 0 7.584-.02 1.61.003 3.219.007 4.828.013l2.286-.019c3.072.041 5.505.265 8.316 1.547 2.213 2.717 2.025 4.71 2.02 8.183l.001 3.757-.06 3.93.021 3.93c-.065 9.564-.065 9.564-1.748 11.725-2.953 2.322-6.607 1.77-10.211 1.743l-2.521.01c-1.759.001-3.517-.004-5.276-.017-2.693-.016-5.385 0-8.078.02a2239.07 2239.07 0 0 1-5.125-.013l-2.443.019c-5.617-.07-5.617-.07-7.768-1.762-3.089-3.965-1.753-10.858-1.726-15.655l-.061-3.93.002-3.757-.006-3.45C322 234 322 234 323.523 232.13c3.502-1.598 6.826-1.559 10.602-1.528Z"
        />
        <path
          fill="#FACA49"
          d="m333.5 290.602 2.521-.01c1.759-.001 3.517.004 5.276.017 2.693.016 5.385 0 8.078-.02 1.708.003 3.417.007 5.125.013l2.443-.019c5.617.07 5.617.07 7.768 1.762 3.089 3.965 1.753 10.858 1.726 15.655l.061 3.93-.002 3.757.006 3.45C366 322 366 322 364.477 323.87c-3.502 1.598-6.826 1.559-10.602 1.528l-2.375.01c-1.655.001-3.309-.004-4.963-.017-2.528-.016-5.055 0-7.584.02-1.61-.003-3.219-.007-4.828-.013l-2.286.019c-3.072-.041-5.505-.265-8.316-1.547-2.213-2.717-2.025-4.71-2.02-8.183l-.001-3.757.06-3.93-.021-3.93c.065-9.564.065-9.564 1.748-11.725 2.953-2.322 6.607-1.77 10.211-1.743Z"
        />
        <path
          fill="#F8C849"
          d="M244.367 251.734c5.057 1.762 8.024 4.768 11.758 8.516l2.09 2.027a418.736 418.736 0 0 1 3.988 3.933c1.11 1.106 2.233 2.2 3.375 3.273 2.502 2.369 3.386 3.359 4.172 6.83-1.656 8.143-9.57 13.618-15.75 18.687l-2.074 1.77c-3.112 2.53-5.19 4.088-9.176 4.855-3.38-.768-4.616-1.938-6.75-4.625-2.48-4.96-1.355-12.595-1.405-18.112-.022-1.795-.056-3.59-.103-5.385-.067-2.592-.094-5.18-.113-7.773l-.084-2.421c.02-5.415.02-5.415 1.965-7.952 2.73-2.413 4.454-3.334 8.107-3.623Z"
        />
        <path
          fill="#F7C849"
          d="M171.813 251.813c3.567 1.329 4.92 2.147 7.187 5.187.398 2.97.561 5.56.531 8.527l.012 2.503c.003 1.744-.005 3.488-.022 5.232-.02 2.663 0 5.323.026 7.986-.003 1.697-.008 3.395-.016 5.092l.025 2.402c-.066 3.885-.296 5.84-2.394 9.217C175 300 175 300 171.875 301.312c-6.196-.5-9.398-4.247-13.875-8.312a844.915 844.915 0 0 0-3.531-2.926c-1.2-1.023-2.398-2.047-3.594-3.074l-1.76-1.434c-2.218-1.97-3.93-3.675-4.545-6.637-.097-3.591.106-5.522 2.368-8.366L150 268c1.424-1.451 2.84-2.91 4.25-4.375 11.637-11.521 11.637-11.521 17.563-11.813Z"
        />
        <path
          fill="#F8C949"
          d="M206.25 210.313c7.534 1.38 12.333 8.057 17.074 13.714a75.216 75.216 0 0 0 3.446 3.79c2.881 3.016 4.121 4.61 4.917 8.808-.892 4.38-2.163 5.65-5.687 8.375-2.967.709-5.84.678-8.879.629l-2.573.007c-1.79 0-3.579-.014-5.368-.04-2.738-.033-5.472-.02-8.21 0a1560.58 1560.58 0 0 1-5.224-.03l-2.475.015c-3.59-.074-5.82-.254-8.767-2.39-1.788-2.605-2.368-4.748-2.215-7.918 1.587-5.073 6.048-8.598 9.711-12.273a323.11 323.11 0 0 0 3.813-4.375l1.707-1.93A126.473 126.473 0 0 0 201 212.5c2-1.5 2-1.5 5.25-2.188ZM195.746 307.469l2.57-.012c1.791-.003 3.583.005 5.374.022 2.735.02 5.467 0 8.203-.026 1.742.003 3.485.008 5.228.016l2.469-.025c3.916.065 5.987.305 9.426 2.347C231 312 231 312 231.625 315.879c-.3 4.493-2.456 7.04-5.625 10.058-1.01 1.026-2.019 2.052-3.027 3.079l-1.523 1.513c-2.104 2.134-4.053 4.393-6.012 6.659-2.857 3.295-4.177 4.585-8.563 5.375-5.791-.841-8.16-4.27-11.875-8.563l-1.887-2.102a224.768 224.768 0 0 1-3.504-4.03 65.14 65.14 0 0 0-3.156-3.423c-2.636-2.74-3.809-4.832-4.016-8.57C183 312 183 312 184.49 309.791c3.595-2.564 7.002-2.364 11.257-2.322Z"
        />
      </svg>
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
