import * as React from "react"
import cn from "clsx"

const Key = React.forwardRef<HTMLElement, any>(
  ({ className, ...props }, ref) => {
    return (
      <kbd
        className={cn("h-5 rounded bg-secondary border border-muted-foreground-1 shadow-kbd cursor-default text-[0.75em] leading-normal block text-center py-[2px] px-[5px] relative top-[-2px]", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Key.displayName = "Key"

export { Key }
