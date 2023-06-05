import * as React from "react"
import { Search as SearchIcon } from "lucide-react"
import { InputProps, inputVariants } from "../input"
import { Key } from "../key"
import { Loading } from "../loading"
import cn from "clsx"

const Search = React.forwardRef<HTMLInputElement, InputProps & { onEnter: (str: string) => Promise<any> }>(
    ({ className, onEnter, dsize, variant, ...props }, ref) => {
        const [pending, setPending] = React.useState(false)
        return (
            <div className={cn(inputVariants({ variant, dsize }), "p-0 items-center", className)}>
                <SearchIcon className="w-5 h-5 mx-2 stroke-secondary-foreground" />
                <input className="outline-none h-full w-full" type="text" {...props} disabled={pending} onKeyUp={async evt => {
                    const target = evt.target as HTMLInputElement
                    if (evt.key === "Enter") {
                        setPending(true)
                        await onEnter(target.value)
                        setPending(false)
                    }
                }} />
                <Key className="mx-2">{pending ? <Loading className="mx-2" /> : "Enter"}</Key>
            </div>
        )
    }
)
Search.displayName = "Search"

export { Search }
