"use client";

import Flag from "react-world-flags";
import { useTranslations } from "next-intl";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowBigUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LanguageToggleWithTooltipProps {
    currentLocale: string;
    toggleLanguage: () => void;
}

export function LanguageToggleWithTooltip({
    currentLocale,
    toggleLanguage,
}: LanguageToggleWithTooltipProps) {
    const t = useTranslations("Header");

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
