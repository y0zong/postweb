"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import cn from "clsx"
import { Button } from "./button"
import * as Command from "./command"
import * as Popover from "./popover"

export type ComboboxItem = { value: any, label: string, [x: string]: any }
export interface ComboboxProps {
    fetcher?: (arg?: any) => Promise<any[] | null>
    formater?: (data: any) => ComboboxItem
    items?: ComboboxItem[]
    value?: any
    render?: (value: ComboboxItem[]) => React.ReactElement
    empty?: string | React.ReactElement
    search?: string
}

export function Combobox({ fetcher, value, items, render, formater, onChange, empty, search, children }: ComboboxProps & { children?: string | React.ReactElement, onChange: (arg: any) => void }) {
    const [open, setOpen] = React.useState(false)
    const [val, setValue] = React.useState(value)
    const [records, setItems] = React.useState(items || [])

    React.useEffect(() => {
        fetcher?.().then(data => data && (formater ? setItems(data.map(d => formater(d))) : setItems(data)))
    }, [])
    console.log(val, records)
    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {val
                        ? records.find(({ value }) => value === val)?.label
                        : children}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </Popover.Trigger>
            <Popover.Content className="w-[200px] p-0">
                <Command.Root>
                    <Command.Input placeholder={search} autoFocus />
                    {empty && <Command.Empty>{empty}</Command.Empty>}
                    <Command.Group>
                        {render ? render(records) :
                            records.map(({ value, label }) => (
                                <Command.Item
                                    key={value}
                                    onSelect={() => {
                                        onChange(value)
                                        setValue(value)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            val === value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {label}
                                </Command.Item>
                            ))}
                    </Command.Group>
                </Command.Root>
            </Popover.Content>
        </Popover.Root>
    )
}
