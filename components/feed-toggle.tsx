"use client"

import * as React from "react"
import { Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { signOut } from "next-auth/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function FeedModeToggle({image, name} : {image: string | null | undefined, name: string}) {
  const { setTheme } = useTheme()
  const { push } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          
          <Avatar className="w-8 h-8 p-1">
          <AvatarImage src={image!} />
          <AvatarFallback>CN</AvatarFallback>
         </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
      <DropdownMenuLabel>{name}</DropdownMenuLabel>
      <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => push("/")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => push("/discover")}>
          Discover
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => push("/education")}>
          Education
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => push("/skill")}>
          Skill
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => push("/achievement")}>
          Achievement
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => push("/project")}>
          Project
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
