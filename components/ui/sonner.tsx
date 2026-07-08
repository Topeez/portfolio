"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
    const { resolvedTheme } = useTheme();

    return (
        <Sonner
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            className="group toaster"
            toastOptions={{
                classNames: {
                    toast: "bg-popover text-popover-foreground border-border shadow-md",
                    title: "text-popover-foreground",
                    description: "text-muted-foreground",
                    error: "bg-destructive/10 text-destructive border-destructive/20",
                    success: "bg-card text-card-foreground border-border",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };