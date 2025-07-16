"use client";

import { Links } from "@/components/links";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { socialMedia } from "@/components/socialMedia";

export function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-muted p-6 md:p-12 w-full">
            <div className="flex md:flex-row flex-col justify-between items-center gap-10 cs-container">
                {/* Left Column - Brand Info */}
                <div className="flex flex-col items-center md:items-start gap-6 md:gap-10">
                    <div className="flex sm:flex-row flex-col items-center gap-4 sm:text-left text-center">
                        <div className="rounded-full w-16 md:w-20 h-16 md:h-20 overflow-hidden">
                            <Image
                                src="/assets/img/me_transparent.png"
                                width={80}
                                height={80}
                                alt={t("name")}
                                className="object-cover aspect-square"
                            />
                        </div>
                        <div>
                            <div className="font-bold text-xl md:text-2xl">
                                {t("name")}
                            </div>
                            <div className="text-muted-foreground text-base md:text-xl">
                                {t("job")}
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6 w-full">
                        {socialMedia.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                >
                                    <Icon className="fill-foreground hover:fill-blue-600 size-6 md:size-8 hover:scale-[1.02] transition-all duration-300 will-change-transform" />
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - CTA and Contact Info */}
                <div className="flex flex-col items-center gap-6 md:gap-10 w-full md:w-auto">
                    <div className="flex md:flex-row flex-col justify-center gap-8 w-full text-center">
                        <div>
                            <div className="font-bold text-lg md:text-xl">
                                Email
                            </div>
                            <div className="text-muted-foreground text-base">
                                topetopinka7@seznam.cz
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-lg md:text-xl">
                                Discord
                            </div>
                            <div className="text-muted-foreground text-base">
                                t0p33z
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 cs-container">
                <Separator className="bg-gradient-to-r from-blue-600 to-sky-400 my-6" />

                <div className="flex md:flex-row flex-col justify-between items-center gap-4 text-center">
                    <div className="text-sm md:text-base">
                        {t("copyright1")}
                        {new Date().getFullYear()}
                        {t("copyright2")}
                    </div>
                    <Links />
                </div>
            </div>
        </footer>
    );
}
