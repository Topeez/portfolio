"use client";

import * as React from "react";
import { Moon, Sun, ArrowBigUp } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const t = useTranslations("Header");

    // Handle keyboard shortcut for Ctrl + M to toggle theme
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && event.key === "D") {
                if (resolvedTheme === "light") {
                    setTheme("dark");
                } else {
                    setTheme("light");
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [resolvedTheme, setTheme]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size={"icon"}
                    className="z-[1501] relative bg-trbg-transparent hover:bg-transparent shadow-none cursor-pointer"
                >
                    <Sun className="w-[1.2rem] h-[1.2rem] size-8 text-foreground rotate-0 dark:-rotate-90 scale-100 dark:scale-0 transition-all" />
                    <Moon className="absolute w-[1.2rem] h-[1.2rem] size-8 text-foreground rotate-90 dark:rotate-0 scale-0 dark:scale-100 transition-all" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="z-[1501] rounded-lg">
                <span className="top-1 right-2 absolute flex items-center font-semibold text-blue-600 dark:text-muted text-xs">
                    <ArrowBigUp className="size-4" />
                    <span>+D</span>
                </span>
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
    );
}
