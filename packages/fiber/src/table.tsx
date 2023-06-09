import * as React from "react"
import cn from "clsx"

const Root = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full flex-1 caption-bottom text-sm", className)}
    {...props}
  />
))
Root.displayName = "Table"

const Header = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("backdrop-blur-lg bg-app-third bg-opacity-90", className)} {...props} />
))
Header.displayName = "Header"

const Body = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:hover]:!bg-table-border [&_tr:nth-of-type(even)]:bg-btn-active",className)}
    {...props}
  />
))
Body.displayName = "Body"

const Footer = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-primary font-medium text-primary-foreground", className)}
    {...props}
  />
))
Footer.displayName = "Footer"

const Row = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("data-[state=selected]:bg-table-border",className)}
    {...props}
  />
))
Row.displayName = "Row"

const Head = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap [&:first-of-type]:ml-4",
      className
    )}
    {...props}
  />
))
Head.displayName = "Head"

const Cell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-4 py-1 align-middle", className)}
    {...props}
  />
))
Cell.displayName = "Cell"

const Caption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
Caption.displayName = "Caption"

export const Table = {
  Root,
  Header,
  Body,
  Footer,
  Head,
  Row,
  Cell,
  Caption,
}
