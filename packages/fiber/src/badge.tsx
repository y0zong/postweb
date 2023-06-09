import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import cn from "clsx"

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 text-xs whitespace-nowrap overflow-hidden text-ellipsis",
  {
    variants: {
      intent: {
        default: "bg-tag text-tag-text",
        primary: "bg-primary text-tag-text",
        verified: "bg-green-2 text-tag-text",
        warning: "bg-orange-4 text-black",
        danger: "bg-red-2 text-tag-text"
      }
    },
    defaultVariants: {
      intent: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { round?: boolean }

function Badge({ className, intent, round, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ intent }), round ? "rounded-full" : "rounded", className)} {...props} />
  )
}

export { Badge, badgeVariants }
