"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { TechCard } from "@/components/sections/tech-card";

export function TechStack() {
    const t = useTranslations("HomePage.TechStack");

    // Memoize the logos array to prevent recreation on every render
    const logos = useMemo(
        () => [
            {
                id: 1,
                text: "HTML5",
                image: "/assets/icons/html-5.svg",
                link: "https://html.spec.whatwg.org/",
                experience: t("experience.3plus"), // Optional: add context
            },
            {
                id: 2,
                text: "CSS3",
                image: "/assets/icons/css3.svg",
                link: "https://www.w3.org/Style/CSS/",
                experience: t("experience.3plus"),
            },
            {
                id: 3,
                text: "Tailwind CSS",
                image: "/assets/icons/tailwind.svg",
                link: "https://tailwindcss.com/",
                experience: t("experience.2plus"),
            },
            {
                id: 4,
                text: "JavaScript",
                image: "/assets/icons/javascript.svg",
                link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
                experience: t("experience.3plus"),
            },
            {
                id: 5,
                text: "React",
                image: "/assets/icons/react.svg",
                link: "https://react.dev/",
                experience: t("experience.1plus"),
            },
            {
                id: 6,
                text: "Next.js",
                image: "/assets/icons/nextjs.svg",
                link: "https://nextjs.org/",
                experience: t("experience.1plus"),
            },
            {
                id: 7,
                text: "TypeScript",
                image: "/assets/icons/typescript.svg",
                link: "https://www.typescriptlang.org/",
                experience: t("experience.1plus"),
            },
            {
                id: 8,
                text: "Python Django",
                image: "/assets/icons/django.svg",
                link: "https://www.djangoproject.com/",
                experience: t("experience.2plus"),
            },
            {
                id: 9,
                text: "Docker",
                image: "/assets/icons/docker.svg",
                link: "https://www.docker.com/",
                experience: t("experience.2plus"),
            },
        ],
        []
    );

    // Memoize the rendered cards to prevent unnecessary re-renders
    const renderedCards = useMemo(
        () =>
            logos.map((logo) => (
                <TechCard
                    key={logo.id}
                    image={logo.image}
                    link={logo.link}
                    text={logo.text}
                    experience={logo.experience}
                />
            )),
        [logos]
    );

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
                <div className="place-items-center gap-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {renderedCards}
                </div>
            </div>
        </section>
    );
}
