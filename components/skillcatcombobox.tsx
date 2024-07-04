"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  { name: "Information Technology (IT)" },
  { name: "Healthcare" },
  { name: "Criminal Justice" },
  { name: "Engineering" },
  { name: "Architecture and Design" },
  { name: "Dance" },
  { name: "Visual Arts" },
  { name: "Music" },
  { name: "Business and Management" },
  { name: "Communication and Media" }
];


export function CategComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
   <>
   <input type="hidden" name="category" value={value}/>
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}  
          className="w-full justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.name === value)?.name
            : "Select Category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 h-[300px]">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandList>
                <CommandItem
                key={framework.name}
                value={framework.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.name}
              </CommandItem>
              </CommandList>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
   </>
  )
}
