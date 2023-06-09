import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import cn from "clsx"

const buttonVariants = cva(
  "inline-flex items-center rounded whitespace-nowrap",
  {
    variants: {
      intent: { default: "", primary: "", verified: "", warning: "", danger: "" },
      variant: { default: "", secondary: "", outline: "", ghost: "", link: "" },
      align: { default: "justify-center", left: "justify-start", right: "justify-end" },
      size: {
        default: "h-md leading-md py-v px-2v text-sm",
        sm: "h-sm leading-sm px-[.4375rem] text-sm",
        lg: "h-lg leading-lg py-v px-3v",
      },
    },
    compoundVariants: [
      { intent: "default", variant: "default", className: "ébtn bg-btn hover:bg-btn-hover active:bg-btn-active" },
      { intent: "default", variant: "secondary", className: "bg-btn-hover hover:bg-gray-2 hover:bg-opacity-15 active:bg-opacity-30" },
      { intent: "default", variant: "outline", className: "border border-gray border-opacity-60 hover:bg-gray-2 hover:bg-opacity-15 active:bg-opacity-30" },
      { intent: "default", variant: "ghost", className: "hover:bg-gray hover:bg-opacity-15 active:bg-gray active:bg-opacity-30" },

      { intent: "primary", variant: "default", className: "ébtn bg-primary-2 text-white hover:bg-primary-1 active:bg-primary" },
      { intent: "primary", variant: "secondary", className: "bg-primary-2 bg-opacity-15 text-primary-1 active:bg-opacity-30" },
      { intent: "primary", variant: "outline", className: "text-primary-1 border border-primary-1 border-opacity-60 hover:bg-primary-2 hover:bg-opacity-15 active:bg-opacity-30" },
      { intent: "primary", variant: "ghost", className: "text-primary-1 hover:bg-primary-2 hover:bg-opacity-15 active:bg-primary-2 active:bg-opacity-30" },

      { intent: "verified", variant: "default", className: "ébtn bg-green-2 text-white hover:bg-green-1 active:bg-green" },
      { intent: "verified", variant: "secondary", className: "bg-green-2 bg-opacity-15 text-green-1 active:bg-opacity-30" },
      { intent: "verified", variant: "outline", className: "text-green-1 border border-green-1 border-opacity-60 hover:bg-green-2 hover:bg-opacity-15 active:bg-opacity-30" },
      { intent: "verified", variant: "ghost", className: "text-green-1 hover:bg-green-2 hover:bg-opacity-15 active:bg-green-2 active:bg-opacity-30" },

      { intent: "warning", variant: "default", className: "ébtn bg-orange-4 hover:bg-orange-3 active:bg-orange-2" },
      { intent: "warning", variant: "secondary", className: "bg-orange-2 bg-opacity-15 text-orange-1 active:bg-opacity-30" },
      { intent: "warning", variant: "outline", className: "text-orange-1 border border-orange-1 border-opacity-60 hover:bg-orange-2 hover:bg-opacity-15 active:bg-opacity-30" },
      { intent: "warning", variant: "ghost", className: "text-orange-1 hover:bg-orange-2 hover:bg-opacity-15 active:bg-grange-2 active:bg-opacity-30" },

      { intent: "danger", variant: "default", className: "ébtn bg-red-2 text-white hover:bg-red-1 active:bg-red" },
      { intent: "danger", variant: "secondary", className: "bg-red-2 bg-opacity-15 text-red-1 active:bg-opacity-30" },
      { intent: "danger", variant: "outline", className: "text-red-1 border border-red-1 border-opacity-60 hover:bg-red-2 hover:bg-opacity-15 active:bg-opacity-30" },
      { intent: "danger", variant: "ghost", className: "text-red-1 hover:bg-red-2 hover:bg-opacity-15 active:bg-red-2 active:bg-opacity-30" }
    ],
    defaultVariants: {
      intent: "default",
      variant: "default",
      align: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, intent, align, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, align, intent, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
