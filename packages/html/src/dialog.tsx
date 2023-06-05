"use client"

import * as React from "react"
import * as Primitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import cn from "clsx"

const Root = Primitive.Root
const Trigger = Primitive.Trigger
const Portal = Primitive.Portal
const Close = Primitive.Close

const Overlay = React.forwardRef<
  React.ElementRef<typeof Primitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof Primitive.Overlay>
>(({ className, ...props }, ref) => (
  <Primitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
      className
    )}
    {...props}
  />
))
Overlay.displayName = Primitive.Overlay.displayName

const Content = React.forwardRef<
  React.ElementRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content> & { close?: boolean }
>(({ className, close, children, ...props }, ref) => (
  <Portal>
    <Overlay />
    <Primitive.Content
      ref={ref}
      className={cn(
        "fixed overflow-hidden left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-h-[calc(100%+1rem)] py-2 z-50 flex flex-col gap-4 rounded-lg border bg-background shadow-lg animate-raise-with-scale",
        className
      )}
      {...props}
    >
      {children}
      {close && <Primitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Primitive.Close>}
    </Primitive.Content>
  </Portal>
))
Content.displayName = Primitive.Content.displayName

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center px-6 pt-4 space-x-1.5",
      className
    )}
    {...props}
  />
)
Header.displayName = "DialogHeader"

const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-end space-x-4 px-6 pb-4", className)}{...props} />
)
Footer.displayName = "DialogFooter"

const Title = React.forwardRef<
  React.ElementRef<typeof Primitive.Title>,
  React.ComponentPropsWithoutRef<typeof Primitive.Title>
>(({ className, ...props }, ref) => (
  <Primitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
Title.displayName = Primitive.Title.displayName

const Description = React.forwardRef<
  React.ElementRef<typeof Primitive.Description>,
  React.ComponentPropsWithoutRef<typeof Primitive.Description>
>(({ className, ...props }, ref) => (
  <Primitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
Description.displayName = Primitive.Description.displayName

export {
  Root,
  Close,
  Trigger,
  Content,
  Header,
  Footer,
  Title,
  Description,
}
