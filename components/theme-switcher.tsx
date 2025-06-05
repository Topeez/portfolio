"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"

export function ModeToggle() {
    const { setTheme } = useTheme()
    const t = useTranslations("Header");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" className="bg-trbg-transparent hover:bg-transparent cursor-pointer shadow-none relative z-[1501]">
                    <Sun className="w-[1.2rem] h-[1.2rem] text-foreground rotate-0 size-8 dark:-rotate-90 scale-100 dark:scale-0 transition-all" />
                    <Moon className="absolute w-[1.2rem] h-[1.2rem] text-foreground size-8 rotate-90 dark:rotate-0 scale-0 dark:scale-100 transition-all" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="z-[1501] rounded-lg">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    {t("Mode.light")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    {t("Mode.dark")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    {t("Mode.system")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}