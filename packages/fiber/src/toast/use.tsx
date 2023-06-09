"use client"
// Inspired by react-hot-toast library
import { useState, useEffect } from "react"
import cn from "clsx"
import * as Toast from "./html"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = Toast.ToastProps & {
  id: string
  showColse?: boolean
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  action?: Toast.ToastActionElement
  intent?: "verified" | "warning" | "danger"
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
    type: ActionType["ADD_TOAST"]
    toast: ToasterToast
  }
  | {
    type: ActionType["UPDATE_TOAST"]
    toast: Partial<ToasterToast>
  }
  | {
    type: ActionType["DISMISS_TOAST"]
    toastId?: ToasterToast["id"]
  }
  | {
    type: ActionType["REMOVE_TOAST"]
    toastId?: ToasterToast["id"]
  }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
              ...t,
              open: false,
            }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = useState<State>(memoryState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

function Toaster() {
  const { toasts } = useToast()

  return (
    <Toast.Provider>
      {toasts.map(function ({ id, title, icon, description, intent, action, showColse, ...props }) {
        return (
          <Toast.Root key={id} intent={intent} {...props}>
            {(icon === undefined && intent) ? <svg viewBox="0 0 16 16" className="mt-[.875rem] w-4 h-4 ml-3 fill-white opacity-70">
              {intent === "danger" && <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.7 5.71L9.41 8L11.71 10.29C11.89 10.47 12 10.72 12 11C12 11.55 11.55 12 11 12C10.72 12 10.47 11.89 10.29 11.7L8 9.41L5.71 11.71C5.53 11.89 5.28 12 5 12C4.45 12 4 11.55 4 11C4 10.72 4.11 10.47 4.3 10.29L6.59 8L4.29 5.71C4.11 5.53 4 5.28 4 5C4 4.45 4.45 4 5 4C5.28 4 5.53 4.11 5.71 4.29L8 6.59L10.29 4.29C10.47 4.11 10.72 4 11 4C11.55 4 12 4.45 12 5C12 5.28 11.89 5.53 11.7 5.71Z" />}
              {intent === "verified" && <path d="M8,16c-4.42,0-8-3.58-8-8s3.58-8,8-8s8,3.58,8,8S12.42,16,8,16z M12,5c-0.28,0-0.53,0.11-0.71,0.29   L7,9.59l-2.29-2.3C4.53,7.11,4.28,7,4,7C3.45,7,3,7.45,3,8c0,0.28,0.11,0.53,0.29,0.71l3,3C6.47,11.89,6.72,12,7,12   s0.53-0.11,0.71-0.29l5-5C12.89,6.53,13,6.28,13,6C13,5.45,12.55,5,12,5z" />}
              {intent === "warning" && <path d="M7.99-0.01c-4.42,0-8,3.58-8,8s3.58,8,8,8s8-3.58,8-8S12.41-0.01,7.99-0.01z     M8.99,12.99h-2v-2h2V12.99z M8.99,9.99h-2v-7h2V9.99z" />}
            </svg> : icon && <span className="mt-[.875rem] ml-3 opacity-70">{icon}</span>}
            <div className={cn("grid gap-1 m-3 flex-1")}>
              {title && <Toast.Title className="text-sm font-semibold">{title}</Toast.Title>}
              {description && (
                <Toast.Description className="text-sm opacity-90">{description}</Toast.Description>
              )}
            </div>
            {action && <Toast.Action intent={intent}>{action}</Toast.Action>}
            {showColse && <Toast.Action intent={intent} asChild>
              <Toast.Close />
            </Toast.Action>}
          </Toast.Root>
        )
      })}
      <Toast.Viewport />
    </Toast.Provider>
  )
}

export { useToast, Toaster, toast }
