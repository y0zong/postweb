import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import cn from "clsx"

const dotVariants = cva(
    "inline-block animate-loading-dot fill-mode-both",
    {
        variants: {
            variant: {
                default: "bg-primary-foreground",
                destructive:
                    "bg-destructive-foreground",
                outline:
                    "hover:bg-accent hover:bg-accent-foreground",
                secondary:
                    "bg-secondary-foreground",
                ghost: "hover:bg-accent-foreground",
            },
            size: {
                default: "w-1 h-1 rounded mx-[2px]",
                sm: "w-1 h-1 rounded mx-[2px]",
                lg: "w-1 h-1 rounded mx-[2px]",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface LoadingProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof dotVariants> {
    asChild?: boolean
}

const Loading = React.forwardRef<HTMLInputElement, LoadingProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <section
                className={cn(
                    "flex justify-center items-center",
                    className
                )}
                ref={ref}
                {...props}
            >
                <span className={cn(dotVariants({ variant, size }))} />
                <span className={cn(dotVariants({ variant, size }), "delay-200")} />
                <span className={cn(dotVariants({ variant, size }), "delay-400")} />
            </section>
        )
    }
)
Loading.displayName = "Loading"

export { Loading }
