"use client"

import * as React from "react"
import {
    ColumnDef,
    FilterFn,
    FilterFns,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type Table as TableType,
    CellContext
} from "@tanstack/react-table"
import { DataTablePagination, DataTablePaginationProps } from "./data-table-pagination"
import { DataTableToolbar, SearchType } from "./data-table-toolbar"
import cn from "clsx"
import { LucideIcon } from "lucide-react"
import { Checkbox, ScrollArea, Table } from "@postweb/fiber"

interface DataTableProps<TData, TValue> {
    className: string
    columns: ColumnDef<TData, TValue>[] | undefined | null
    data: TData[] | undefined | null
    actions?: (table: TableType<TData>) => React.ReactElement[]
    toolbar?: (table: TableType<TData>) => React.ReactElement[]
    filterFns?: Record<keyof FilterFns, FilterFn<any>>
    filters?: Map<string, {
        options: { icon?: LucideIcon, value: string, label: string }[]
        icon?: LucideIcon
        title: string
    }>
    pagination?: Omit<DataTablePaginationProps<TData>, "table">
    search?: SearchType
}

export type CustomFilterFn = Record<keyof FilterFns, FilterFn<any>>

export function DataTable<TData, TValue>({
    className,
    columns,
    actions,
    toolbar,
    filterFns,
    filters,
    pagination,
    search,
    data,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])

    columns?.unshift({
        accessorKey: "select",
        enableSorting: false,
        enableHiding: false,
        header: ({ table }) =>
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={table.getIsSomeRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ,
        cell: ({ row }: CellContext<any, any>) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    })
    const table = useReactTable({
        data: data || [],
        columns: columns || [],
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        // @ts-ignore
        filterFns,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues()
    })

    return (
        <div className={cn("space-y-4 flex flex-col", className)}>
            <DataTableToolbar table={table} items={actions} more={toolbar} filters={filters} search={search} />
            <ScrollArea className="flex-1 bg-app-third rounded">
                <Table.Root className="étable">
                    <Table.Header className="top-0 z-10 sticky">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Table.Row key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Table.Head key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </Table.Head>
                                    )
                                })}
                            </Table.Row>
                        ))}
                    </Table.Header>
                    <Table.Body>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <Table.Row
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <Table.Cell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell
                                    colSpan={columns?.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Root>
            </ScrollArea>
            <DataTablePagination table={table} {...pagination} />
        </div>
    )
}