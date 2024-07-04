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

import { useRouter } from "next/navigation"


export function SkillComboboxDemoFilter(props: {
    props : {
            id: string;
            name: string;
        }[]
  }) {
    const {push } = useRouter();
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [skill, setSkill] = React.useState("");


  function handleClick(){
    push(`/discover/filtered/${skill}`)
  }

  return (
    <div className="flex gap-3">
        <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? props.props.find((framework) => framework.name === value)?.name
            : "Select Skill..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 h-[300px]">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {props.props.map((framework) => (
             <CommandList className="overflow-scroll">
                 <CommandItem
                key={framework.id}
                value={framework.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setSkill(framework.id)
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
    <Button onClick={handleClick}>Search</Button>
    </div>
  )
}
