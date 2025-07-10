"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { TechCard } from "@/components/tech-card";

export function TechStack() {
    const t = useTranslations("HomePage.TechStack");

    const logos = [
        {
            id: 1,
            text: "Next.js",
            image: "/assets/icons/nextjs.svg",
            link: "https://nextjs.org/",
            level: 2,
        },
        {
            id: 2,
            text: "React",
            image: "/assets/icons/react.svg",
            link: "https://react.dev/",
            level: 3,
        },
        {
            id: 3,
            text: "Tailwind CSS",
            image: "/assets/icons/tailwind.svg",
            link: "https://tailwindcss.com/",
            level: 4,
        },
        {
            id: 4,
            text: "TypeScript",
            image: "/assets/icons/typescript.svg",
            link: "https://www.typescriptlang.org/",
            level: 3,
        },
        {
            id: 5,
            text: "Node.js",
            image: "/assets/icons/nodejs.svg",
            link: "https://nodejs.org/en/",
            level: 4,
        },
        {
            id: 6,
            text: "HTML5",
            image: "/assets/icons/html-5.svg",
            link: "https://html.spec.whatwg.org/",
            level: 5,
        },
        {
            id: 7,
            text: "Docker",
            image: "/assets/icons/docker.svg",
            link: "https://www.docker.com/",
            level: 2,
        },
        {
            id: 8,
            text: "CSS3",
            image: "/assets/icons/css3.svg",
            link: "https://www.w3.org/Style/CSS/",
            level: 5,
        },
        {
            id: 9,
            text: "Python Django",
            image: "/assets/icons/django.svg",
            link: "https://www.djangoproject.com/",
            level: 3,
        },
    ];

    return (
        <section id="techstack" className="grid grid-cols-12 cs-container">
            <div className="space-y-12 col-span-12 md:text-left text-center">
                <h2 className="font-bold text-5xl">
                    <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 mx-3 font-bold text-transparent">
                        /
                    </span>
                    {t("title")}
                </h2>
                <div className="text-xl text-left">{t("text")}</div>
                <div className="flex flex-col justify-center items-center place-items-center gap-12 lg:grid grid-cols-3">
                    {logos.map((logo) => (
                        <TechCard
                            key={logo.id}
                            image={logo.image}
                            link={logo.link}
                            text={logo.text}
                            level={logo.level}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
