"use client"

import * as React from "react"
import * as Primitive from "@radix-ui/react-popover"
import cn from "clsx"

const Root = Primitive.Root
const Trigger = Primitive.Trigger

const Content = React.forwardRef<
  React.ElementRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content> & { container?: HTMLElement | null }
>(({ className, align = "center", sideOffset = 4, container, ...props }, ref) => (
  <Primitive.Portal container={container}>
    <Primitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </Primitive.Portal>
))
Content.displayName = Primitive.Content.displayName

export { Root, Trigger, Content }
