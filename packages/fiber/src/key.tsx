import * as React from "react"
import cn from "clsx"

const Key = React.forwardRef<HTMLElement, any>(
  ({ className, ...props }, ref) => {
    return (
      <kbd
        className={cn("h-5 rounded border border-b-2 border-gray px-1 cursor-default text-xs text-icon leading-normal block text-center", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Key.displayName = "Key"

export { Key }
