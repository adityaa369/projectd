import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-2xl bg-card text-base transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border border-input shadow-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        search: "border-0 shadow-card focus-visible:shadow-elevated",
        pill: "border border-border bg-secondary/50 focus-visible:bg-card focus-visible:border-primary",
      },
      inputSize: {
        default: "h-12 px-4 py-3",
        lg: "h-14 px-5 py-4 text-base",
        sm: "h-10 px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
