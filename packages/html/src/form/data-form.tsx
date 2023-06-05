"use client"

import * as React from "react"
import cn from "clsx"
import * as z from "zod"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import {ColumnDef} from "@tanstack/react-table"
import { useForm, ControllerRenderProps, ControllerFieldState, UseFormStateReturn } from "react-hook-form"
import {Button} from "../button"
import { Input } from "../input"
import { Loading } from "../loading"
import { Switch } from "../switch"
import { Combobox, ComboboxProps } from "../combobox"
import {Form,FormField,FormItemWithLabel} from "../form"
import { Label } from "../label"
import * as Popover from "../popover"
import { Calendar } from "../calendar"
import { Upload } from "../upload"
import { DataTableColumnHeader } from "../data-table/data-table-column-header"

export interface Field {
    label?: string
    name: string
    zod?: any
    placeholder?: string
    value?: any
    des?: string
    width?: number
    type?: "tel" | "password" | {
        ctype: "date" | "bool" | "select" | "upload",
        des?: string | React.ReactElement,
        uploadFnc?: (file: File) => Promise<string | undefined | null>
    } & ComboboxProps
    render?: ({ field, fieldState, formState, }: {
        field: ControllerRenderProps<any, any>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<any>;
    }) => React.ReactElement
}

export interface DataFormProps extends React.HTMLAttributes<HTMLFormElement> {
    className?: string
    fields: Field[]
    float?: boolean
    submitTxt?: string | React.ReactElement
    submitFnc: (data: any) => Promise<any>
    afterSubmit?: (response: any) => void
}


function zodBuilder(fields: Field[]) {
    const obj: Record<string, any> = {}
    fields.map(item => obj[item.name] = item.zod)
    return z.object(obj)
}

export function DataForm({ className, fields, submitTxt, float, submitFnc, afterSubmit, ...formProps }: DataFormProps) {
    const schema = zodBuilder(fields)
    const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
    const [submitting, setSubmitStatus] = React.useState<boolean>(false)
    async function submitHandler(data: z.infer<typeof schema>) {
        setSubmitStatus(true)
        await submitFnc(data).then(afterSubmit)
        setSubmitStatus(false)
    }

    return (
        <Form {...form}>
            <form {...formProps}
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("w-full", float ? "after:clear-both after:block" : "space-y-6", className)}
            >
                {fields.map(({ label, name, render, type, width, ...rest }) => <FormField
                    control={form.control}
                    name={name}
                    key={name}
                    render={({ field, ...props }) => {
                        const classn = cn({ "float-left mt-4 px-4": float })
                        const style = width ? { width: `${width}px` } : {}
                        if (render) {
                            return <FormItemWithLabel name={label} className={classn} style={style}>
                                {render!({ field, ...props })}
                            </FormItemWithLabel>
                        }

                        if (typeof type === "string" || typeof type === "undefined") {
                            return <FormItemWithLabel name={label} className={classn} style={style}>
                                <Input placeholder={rest.placeholder} type={type} {...field} />
                            </FormItemWithLabel>
                        } else {
                            const { des, ctype, uploadFnc, ...crest } = type
                            switch (ctype) {
                                case "date":
                                    return <FormItemWithLabel name={label} className={classn} style={style}>
                                        <Popover.Root>
                                            <Popover.Trigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>{rest.placeholder}</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </Popover.Trigger>
                                            <Popover.Content className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date: any) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </Popover.Content>
                                        </Popover.Root>
                                    </FormItemWithLabel>
                                case "bool":
                                    return <FormItemWithLabel name={label} className={classn} style={style}>
                                        <Label htmlFor={name}>
                                            <Switch id={name} onChange={field.onChange} />
                                            {des}
                                        </Label>
                                    </FormItemWithLabel>
                                case "select":
                                    return <FormItemWithLabel name={label} className={classn} style={style}>
                                        <Combobox {...crest} onChange={field.onChange}>{rest.placeholder}</Combobox>
                                    </FormItemWithLabel>
                                case "upload":
                                default:
                                    return <FormItemWithLabel name={label} className={classn} style={style}>
                                        <Upload submitFnc={uploadFnc} onChange={field.onChange} />
                                    </FormItemWithLabel>
                            }
                        }
                    }}
                />
                )}
                {submitTxt && <Button className="w-full" type="submit">
                    {submitting ? <Loading /> : submitTxt}
                </Button>}
            </form>
        </Form>
    )
}

export type FieldColumn = Omit<ColumnDef<any, any>, "accessorKey"> & {
    name: string
    label: string
    field?: Omit<Field, "name" | "label">
}

export type FildColumnDef = { columnDef: ColumnDef<any, any>[], fieldDef: Field[] }
export function columnHelper(columns: FieldColumn[]): FildColumnDef {
    let columnDef: ColumnDef<any, any>[] = []
    let fieldDef: Field[] = []
    columns.forEach(({ name, label, field, header, ...rest }) => {
        columnDef.push({
            accessorKey: name,
            ...(header ? { header } : { header: ({ column }) => <DataTableColumnHeader column={column} title={label} /> }),
            ...rest
        })
        fieldDef.push({
            name,
            label,
            ...field
        })
    })
    return { columnDef, fieldDef }
}