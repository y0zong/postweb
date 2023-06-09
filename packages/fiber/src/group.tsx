import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import cn from "clsx"

const buttonVariants = cva(
  "inline-flex [&>*:not(:first-child)]:ml-[-1px] [&>*:first-child:not(:last-child)]:rounded-r-none [&>*:not(:first-child,:last-child)]:rounded-none [&>*:last-child:not(:first-child)]:rounded-l-none",
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

const Group = React.forwardRef<HTMLDivElement, ButtonProps>(
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
Group.displayName = "Group"

export { Group, buttonVariants }
