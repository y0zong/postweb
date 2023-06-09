import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import cn from "clsx"

export const inputVariants = cva(
  "éinput inline-flex bg-input w-full items-center relative rounded outline-none",
  {
    variants: {
      intent: {
        default: "",
        verified: "focus-within:shadow-[0_0_0_0_transparent,0_0_0_0_transparent,inset_0_0_0_1px_rgb(var(--green-2)),inset_0_0_0_1px_rgb(var(--black)/.2),_inset_0_1px_1px_rgb(var(--black)/.5)]",
        warning: "focus-within:shadow-[0_0_0_0_transparent,0_0_0_0_transparent,inset_0_0_0_1px_rgb(var(--orange-2)),inset_0_0_0_1px_rgb(var(--black)/.2),_inset_0_1px_1px_rgb(var(--black)/.5)]",
        danger: "focus-within:shadow-[0_0_0_0_transparent,0_0_0_0_transparent,inset_0_0_0_1px_rgb(var(--red-2)),inset_0_0_0_1px_rgb(var(--black)/.2),_inset_0_1px_1px_rgb(var(--black)/.5)]"
      },
      dsize: { default: "h-md leading-md", sm: "h-sm leading-sm", lg: "h-lg leading-lg" },
    },
    defaultVariants: {
      intent: "default",
      dsize: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps & { prefix?: React.ReactElement, suffix?: JSX.Element }>(
  ({ className, intent, dsize, type, prefix, suffix, ...props }, ref) => {
    const isMiddle = dsize === "default" || dsize === undefined
    const isSmall = dsize === "sm"
    const isLarge = dsize === "lg"
    const sidecn = cn("h-full flex items-center justify-center", isSmall ? "p-[.125rem]" : "p-v")
    return (
      <div
      ref={ref}
        className={cn(inputVariants({ intent, dsize }), {
          "pl-2": !prefix && isSmall,
          "pl-2v": !prefix && !isSmall,
          "pr-2": !suffix && isSmall,
          "pr-2v": !suffix && !isSmall,
        }, className)}
      >
        {prefix && <span aria-hidden="true" tabIndex={-1} className={sidecn}>{prefix}</span>}
        <input className="bg-transparent flex-1 outline-none w-full" type={type} {...props} />
        {suffix && <span aria-hidden="true" tabIndex={-1} className={sidecn}>{suffix}</span>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
