"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl";


export default function NotFound() {
    const router = useRouter();
    const t = useTranslations("404");

    return (
        <div className="flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 min-h-screen">
            <div className="space-y-6 w-full text-center">
                <div className="space-y-3">
                    <h1 className="font-bold text-foreground text-4xl sm:text-5xl tracking-wide">{t("title")}</h1>
                    <p className="text-foreground/50">{t("text")}</p>
                </div>
                <Button
                    onClick={() => router.back()}
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-sky-400 text-white px-10 py-3 rounded-lg h-10 transition-colors cursor-pointer select-none"
                >
                    {t("btn")}
                </Button>
            </div>
        </div>
    )
}