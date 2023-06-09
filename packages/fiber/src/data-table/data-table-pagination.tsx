import { Table } from "@tanstack/react-table"
import { Button } from "../button"
import { Input } from "../input"
import { Group } from "../group"
import { Badge } from "../badge"
import { Select } from "../select"
import { numlen } from "../util"
import {ItemsSelect} from "../selection"

export interface DataTablePaginationProps<TData> {
    table: Table<TData>
    perPage?: string
    ofPage?: string
    prevPage?: string
    nextPage?: string
    totalRecords?: string
}

export function DataTablePagination<TData>({
    table,
    totalRecords,
    prevPage,
    nextPage,
    ofPage,
    perPage
}: DataTablePaginationProps<TData>) {
    const of_page = ofPage || "of %d page"
    const total_records = totalRecords || "total %d records"
    if (table.getTotalSize()) {
        return (
            <div className="flex items-center px-2 space-x-4">
                <Group>
                    <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        {prevPage || "Prev"}
                    </Button>
                    <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        {nextPage || "Next"}
                    </Button>
                    <Input
                        size={numlen(table.getPageCount())}
                        placeholder={String(table.getState().pagination.pageIndex + 1)}
                        suffix={<Badge>{of_page.replace("%d", String(table.getPageCount()))}</Badge>}
                    />
                </Group>
                <ItemsSelect
                    items={[{ value: 10 }, { value: 20 }]}
                    suffix={perPage || "per page"}
                    defaultValue={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                        console.log(value)
                        table.setPageSize(Number(value))
                    }}
                />
                <span>{total_records.replace("%d", String(table.getFilteredRowModel().rows.length))}</span>
            </div>
        )
    }
    return null
}