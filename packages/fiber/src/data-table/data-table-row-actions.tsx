"use client"

import React from "react"
import { Row } from "@tanstack/react-table"
import { Copy, MoreHorizontal, Pen, Star, Tags, Trash } from "lucide-react"
import { Button } from "../button"
import * as DropdownMenu from "../dropdown-menu"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end" className="w-[160px]">
                <DropdownMenu.Item>
                    <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Edit
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Make a copy
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    <Star className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Favorite
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>
                        <Tags className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Labels
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                        {/* <DropdownMenu.RadioGroup value={task.label}>
                            {labels.map((label) => (
                                <DropdownMenu.RadioItem key={label.value} value={label.value}>
                                    {label.label}
                                </DropdownMenu.RadioItem>
                            ))}
                        </DropdownMenu.RadioGroup> */}
                    </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                    <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Delete
                    <DropdownMenu.Shortcut>⌘⌫</DropdownMenu.Shortcut>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}