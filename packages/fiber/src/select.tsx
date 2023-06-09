"use client"

import * as React from "react"
import * as Primitive from "@radix-ui/react-select"
import { ChevronUp, ChevronDown, Check } from "lucide-react"
import { Button } from "./button"
import { Modal } from "./modal"
import cn from "clsx"


const Item = React.forwardRef(({ label, className, ...props }, forwardedRef) => {
  return (
    <Primitive.Item
      className={cn(
        'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <Primitive.ItemText>{label || props.value}</Primitive.ItemText>
      <Primitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <Check />
      </Primitive.ItemIndicator>
    </Primitive.Item>
  );
});

type Item = {
  group?: { label: string }
  items: [{ value: any, label?: string }]
}
interface SelectProps extends Primitive.SelectProps {
  children?: React.ReactElement
  suffix?: React.ReactElement | string
  items?: Item[]
}

export function Select({ children, suffix, defaultValue, items, ...props }: SelectProps) {
  if (!children && !items?.length) return null
  return <Primitive.Root {...props}>
    <Primitive.Trigger
      asChild
      aria-label="Food"
    >
      <Button>
        <Primitive.Value defaultValue={defaultValue} placeholder="Primitive a fruit…" />
        <Primitive.Icon className="text-violet11 flex items-center whitespace-nowrap">
          {suffix && <span className="ml-2">{suffix}</span>}
          <ChevronDown />
        </Primitive.Icon>
      </Button>
    </Primitive.Trigger>
    <Primitive.Portal>
      <Modal asChild>
        <Primitive.Content>
          {children || <><Primitive.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronUp />
          </Primitive.ScrollUpButton>
            <Primitive.Viewport className="p-[5px]">
              {items?.length === 1 ? items[0].items.map(node => <Item {...node} />) : items?.map(item => <Primitive.Group>
                <Primitive.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                  {item.group.label}
                </Primitive.Label>
                {item.items.map(node => <Item {...node} />)}
              </Primitive.Group>)}
            </Primitive.Viewport>
            <Primitive.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
              <ChevronDown />
            </Primitive.ScrollDownButton>
          </>}
        </Primitive.Content>
      </Modal>
    </Primitive.Portal>
  </Primitive.Root>
}