"use client";

import { useTranslations } from "next-intl";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Activity, Accessibility, Search, ShieldCheck } from "lucide-react";

export function LighthouseBadge() {
    const scores = [
        { name: "Performance", value: 100, icon: Activity },
        { name: "Accessibility", value: 100, icon: Accessibility },
        { name: "Best Practices", value: 100, icon: ShieldCheck },
        { name: "SEO", value: 100, icon: Search },
    ];

    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex md:flex-row flex-col flex-wrap items-center gap-4 bg-background/90 backdrop-blur-sm px-4 py-8 md:py-2 border border-border hover:border-blue-500/50 rounded-2xl w-max transition-colors cursor-help">
                        <div className="flex items-center gap-2 pr-2 border-border border-r">
                            <span className="bg-sky-400 rounded-full size-2 animate-pulse" />
                            <span className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
                                Lighthouse
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-4 md:max-w-full max-w-sm">
                            {scores.map((score, idx) => {
                                const Icon = score.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="group flex items-center gap-1.5"
                                    >
                                        <span className="font-bold text-sky-400 text-sm">
                                            {score.value}
                                        </span>
                                        <Icon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent
                    side="top"
                    className="bg-background border-border text-muted-foreground"
                >
                    <p>Verified 4x 100 score in Google Lighthouse</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
