"use client"

import * as React from "react"
import * as Primitive from "@radix-ui/react-scroll-area"
import cn from "clsx"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  React.ComponentPropsWithoutRef<typeof Primitive.Root>
>(({ className, children, ...props }, ref) => (
  <Primitive.Root scrollHideDelay={100} className={cn("overflow-hidden", className)}>
    <Primitive.Viewport className="w-full h-full">
      {children}
    </Primitive.Viewport>
    <Primitive.Scrollbar
      className="flex z-10 select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <Primitive.Thumb className="flex-1 bg-gray rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </Primitive.Scrollbar>
    <Primitive.Scrollbar
      className="flex z-10 select-none touch-none p-0.5 bg-blackA6 transition-colors duration-[160ms] ease-out hover:bg-blackA8 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="horizontal"
    >
      <Primitive.Thumb className="flex-1 bg-gray rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </Primitive.Scrollbar>
    <Primitive.Corner className="bg-blackA8" />
  </Primitive.Root>
))
ScrollArea.displayName = Primitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof Primitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof Primitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <Primitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
      "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
      "h-2.5 border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <Primitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </Primitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = Primitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
