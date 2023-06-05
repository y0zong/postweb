"use client"

import { Table } from "@tanstack/react-table"
import { LucideIcon, X, Trash2 } from "lucide-react"

import { Button } from "@postweb/html"
import { Separator } from "@postweb/html"
import { DataTableViewOptions } from "./data-table-view-options"
import { Search } from "@postweb/html/search"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import * as React from "react"

interface DataTableToolbarProps<TData> {
    table: Table<TData>,
    placeholder?: string,
    filters?: Map<string, {
        options: { icon?: LucideIcon, value: string, label: string }[],
        icon?: LucideIcon
        title: string
    }>
    items?: (table: Table<TData>) => React.ReactElement[]
    more?: (table: Table<TData>) => React.ReactElement[]
    searchFnc: (str: string) => Promise<any>
}

export function DataTableToolbar<TData>({
    table,
    items,
    more,
    filters,
    searchFnc,
    placeholder
}: DataTableToolbarProps<TData>) {
    // const isFiltered =
    //     table.getPreFilteredRowModel().rows.length >
    //     table.getFilteredRowModel().rows.length

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) ? <>
                    <Button size="sm" variant="secondary" onClick={() => table.resetRowSelection()}>
                        <X className="h-4 w-4 mr-1" />
                        clear({table.getSelectedRowModel().rows.length})
                    </Button>
                    {items && <><Separator orientation="vertical" className="mx-4" />{items(table)}</>}
                </> : <>
                    <Search
                        dsize="sm"
                        placeholder={placeholder}
                        onEnter={searchFnc}
                        className="w-[150px] lg:w-[250px]"
                    />
                    {more && <><Separator orientation="vertical" className="mx-4" />{more(table)}</>}
                </>}

            </div>
            <div className="flex space-x-2">
                {Array.from(filters || []).map(([column, { title, ...rest }]) => table.getColumn(column) && (<DataTableFacetedFilter
                    column={table.getColumn(column)}
                    title={title}
                    key={title}
                    {...rest}
                />))}
                {/* {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )} */}
                <DataTableViewOptions table={table} />
            </div>
        </div>
    )
}