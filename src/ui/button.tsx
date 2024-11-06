import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils/utils";
import { ReactNode, forwardRef } from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex capitalize items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        iconOnly: "",
        icon: "",
        base: "bg-primary-btn rounded-lg px-4 py-2 text-white font-medium",
        outline:
          "bg-black px-4 py-2 before:absolute before:h-[calc(100%-2px)] before:w-[calc(100%-2px)] bg-gradient-linear-primary before:bg-white relative rounded-full z-[10] before:rounded-full before:-z-[1] disabled:bg-none",
        ghost: "",
      },
      size: {
        sm: "",
        md: "h-[2.8rem] text-base",
        lg: "p-2 h-[3rem]",
      },
    },
    defaultVariants: {
      variant: "base",
      size: "md",
    },
  },
);

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode;
  className?: string;
  isLoading?: boolean;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      className,
      isLoading,
      variant,
      size,
      endIcon,
      startIcon,
      asChild,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        disabled={isLoading}
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <span className="text-lg">{startIcon && startIcon}</span>
        <Slottable>{isLoading ? <Spinner size="20px" /> : children}</Slottable>
        <span className="text-lg">{endIcon && endIcon}</span>
      </Comp>
    );
  },
);

Button.displayName = "Button";
export { Button };
