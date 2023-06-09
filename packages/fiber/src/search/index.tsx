import * as React from "react"
import { InputProps, Input } from "../input"
import { Key } from "../key"
import { Loading } from "../loading"
import { Icon, type IconData } from "../icon"

const search: IconData = [["circle", "11", "11", "8"], ["path", "m21 21-4.3-4.3"]]
const Search = React.forwardRef<HTMLInputElement, InputProps & { onEnter?: (str: string) => Promise<any>, enter?: string }>(
    ({ className, onEnter, enter, dsize, ...props }, ref) => {
        const [pending, setPending] = React.useState(false)
        return (
            <Input
                disabled={pending}
                prefix={<Icon data={search} />}
                suffix={<Key>{pending ? <Loading /> : enter || "Enter"}</Key>}
                onKeyUp={async evt => {
                    const target = evt.target as HTMLInputElement
                    if (evt.key === "Enter") {
                        setPending(true)
                        await onEnter?.(target.value)
                        setPending(false)
                    }
                }}
                {...props}
            />
        )
    }
)
Search.displayName = "Search"

export { Search }
