"use client";

import { useTranslations } from "next-intl";
import { TechCard } from "@/components/sections/tech-card";
import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";

const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: "blur(8px)",
        y: 20,
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

export function TechStack() {
    const t = useTranslations("HomePage.TechStack");

    const logos = [
        {
            id: 1,
            text: "HTML5",
            image: "/assets/icons/html-5.svg",
            link: "https://html.spec.whatwg.org/",
            experience: t("experience.3plus"),
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
    ];

    return (
        <section id="techstack" className="grid grid-cols-12 cs-container">
            <LazyMotion features={domAnimation}>
                <m.div
                    className="space-y-12 col-span-12 md:text-left text-center"
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    <h2 className="font-bold text-5xl">
                        <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 mx-3 font-bold text-transparent">
                            /
                        </span>
                        {t("title")}
                    </h2>

                    <div className="text-xl text-left">{t("text")}</div>

                    <div className="place-items-center gap-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {logos.map((logo) => (
                            <m.div
                                key={logo.id}
                                variants={cardVariants}
                                style={{
                                    willChange: "transform, opacity, filter",
                                }}
                                className="w-full max-w-80"
                            >
                                <TechCard
                                    image={logo.image}
                                    link={logo.link}
                                    text={logo.text}
                                    experience={logo.experience}
                                />
                            </m.div>
                        ))}
                    </div>
                </m.div>
            </LazyMotion>
        </section>
    );
}
