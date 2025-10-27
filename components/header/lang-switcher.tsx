"use client";

import Flag from "react-world-flags";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowBigUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useCallback } from "react";

interface LanguageToggleWithTooltipProps {
    currentLocale: string;
}

export function LanguageToggleWithTooltip({
    currentLocale,
}: LanguageToggleWithTooltipProps) {
    const t = useTranslations("Header");
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = useCallback(() => {
        const newLocale = currentLocale === "en" ? "cz" : "en";
        router.replace(pathname, { locale: newLocale });
        router.refresh();
    }, [currentLocale, pathname, router]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Fixed: compare to lowercase "c", not uppercase "C"
            if (event.shiftKey && event.key.toLowerCase() === "c") {
                event.preventDefault();
                toggleLanguage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [toggleLanguage]);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    onClick={toggleLanguage}
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full cursor-pointer"
                    aria-label={
                        currentLocale === "en"
                            ? "Switch to Czech"
                            : "Přepnout na angličtinu"
                    }
                >
                    <Flag
                        code={currentLocale === "en" ? "GB" : "CZ"}
                        style={{
                            width: "1.5rem",
                            height: "1rem",
                            borderRadius: "2px",
                        }}
                        alt={
                            currentLocale === "en"
                                ? "British flag"
                                : "Czech flag"
                        }
                    />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p className="flex items-center gap-1">
                    {t("Lang.change")}
                    <span className="flex items-center font-semibold text-blue-600 dark:text-muted text-xs">
                        <ArrowBigUp className="size-4" />
                        <span>+C</span>
                    </span>
                </p>
            </TooltipContent>
        </Tooltip>
    );
}
