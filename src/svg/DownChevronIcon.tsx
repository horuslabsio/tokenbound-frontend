const DownChevronIcon = ({
  height = "1.2em",
  width = "1.2em",
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
        fill="currentColor"
        d="M5.22 8.22a.749.749 0 0 0 0 1.06l6.25 6.25a.749.749 0 0 0 1.06 0l6.25-6.25a.749.749 0 1 0-1.06-1.06L12 13.939L6.28 8.22a.749.749 0 0 0-1.06 0"
      />
    </svg>
  );
};

export default DownChevronIcon;
