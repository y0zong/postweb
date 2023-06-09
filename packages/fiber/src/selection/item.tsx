"use client"

import * as React from "react"
import * as Primitive from "@radix-ui/react-select"
import { ChevronUp, ChevronDown, Check } from "lucide-react"
import { Button } from "../button"
import { Modal } from "../modal"
import cn from "clsx"

const Item = React.forwardRef<HTMLInputElement, Primitive.SelectItemProps & Item & { className?: string, itemRender: (item: Item) => React.ReactElement }>(({ className, itemRender, ...props }, ref) => {
    if (itemRender) return itemRender(props)
    return (
        <Primitive.Item
            className={cn(
                'leading-none px-3 py-1 text-violet11 rounded flex items-center justify-between relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:text-white data-[highlighted]:bg-primary',
                className
            )}
            {...props}
            ref={ref}
        >
            <Primitive.ItemText>{props.label || props.value}</Primitive.ItemText>
            <Primitive.ItemIndicator asChild>
                <svg className="w-4 h-4 stroke-tag" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </Primitive.ItemIndicator>
        </Primitive.Item>
    );
});

type Item = {
    label?: string
    group?: [{ value: any, label?: string, [x: string]: any }]
    [x: string]: any
}
export interface SelectProps extends Primitive.SelectProps {
    fetcher?: (arg?: any) => Promise<any[] | null>
    formater?: (data: any) => Item
    placeholder?: string
    suffix?: React.ReactElement | string
    icon?: React.ReactElement
    items?: Item[]
    itemRender?: (item: Item) => React.ReactElement
}

export function ItemsSelect({ suffix, fetcher, formater, itemRender, placeholder, icon, defaultValue, items, ...props }: SelectProps) {
    const [records, setItems] = React.useState<Item[] | undefined>(items)
    React.useEffect(() => {
        fetcher?.().then(data => data && (formater ? setItems(data.map(d => formater(d))) : setItems(data)))
    }, [])
    console.log(defaultValue)
    return <Primitive.Root {...props}>
        <Primitive.Trigger asChild>
            <Button className="relative">
                <Primitive.Value placeholder={placeholder} />
                <Primitive.Icon className="text-violet11 flex items-center whitespace-nowrap">
                    {suffix && <span className="ml-2">{suffix}</span>}
                    {icon || <svg className="w-4 h-4 stroke-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" /></svg>}
                </Primitive.Icon>
            </Button>
        </Primitive.Trigger>
        <Primitive.Portal>
            <Modal asChild className="z-postwin">
                <Primitive.Content position="popper">
                    <Primitive.Viewport className="min-w-[var(--radix-select-trigger-width)] space-y-2 p-2">
                        {records?.map(r => r.group ? <Primitive.Group>
                            {r.label && <Primitive.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                                {r.label}
                            </Primitive.Label>}
                            {r.group.map(node => <Item {...node} render={itemRender} />)}
                        </Primitive.Group> : <Item {...r} render={itemRender} />)}
                    </Primitive.Viewport>
                </Primitive.Content>
            </Modal>
        </Primitive.Portal>
    </Primitive.Root>
}