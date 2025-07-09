"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function TechStack() {
    const t = useTranslations("HomePage");

    const logos = [
        {
            id: 1,
            text: "Next.js",
            image: "/assets/icons/nextjs.svg",
            link: "https://nextjs.org/",
        },
        {
            id: 2,
            text: "React",
            image: "/assets/icons/react.svg",
            link: "https://react.dev/",
        },
        {
            id: 3,
            text: "Tailwind CSS",
            image: "/assets/icons/tailwind.svg",
            link: "https://tailwindcss.com/",
        },
        {
            id: 4,
            text: "TypeScript",
            image: "/assets/icons/typescript.svg",
            link: "https://www.typescriptlang.org/",
        },
        {
            id: 5,
            text: "Node.js",
            image: "/assets/icons/nodejs.svg",
            link: "https://nodejs.org/en/",
        },
        {
            id: 6,
            text: "HTML5",
            image: "/assets/icons/html-5.svg",
            link: "https://html.spec.whatwg.org/",
        },
        {
            id: 7,
            text: "Docker",
            image: "/assets/icons/docker.svg",
            link: "https://www.docker.com/",
        },
        {
            id: 8,
            text: "CSS3",
            image: "/assets/icons/css3.svg",
            link: "https://www.w3.org/Style/CSS/",
        },
        {
            id: 9,
            text: "Python Django",
            image: "/assets/icons/django.svg",
            link: "https://www.djangoproject.com/",
        },
    ];

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section id="techstack" className="grid grid-cols-12 cs-container">
            <div className="space-y-12 col-span-12 md:text-left text-center">
                <h2 className="font-bold text-5xl">
                    <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 mx-3 font-bold text-transparent">
                        /
                    </span>
                    Tech stack
                </h2>
                <div className="text-xl text-left">{t("TechStack.text")}</div>
                <div className="flex flex-col justify-center items-center place-items-center gap-12 lg:grid grid-cols-3">
                    {logos.map((logo, index) => {
                        return (
                            <motion.div
                                key={index}
                                ref={ref}
                                initial={{
                                    opacity: 0,
                                    filter: "blur(8px)",
                                }}
                                animate={
                                    isInView
                                        ? {
                                              opacity: 1,
                                              filter: "blur(0px)",
                                          }
                                        : {}
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                }}
                                className="!z-50 flex justify-center bg-light dark:bg-dark-grey-2 shadow-sm p-8 border border-muted rounded-xl w-full max-w-80 hover:scale-[1.03] transition-all duration-300 ease-in-out"
                            >
                                <Link
                                    href={logo.link}
                                    aria-label={logo.text}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src={logo.image}
                                        alt={logo.text}
                                        width={100}
                                        height={100}
                                        className="size-32 lg:size-52 object-contain select-none"
                                        draggable="false"
                                        data-title={logo.text}
                                        style={{
                                            maxWidth: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
