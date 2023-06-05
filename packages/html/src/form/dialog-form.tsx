import { nanoid } from 'nanoid'
import * as Dialog from "../dialog"
import { Button } from "../button"
import { DataForm, type DataFormProps } from "./data-form"
import { useState } from 'react'

const DEFAULT_FORM_PROPS = { fields: [], submitFnc: () => new Promise(() => { }), shouldClose: (d: any) => d }
export function DialogForm({ icon, title, description, form, content, ensure, cancel, children }: DialogFormProps) {
    const [open, setOpen] = useState(false)
    const formId = nanoid(5)
    const isContent = !!!form && !!content
    const { shouldClose, ...formProps } = form || DEFAULT_FORM_PROPS
    return <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Dialog.Content forceMount close={isContent}>
            <Dialog.Header>
                {icon}
                {title && <Dialog.Title>{title}</Dialog.Title>}
            </Dialog.Header>
            {description && <Dialog.Description>{description}</Dialog.Description>}
            <div className="min-h-0 overflow-y-auto px-6 py-2">
                {form && <DataForm id={formId} {...formProps} afterSubmit={(res) => {
                    console.log(shouldClose, res)
                    setOpen(!shouldClose(res))
                }} />}
                {isContent && content}
            </div>
            {(ensure || cancel) && <Dialog.Footer>
                {cancel && <Dialog.Close asChild><Button variant="secondary" size="sm">{cancel}</Button></Dialog.Close>}
                <Button size="sm" form={formId} type="submit" className="w-20">{ensure}</Button>
            </Dialog.Footer>}
        </Dialog.Content>
    </Dialog.Root>
}

interface DialogFormProps {
    icon?: React.ReactElement
    title?: string
    description?: string | React.ReactElement
    form?: DataFormProps & { shouldClose: (response: any) => boolean }
    content?: React.ReactElement
    ensure?: string | React.ReactElement
    cancel?: string | React.ReactElement
    children: React.ReactElement
}