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
    Table,
    CellContext
} from "@tanstack/react-table"
import * as TableUI from "@postweb/html"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import cn from "clsx"
import { LucideIcon } from "lucide-react"
import { Checkbox } from "@postweb/html"

interface DataTableProps<TData, TValue> {
    className: string
    columns: ColumnDef<TData, TValue>[] | undefined | null
    data: TData[] | undefined | null
    actions?: (table: Table<TData>) => React.ReactElement[]
    toolbar?: (table: Table<TData>) => React.ReactElement[]
    filterFns?: Record<keyof FilterFns, FilterFn<any>>
    searchFnc: (str: string) => Promise<any>
    filters?: Map<string, {
        options: { icon?: LucideIcon, value: string, label: string }[],
        icon?: LucideIcon
        title: string
    }>
}

export type CustomFilterFn = Record<keyof FilterFns, FilterFn<any>>

export function DataTable<TData, TValue>({
    className,
    columns,
    actions,
    toolbar,
    filterFns,
    searchFnc,
    filters,
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
                className="translate-y-[2px]"
            />
        ,
        cell: ({ row }: CellContext<any, any>) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
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
            <DataTableToolbar table={table} items={actions} more={toolbar} filters={filters} searchFnc={searchFnc} />
            <TableUI.Table>
                <TableUI.Header className="top-0 z-10 sticky bg-muted">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableUI.Row key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableUI.Head key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableUI.Head>
                                )
                            })}
                        </TableUI.Row>
                    ))}
                </TableUI.Header>
                <TableUI.Body>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableUI.Row
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableUI.Cell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableUI.Cell>
                                ))}
                            </TableUI.Row>
                        ))
                    ) : (
                        <TableUI.Row>
                            <TableUI.Cell
                                colSpan={columns?.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableUI.Cell>
                        </TableUI.Row>
                    )}
                </TableUI.Body>
            </TableUI.Table>
            <DataTablePagination table={table} />
        </div>
    )
}