const CopyCheckIcon = ({
  copied = true,
  width = "1.8em",
  height = "1.8em",
}: {
  copied?: boolean;
  width?: string;
  height?: string;
}) => {
  return (
    <svg
      style={{
        strokeDasharray: 200,
        strokeDashoffset: copied ? 0 : 200,
        transition: "stroke-dashoffset 2s ease-in-out",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
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

export default CopyCheckIcon;
