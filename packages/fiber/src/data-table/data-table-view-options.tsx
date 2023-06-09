"use client"

import { Table } from "@tanstack/react-table"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "../button"
import { Modal } from "../modal"
import { Root, Trigger, Content, Label, Separator, CheckboxItem } from "../dropdown-menu"

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>
}

export function DataTableViewOptions<TData>({
    table,
}: DataTableViewOptionsProps<TData>) {
    return (
        <Root>
            <Trigger asChild>
                <Button
                    variant="outline"
                    className="ml-auto hidden h-8 lg:flex"
                >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    View
                </Button>
            </Trigger>
            <Modal asChild>
                <Content align="end">
                    <Label>Toggle columns</Label>
                    <Separator />
                    {table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== "undefined" && column.getCanHide()
                        )
                        .map((column) => {
                            return (
                                <CheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </CheckboxItem>
                            )
                        })}
                </Content>
            </Modal>
        </Root>
    )
}