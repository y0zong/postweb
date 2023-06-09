import { Column } from "@tanstack/react-table"
import { ArrowUpDown, EyeOff, SortAsc, SortDesc } from "lucide-react"

import cn from "clsx"
import { Button } from "@postweb/fiber"
import * as DropdownMenu from "@postweb/fiber/dropdown-menu"
import { Modal } from "../modal"
import { ItemsSelect } from "../selection"
import { Icon, type IconData } from "../icon"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

const upArr: IconData = [["path", "M8 18L12 22L16 18"], ["path", "M12 2V22"]]
const downArr: IconData = [["path", "M8 6L12 2L16 6"], ["path", "M12 2V22"]]
const upDown: IconData = [["path", "m3 16 4 4 4-4"], ["path", "M7 20V4"], ["path", "m21 8-4-4-4 4"], ["path", "M17 4v16"]]
const asc: IconData = [["path", "m3 8 4-4 4 4"], ["path", "M7 4v16"], ["path", "M11 12h4"], ["path", "M11 16h7"], ["path", "M11 20h10"]]
const desc: IconData = [["path", "m3 16 4 4 4-4"], ["path", "M7 20V4"], ["path", "M11 4h4"], ["path", "M11 8h7"], ["path", "M11 12h10"]]
const eyeOff: IconData = [["path", "M9.88 9.88a3 3 0 1 0 4.24 4.24"], ["path", "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"], ["path", "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"], ["line", "2", "22", "22", "22"]]

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("flex items-center flex-nowrap whitespace-nowrap space-x-2", className)}>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <Button
                        variant="ghost"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <Icon data={downArr} />
                        ) : column.getIsSorted() === "asc" ? (
                            <Icon data={upArr} />
                        ) : (
                            <Icon data={upDown} />
                        )}
                    </Button>
                </DropdownMenu.Trigger>
                <Modal asChild>
                    <DropdownMenu.Content align="start" className="p-2">
                        <DropdownMenu.Item onClick={() => column.toggleSorting(false)}>
                            <Icon data={asc} />Asc
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onClick={() => column.toggleSorting(true)}>
                            <Icon data={desc} />Desc
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="" />
                        <DropdownMenu.Item onClick={() => column.toggleVisibility(false)}>
                            <Icon data={eyeOff} />Hide
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </Modal>
            </DropdownMenu.Root>
        </div>
    )
}