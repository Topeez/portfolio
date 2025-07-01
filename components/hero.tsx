"use client"

import { Braces, CodeXml } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
    const t = useTranslations("HomePage");

    return (
        <>
            <section id="home" className="relative flex flex-col content-center md:grid grid-cols-12 mt-32 h-full cs-container">
                <div className="flex flex-col justify-center items-center md:items-start space-y-6 md:space-y-3 col-span-6 h-full">
                    <div className="flex items-center gap-2 p-1 border border-muted rounded-4xl max-w-fit">
                        <Button variant="ghost" className="flex items-center gap-4 bg-gradient-to-r from-blue-600 to-sky-400 p-2 rounded-4xl text-white hover:text-white text-xs">
                            <div className="relative flex justify-center items-center rounded-full w-3 h-3">
                                <span className="bg-green-400 rounded-full w-3 h-3"></span>
                                <span className="absolute bg-green-400 rounded-full w-4 h-4 animate-ping"></span>
                                <span className="absolute bg-green-400 rounded-full w-full h-full animate-ping"></span>
                            </div>
                            <p>{t("available")}</p>
                        </Button>
                        <Button variant="ghost" className="p-1.5 rounded-4xl text-muted-foreground text-xs cursor-pointer">{t("getintouch")}</Button>
                    </div>
                    <h1 className="font-bold md:text-[65px] text-6xl md:text-left text-center slide-in">{t('title')}<span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent">{t('name')}</span></h1>
                    <h2 className="text-3xl slide-in">{t('subtitle')}</h2>
                    <div className="text-muted-foreground text-lg md:text-xl md:text-left text-center slide-in">{t('description')}</div>

                    <div className="flex justify-start items-center mx-auto md:mx-0 mt-32 slide-up">
                        <Link href={"/#about"}>
                            <Button onClick={() => {
                                const allElements = document.getElementsByTagName("*");
                                const allElementsArray = Array.from(allElements);
                                const allZIndexes = allElementsArray.map(element => `#${element.id} ${element.tagName} z-index: ${window.getComputedStyle(element).zIndex}`);
                                console.log(allZIndexes.join("\n"));
                            }} className="hover:bg-gradient-to-r from-blue-600 to-sky-400 p-8 rounded-2xl hover:text-white text-3xl transition-all ease-in-out cursor-pointer">{t("ctabutton")}</Button>
                        </Link>
                    </div>
                </div>
                <div className="relative flex justify-end items-center col-span-6 fade-in">
                    <div className="z-auto absolute inset-0 bg-gradient-to-t from-10% from-background to-30% to-transparent" />
                    <Image
                        src="/assets/img/me_transparent.png"
                        alt="me"
                        width={1500}
                        height={1200}
                        className="size-full select-none">
                    </Image>
                    <div className="top-52 left-32 z-10 absolute animate-pulse duration-4000">
                        <CodeXml className="blur-[1px] size-12 text-sky-400/50" />
                    </div>
                    <div className="bottom-28 left-14 z-10 absolute animate-blink duration-1000">
                        <CodeXml className="blur-[1px] size-10 text-blue-600/70" />
                    </div>
                    <div className="top-44 right-14 z-10 absolute animate-pulse duration-2456">
                        <Braces className="blur-[1px] size-12 text-sky-400/50" />
                    </div>
                </div>
            </section>
        </>
    );
}