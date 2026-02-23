"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import {
    FaReact,
    FaGraduationCap,
    FaTrophy,
    FaCodeBranch,
} from "react-icons/fa";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { AmbientGlow } from "../utils/ambient-glow";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

export default function AboutMe() {
    const t = useTranslations("HomePage");
    const [isExpanded, setIsExpanded] = useState(false);

    const timelineData = [
        {
            icon: <FaGraduationCap />,
            year: "2022",
            text: t("AboutMe.Timeline.text1"),
        },
        { icon: <FaTrophy />, year: "2023", text: t("AboutMe.Timeline.text2") },
        { icon: <FaTrophy />, year: "2024", text: t("AboutMe.Timeline.text3") },
        { icon: <FaReact />, year: "2025", text: t("AboutMe.Timeline.text4") },
        {
            icon: <FaCodeBranch />,
            year: "2025",
            text: t("AboutMe.Timeline.text5"),
        },
    ];

    const handleAccordionChange = (value: string) =>
        setIsExpanded(value === "more-content");

    return (
        <section
            id="about"
            className="relative grid grid-cols-12 py-6 md:py-44 overflow-hidden"
        >
            <div className="hidden lg:block absolute inset-0">
                <AmbientGlow />
            </div>

            <div className="z-10 relative space-y-12 col-span-12 backdrop-blur-2xl p-12 lg:border border-muted dark:border-[#141414] rounded-2xl cs-container">
                <h2 className="font-bold text-5xl md:text-left text-center">
                    <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 mx-3 text-transparent">
                        /
                    </span>
                    {t("AboutMe.title")}
                </h2>

                <div className="items-start gap-10 grid md:grid-cols-2">
                    <div className="space-y-4 text-muted-foreground text-xl">
                        <p className="text-foreground">
                            {t("AboutMe.text1-part1")}{" "}
                            <span className="font-bold">{t("AboutMe.cz")}</span>
                            {t("AboutMe.text1-part2")}
                        </p>
                        <p>{t("AboutMe.text2")}</p>
                        <Accordion
                            type="single"
                            collapsible
                            onValueChange={handleAccordionChange}
                        >
                            <AccordionItem
                                value="more-content"
                                className="text-base"
                            >
                                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                    <div className="space-y-4">
                                        <p>{t("AboutMe.text3")}</p>
                                        <p>
                                            {t("AboutMe.text4")}
                                            <Link
                                                href="https://github.com/galfar-coder"
                                                className="bg-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-sky-400 font-bold hover:text-transparent transition-all ease-in-out"
                                                target="_blank"
                                            >
                                                {t("AboutMe.galfar")}
                                            </Link>
                                        </p>
                                    </div>
                                </AccordionContent>
                                <AccordionTrigger className="group flex items-center gap-2 bg-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-sky-400 pt-0 font-normal text-foreground hover:text-transparent text-lg hover:no-underline cursor-pointer">
                                    {isExpanded
                                        ? t("AboutMe.showLess")
                                        : t("AboutMe.showMore")}
                                </AccordionTrigger>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <LazyMotion features={domAnimation}>
                        <m.div
                            className="relative space-y-6 ml-8 pl-6 border-gray-600 border-l"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {timelineData.map((item, index) => (
                                <m.div
                                    key={index}
                                    variants={itemVariants}
                                    style={{
                                        willChange:
                                            "transform, opacity, filter",
                                    }}
                                    className="relative pl-8"
                                >
                                    <div className="top-3 left-[-34px] absolute text-blue-600 text-xl">
                                        {item.icon}
                                    </div>
                                    <p className="font-mono text-muted-foreground text-sm">
                                        {item.year}
                                    </p>
                                    <p className="text-foreground text-base">
                                        {item.text}
                                    </p>
                                </m.div>
                            ))}
                        </m.div>
                    </LazyMotion>
                </div>
            </div>
        </section>
    );
}
