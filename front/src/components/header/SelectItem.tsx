import { CheckIcon, PlusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ReactNode, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Separator } from '../ui/separator'

type dataObject = {
  id: string
  name: string
}

interface PopOverProps<T> {
  data: Array<T>
  rendeItem: (item: T, index: number) => ReactNode
  rightItem: (item: T, selected: boolean, handleClose: () => void) => ReactNode
  keyExtractor: (item: T) => string
  onChange: (value: T) => void
  action: () => ReactNode
  activeItem?: T | null
  label: string
  placeholder: string
}

export function SelectItem<T extends dataObject>({
  data,
  keyExtractor,
  onChange,
  label,
  rendeItem,
  rightItem,
  activeItem,
  placeholder,
  action
}: PopOverProps<T>) {
  const [itemSelected, setItemSelected] = useState<T>(
    activeItem ? activeItem : data[0]
  )

  useEffect(() => {
    setItemSelected(activeItem || data[0])
  }, [activeItem])

  const [open, setOpen] = useState(false)

  function handleOnChange(item: T) {
    onChange(item)
    setItemSelected(item)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center">
          <Button className="px-0 py-1 text-sm text-foreground" variant="link">
            {itemSelected?.id
              ? data.find((item) => item.id === itemSelected.id)?.name
              : label}
          </Button>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="ml-1 h-max w-max justify-between p-1 opacity-50"
          >
            <CaretSortIcon className="h-5 w-5" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-44 p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty className="text-nowrap p-2 text-sm">
              Projeto não encontrado{' '}
            </CommandEmpty>
            <CommandGroup heading={label}>
              {data.map((item, index) => (
                <CommandItem
                  key={keyExtractor(item)}
                  value={item.name}
                  onSelect={() => handleOnChange(data[index])}
                  className="flex cursor-pointer items-center gap-2"
                >
                  {rendeItem(item, index)}

                  {rightItem ? (
                    rightItem(item, item.id === itemSelected?.id, () =>
                      setOpen(false)
                    )
                  ) : (
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        item.id === itemSelected?.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <Separator />
            <CommandGroup className="">
              <CommandItem
                onSubmit={(e) => {
                  e.stopPropagation()
                  action()
                }}
              >
                {action()}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
