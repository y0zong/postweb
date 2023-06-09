"use client"

import * as React from "react"
import * as Primitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import cn from "clsx"
import { Slot } from "@radix-ui/react-slot"

const Provider = Primitives.Provider
const Description = Primitives.Description
const Title = Primitives.Title

const Viewport = React.forwardRef<
  React.ElementRef<typeof Primitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof Primitives.Viewport>
>(({ className, ...props }, ref) => (
  <Primitives.Viewport
    ref={ref}
    className={cn(
      "notice fixed top-0 z-[100] gap-3 flex max-h-screen w-full mx-5 border-b-[2.5rem] border-transparent flex-col-reverse sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col-reverse max-md:w-[calc(100%-2rem)] md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
Viewport.displayName = Primitives.Viewport.displayName

const toastVariants = cva(
  "data-[swipe=move]:transition-none shadow-border-toast pr-v relative pointer-events-auto flex items-start w-full overflow-hidden rounded transition-all max-sm:top-5 md:bottom-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full",
  {
    variants: {
      intent: {
        default: "",
        verified: "text-white bg-green-2",
        warning: "text-white bg-orange-2",
        danger: "text-white bg-red-2"
      }
    },
    defaultVariants: {
      intent: "default",
    },
  }
)

const Root = React.forwardRef<
  React.ElementRef<typeof Primitives.Root>,
  React.ComponentPropsWithoutRef<typeof Primitives.Root> &
  VariantProps<typeof toastVariants>
>(({ className, intent, ...props }, ref) => {
  return (
    <Primitives.Root
      ref={ref}
      className={cn(toastVariants({ intent }), className)}
      {...props}
    />
  )
})
Root.displayName = Primitives.Root.displayName

const actionVariants = cva(
  "mt-v py-v px-2v flex justify-center items-center h-6v rounded",
  {
    variants: {
      intent: {
        default: "",
        primary: "",
        verified: "hover:bg-green-1 active:bg-green",
        warning: "hover:bg-orange-1 active:bg-orange",
        danger: "hover:bg-red-1 active:bg-red"
      },
    },
    defaultVariants: { intent: "default" },
  }
)

interface ActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof actionVariants> {
  asChild?: boolean
}
const Action = React.forwardRef<HTMLButtonElement, ActionProps>(
  ({ className, intent, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(actionVariants({ intent, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Action.displayName = "Action"

const Close = React.forwardRef<
  React.ElementRef<typeof Primitives.Close>,
  React.ComponentPropsWithoutRef<typeof Primitives.Close>
>(({ className, ...props }, ref) => (
  <Primitives.Close
    ref={ref}
    className={className}
    toast-close=""
    {...props}
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <line x1="18" x2="6" y1="6" y2="18"></line>
      <line x1="6" x2="18" y1="6" y2="18"></line>
    </svg>
  </Primitives.Close>
))
Close.displayName = Primitives.Close.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Root>
type ToastActionElement = React.ReactElement<typeof Action>

export {
  type ToastProps,
  type ToastActionElement,
  Provider,
  Viewport,
  Root,
  Title,
  Description,
  Close,
  Action,
}