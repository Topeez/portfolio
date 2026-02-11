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
import { motion, useInView } from "framer-motion";
import { AmbientGlow } from "../utils/ambient-glow";

// Removed 'memo' wrapper
function AboutMe() {
    const t = useTranslations("HomePage");
    const [isExpanded, setIsExpanded] = useState(false);

    // Static data defined directly inside render is fine with Compiler.
    // It will hoist this automatically.
    const timelineData = [
        {
            icon: <FaGraduationCap />,
            year: "2022",
            text: t("AboutMe.Timeline.text1"),
        },
        {
            icon: <FaTrophy />,
            year: "2023",
            text: t("AboutMe.Timeline.text2"),
        },
        {
            icon: <FaTrophy />,
            year: "2024",
            text: t("AboutMe.Timeline.text3"),
        },
        {
            icon: <FaReact />,
            year: "2025",
            text: t("AboutMe.Timeline.text4"),
        },
        {
            icon: <FaCodeBranch />,
            year: "2025",
            text: t("AboutMe.Timeline.text5"),
        },
    ];

    const handleAccordionChange = (value: string) =>
        setIsExpanded(value === "more-content");

    // Mapping is fast; no useMemo needed.
    const timelineItems = timelineData.map((item, index) => (
        <TimelineItem
            key={index}
            icon={item.icon}
            year={item.year}
            text={item.text}
            index={index}
        />
    ));

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
                    {/* Left: Text Summary with Accordion */}
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
                            <AccordionItem value="more-content" className="">
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

                    {/* Right: Timeline */}
                    <div className="relative space-y-6 ml-8 pl-6 border-gray-600 border-l">
                        {timelineItems}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({
    icon,
    year,
    text,
    index,
}: {
    icon: React.ReactNode;
    year: string;
    text: string;
    index: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const initial = { opacity: 0, y: 40, filter: "blur(8px)" };
    const animate = isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {};
    const transition = { duration: 0.5, delay: index * 0.25 };

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={animate}
            transition={transition}
            className="relative pl-8"
        >
            <div className="top-3 left-[-34px] absolute text-blue-600 text-xl">
                {icon}
            </div>
            <p className="font-mono text-muted-foreground text-sm">{year}</p>
            <p className="text-foreground text-base">{text}</p>
        </motion.div>
    );
}

export default AboutMe;
