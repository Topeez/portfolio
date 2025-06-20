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
            <section id="home" className="md:grid grid-cols-12 content-center flex flex-col relative cs-container mt-20 h-full">
                <div className="col-span-6 flex flex-col justify-center space-y-3 h-full">
                    <div className="flex items-center border border-muted rounded-4xl p-1 max-w-fit gap-2">
                        <Button variant="ghost" className="p-1.5 rounded-4xl bg-gradient-to-r from-blue-600 to-sky-400 text-xs text-white hover:text-white"><span className="bg-green-500 p-1 rounded-full"></span>{t("available")}</Button>
                        <Button variant="ghost" className="p-1.5 rounded-4xl text-xs text-muted-foreground">{t("getintouch")}</Button>
                    </div>
                    <h1 className="text-[65px] font-bold slide-in">{t('title')}<span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent">{t('name')}</span></h1>
                    <h2 className="text-3xl slide-in">{t('subtitle')}</h2>
                    <div className="text-xl text-muted-foreground slide-in">{t('description')}</div>

                    <div className="flex items-center justify-start mt-32 md:mx-0 mx-auto slide-up">
                        <Link href={"/#about"}><Button onClick={() => {
                            const allElements = document.getElementsByTagName("*");
                            const allElementsArray = Array.from(allElements);
                            const allZIndexes = allElementsArray.map(element => `#${element.id} ${element.tagName} z-index: ${window.getComputedStyle(element).zIndex}`);
                            console.log(allZIndexes.join("\n"));
                        }} className="text-3xl p-8 rounded-2xl hover:bg-gradient-to-r from-blue-600 to-sky-400 hover:text-foreground transition-all ease-in-out cursor-pointer">{t("ctabutton")}</Button></Link>
                    </div>
                </div>
                <div className="col-span-6 flex justify-end items-center relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background from-10% to-transparent to-30%" />
                    <Image
                        src="/assets/img/me_transparent.png"
                        alt="me"
                        width={1500}
                        height={1200}
                        className="size-full select-none fade-in">
                    </Image>
                    <div className="absolute top-52 left-32 z-10 animate-pulse duration-4000">
                        <CodeXml className="text-sky-400/50 size-12 blur-[1px]" />
                    </div>
                    <div className="absolute bottom-28 left-14 z-10 animate-blink duration-1000">
                        <CodeXml className="text-blue-600/70 size-10 blur-[1px]" />
                    </div>
                    <div className="absolute top-44 right-14 z-10 animate-pulse duration-2456">
                        <Braces className="text-sky-400/50 size-12 blur-[1px]" />
                    </div>
                </div>
            </section>
        </>
    );
}