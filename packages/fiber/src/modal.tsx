import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import cn from "clsx"

const buttonVariants = cva(
  "émodal drop-shadow bg-app z-modal bg-opacity-40 backdrop-blur-lg rounded overflow-hidden",
  {
    variants: {
      intent: { default: "", primary: "", verified: "", warning: "", danger: "" },
    },
    defaultVariants: {
      intent: "default"
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Modal = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, intent, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(buttonVariants({ intent }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Modal.displayName = "Modal"

export { Modal }
