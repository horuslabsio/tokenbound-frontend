const CheckedIcon = ({
  width = "5em",
  height = "5em",
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m5 12l5 5L20 7"
      />
    </svg>
  );
};

export default CheckedIcon;
