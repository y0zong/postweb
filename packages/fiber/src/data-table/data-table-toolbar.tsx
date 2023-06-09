"use client"

import { Table } from "@tanstack/react-table"
import { LucideIcon, X, Trash2 } from "lucide-react"

import { Button } from "@postweb/fiber"
import { Separator } from "@postweb/fiber"
import { DataTableViewOptions } from "./data-table-view-options"
import { Search } from "@postweb/fiber/search"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import * as React from "react"

export type SearchType = { searchFnc: (str: string) => Promise<any>, placeholder?: string, enter?: string }
interface DataTableToolbarProps<TData> {
    table: Table<TData>,
    filters?: Map<string, {
        options: { icon?: LucideIcon, value: string, label: string }[],
        icon?: LucideIcon
        title: string
    }>
    items?: (table: Table<TData>) => React.ReactElement[]
    more?: (table: Table<TData>) => React.ReactElement[]
    search?: SearchType
}

export function DataTableToolbar<TData>({
    table,
    items,
    more,
    filters,
    search,
}: DataTableToolbarProps<TData>) {
    // const isFiltered =
    //     table.getPreFilteredRowModel().rows.length >
    //     table.getFilteredRowModel().rows.length

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) ? <>
                    <Button variant="secondary" onClick={() => table.resetRowSelection()}>
                        <X className="h-4 w-4 mr-1" />
                        clear({table.getSelectedRowModel().rows.length})
                    </Button>
                    {items && <><Separator orientation="vertical" className="mx-4" />{items(table)}</>}
                </> : <>
                    <div>
                        <Search
                            dsize="sm"
                            placeholder={search?.placeholder}
                            onEnter={search?.searchFnc}
                            enter={search?.enter}
                            className="w-[150px] lg:w-[250px]"
                        />
                    </div>
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
                {/* <ItemsSelect
                    filter={true}
                    items={views}
                    suffix={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" /><line x1="18" x2="22" y1="16" y2="16" /></svg>}
                /> */}
            </div>
        </div>
    )
}