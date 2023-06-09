import { Column } from "@tanstack/react-table"
import { Check, LucideIcon } from "lucide-react"
import cn from "clsx"
import { Badge } from "../badge"
import { Button } from "../button"
import * as Command from "../command"
import * as Popover from "../popover"
import { Separator } from "../separator"
import { Modal } from "../modal"

interface DataTableFacetedFilter<TData, TValue> {
    column?: Column<TData, TValue>
    title?: string
    icon?: LucideIcon
    options: {
        label: string
        value: string
        icon?: LucideIcon
    }[]
}

export function DataTableFacetedFilter<TData, TValue>({
    column,
    title,
    icon,
    options,
}: DataTableFacetedFilter<TData, TValue>) {
    const facets = column?.getFacetedUniqueValues()
    const selectedValues = new Set(column?.getFilterValue() as string[])
    const Ficon = icon
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button variant="outline" className="h-8 border-dashed">
                    {Ficon && <Ficon className="mr-2 h-4 w-4" />}
                    {title}
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter(({ label, value }) => selectedValues.has(value))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </Popover.Trigger>
            <Modal asChild>
                <Popover.Content className="w-[200px] p-0" align="start">
                    <Command.Root>
                        <Command.Input placeholder={title} />
                        <Command.List>
                            <Command.Empty>No results found.</Command.Empty>
                            <Command.Group>
                                {options.map(({ icon, value, label }) => {
                                    const isSelected = selectedValues.has(value)
                                    const Icon = icon
                                    return (
                                        <Command.Item
                                            key={value}
                                            onSelect={() => {
                                                if (isSelected) {
                                                    selectedValues.delete(value)
                                                } else {
                                                    selectedValues.add(value)
                                                }
                                                const filterValues = Array.from(selectedValues)
                                                column?.setFilterValue(
                                                    filterValues.length ? filterValues : undefined
                                                )
                                            }}
                                        >
                                            <div
                                                className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50 [&_svg]:invisible"
                                                )}
                                            >
                                                <Check className={cn("h-4 w-4")} />
                                            </div>
                                            {Icon && (
                                                <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                            )}
                                            <span>{label}</span>
                                            {facets?.get(value) && (
                                                <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                                    {facets.get(value)}
                                                </span>
                                            )}
                                        </Command.Item>
                                    )
                                })}
                            </Command.Group>
                            {selectedValues.size > 0 && (
                                <>
                                    <Command.Separator />
                                    <Command.Group>
                                        <Command.Item
                                            onSelect={() => column?.setFilterValue(undefined)}
                                            className="justify-center text-center"
                                        >
                                            Clear filters
                                        </Command.Item>
                                    </Command.Group>
                                </>
                            )}
                        </Command.List>
                    </Command.Root>
                </Popover.Content>
            </Modal>
        </Popover.Root>
    )
}