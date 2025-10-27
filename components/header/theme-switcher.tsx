"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = resolvedTheme === "dark";

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.shiftKey && e.key === "D") {
                setTheme(isDark ? "light" : "dark");
            }
        },
        [isDark, setTheme]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    if (!mounted) {
        // Return a placeholder with the same dimensions during SSR
        return (
            <div
                className={cn(
                    "flex p-1.5 border border-muted rounded-full w-16 h-8",
                    className
                )}
            >
                <div className="flex justify-between items-center w-full">
                    <div className="flex justify-center items-center bg-gray-200 rounded-full w-6 h-6">
                        <Sun
                            className="w-4 h-4 text-gray-700"
                            strokeWidth={1.5}
                        />
                    </div>
                    <div className="flex justify-center items-center rounded-full w-6 h-6">
                        <Moon
                            className="w-4 h-4 text-black"
                            strokeWidth={1.5}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "flex backdrop-blur-lg p-1.5 border border-muted rounded-full w-16 h-8 transition-all duration-300 cursor-pointer",
                className
            )}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            role="button"
            aria-label="Toggle theme"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    setTheme(isDark ? "light" : "dark");
                }
            }}
        >
            <div className="flex justify-between items-center w-full">
                <div
                    className={cn(
                        "flex justify-center items-center rounded-full w-6 h-6 transition-transform duration-300",
                        isDark
                            ? "transform translate-x-0 bg-zinc-800"
                            : "transform translate-x-8 bg-gray-200"
                    )}
                >
                    {isDark ? (
                        <Moon
                            className="w-4 h-4 text-foregorund"
                            strokeWidth={1.5}
                        />
                    ) : (
                        <Sun
                            className="w-4 h-4 text-muted-foreground"
                            strokeWidth={1.5}
                        />
                    )}
                </div>
                <div
                    className={cn(
                        "flex justify-center items-center rounded-full w-6 h-6 transition-transform duration-300",
                        isDark ? "bg-transparent" : "transform -translate-x-8"
                    )}
                >
                    {isDark ? (
                        <Sun
                            className="w-4 h-4 text-foreground"
                            strokeWidth={1.5}
                        />
                    ) : (
                        <Moon
                            className="w-4 h-4 text-foreground"
                            strokeWidth={1.5}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
