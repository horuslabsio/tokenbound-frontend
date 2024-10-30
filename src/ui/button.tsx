import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils/utils";
import { ReactNode, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center  gap-2 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        fill: "rounded-[8px] bg-deep-blue text-white",
        "border-thin":
          "text-deep-blue border-deep-blue border rounded-[5px] hover:bg-[#0C0C4F20]",
        "border-bold":
          "text-deep-blue border-deep-blue border-[2px] rounded-[5px] hover:bg-[#0C0C4F20]",
        outline:
          "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 rounded-[6px]",
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
  }
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
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
