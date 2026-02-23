"use client";

import { Braces, CodeXml, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GlareHover from "@/src/blocks/Animations/GlareHover/GlareHover";

export default function Hero() {
    const t = useTranslations("HomePage");

    const availabilityPill = (
        <div className="flex items-center gap-2 p-1 border border-muted rounded-4xl max-w-fit">
            <Button
                variant="ghost"
                className="flex items-center gap-4 bg-gradient-to-r from-blue-600 to-sky-400 p-2 rounded-4xl text-white hover:text-white text-xs"
            >
                <div className="relative flex justify-center items-center rounded-full w-3 h-3">
                    <span className="bg-green-400 rounded-full w-3 h-3"></span>
                    <span className="absolute bg-green-400 rounded-full w-4 h-4 animate-ping"></span>
                    <span className="absolute bg-green-400 rounded-full w-full h-full animate-ping"></span>
                </div>
                <p>{t("available")}</p>
            </Button>
            <Link href={"/#contact"}>
                <Button
                    variant="ghost"
                    className="p-1.5 rounded-4xl text-muted-foreground text-xs cursor-pointer"
                >
                    {t("getintouch")}
                </Button>
            </Link>
        </div>
    );

    const mainTitle = (
        <h1 className="font-bold md:text-[65px] text-6xl lg:text-left text-center slide-in">
            {t("title")}{" "}
            <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent">
                {t("name")}
            </span>
        </h1>
    );

    const ctaButton = (
        <div className="flex justify-start items-center mx-auto lg:mx-0 mt-16 lg:mt-20 animate-slide-up">
            <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.5}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={600}
                playOnce={false}
                className="rounded-2xl"
            >
                <Link href="/#about">
                    <Button className="bg-foreground hover:bg-gradient-to-r from-blue-600 to-sky-400 px-16 py-8 rounded-2xl hover:text-white text-2xl transition-all ease-in-out cursor-pointer">
                        <UserRound className="mr-1" />
                        {t("ctabutton")}
                    </Button>
                </Link>
            </GlareHover>
        </div>
    );

    const floatingIcons = (
        <>
            <div className="hidden lg:block top-52 left-32 z-10 absolute animate-pulse duration-4000">
                <CodeXml className="blur-[1px] size-12 text-sky-400/50" />
            </div>
            <div className="hidden lg:block bottom-28 left-14 z-10 absolute animate-blink duration-1000">
                <CodeXml className="blur-[1px] size-10 text-blue-600/70" />
            </div>
            <div className="hidden lg:block top-44 right-14 z-10 absolute animate-pulse duration-2456">
                <Braces className="blur-[1px] size-12 text-sky-400/50" />
            </div>
        </>
    );

    return (
        <section
            id="home"
            className="relative flex flex-col content-center lg:grid grid-cols-12 pt-32 h-full cs-container"
        >
            <div className="flex flex-col justify-center items-center lg:items-start space-y-6 lg:space-y-4 col-span-6 h-full">
                {availabilityPill}
                {mainTitle}
                <h2 className="text-3xl slide-in">{t("subtitle")}</h2>
                <div className="text-muted-foreground text-lg md:text-xl lg:text-left text-center slide-in">
                    {t("description")}
                </div>
                {ctaButton}
            </div>
            <div className="relative flex justify-center lg:justify-end items-center col-span-6 fade-in">
                <div className="z-auto absolute inset-0 bg-gradient-to-t from-10% dark:from-background to-30% to-transparent pointer-events-none" />

                <Image
                    src="/assets/img/me_transparent.png"
                    alt="Me"
                    width={900}
                    height={1200}
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-full sm:size-3/4 lg:size-full object-cover object-top animate-image-reveal select-none"
                />

                {floatingIcons}
            </div>
        </section>
    );
}
