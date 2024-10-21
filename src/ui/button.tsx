import { VariantProps, cva } from "class-variance-authority";
import { ReactNode, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        fill: "rounded-[6px] bg-deep-blue text-white",
        "border-thin":
          "text-deep-blue border-deep-blue border rounded-[5px] hover:bg-[#0C0C4F20]",
        "border-bold":
          "text-deep-blue border-deep-blue border-[2px] rounded-[5px] hover:bg-[#0C0C4F20]",
        ghost: "",
      },
      size: {
        sm: "py-1 px-2 text-sm ",
        md: "px-4 py-3 text-sm ",
        lg: "p-2 h-[3rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "fill",
      size: "md",
    },
  },
);

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
