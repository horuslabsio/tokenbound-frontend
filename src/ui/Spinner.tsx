export const Spinner = ({
  size = "28px",
  color = "currentColor",
}: {
  size?: string;
  color?: string;
}) => {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderBottomColor: "transparent",
      }}
      className="mx-auto inline-block animate-spin rounded-full border-2"
      aria-label="Loading"
    ></span>
  );
};
