"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useRef } from "react";
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
import {
    m,
    LazyMotion,
    domAnimation,
    useScroll,
    useTransform,
} from "framer-motion";
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
    const timelineRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 60%", "end center"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
                            ref={timelineRef}
                            className="relative space-y-6 ml-8 pl-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className="top-3 bottom-0 left-0 absolute dark:bg-gray-600 bg-border w-[2px]" />

                            <m.div
                                className="top-3 left-0 z-0 absolute bg-gradient-to-b from-blue-600 to-sky-400 w-[2px]"
                                style={{
                                    height: lineHeight,
                                    willChange: "height",
                                }}
                            />

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
                                    <div className="top-1 left-[-40px] z-10 absolute flex justify-center items-center bg-background p-1 rounded-full text-blue-600 text-xl transition-colors duration-300">
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
