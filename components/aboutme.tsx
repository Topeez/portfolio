"use client"

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

export function AboutMe() {
    const t = useTranslations("HomePage");
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section id="about" className="grid grid-cols-12 py-20 cs-container">
            <div className="space-y-12 col-span-12">
                <h2 className="font-bold text-5xl md:text-left text-center">
                    <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 mx-3 text-transparent">/</span>
                    {t("AboutMe.title")}
                </h2>

                <div className="items-start gap-10 grid md:grid-cols-2">
                    {/* Left: Text Summary with Accordion */}
                    <div className="space-y-4 text-muted-foreground text-xl">
                        <p className="text-foreground">
                            {t("AboutMe.text1-part1")} <span className="font-bold">{t("AboutMe.cz")}</span>{t("AboutMe.text1-part2")}
                        </p>
                        <p>{t("AboutMe.text2")}</p>

                        <Accordion
                            type="single"
                            collapsible
                            onValueChange={(value) => setIsExpanded(value === "more-content")}
                        >
                            <AccordionItem value="more-content" className="">
                                <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                    <div className="space-y-4">
                                        <p>{t("AboutMe.text3")}</p>
                                        <p>
                                            {t("AboutMe.text4")}
                                            <Link href="https://github.com/galfar-coder" className="bg-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-sky-400 font-bold hover:text-transparent transition-all ease-in-out">
                                                {t("AboutMe.galfar")}
                                            </Link>
                                        </p>
                                    </div>
                                </AccordionContent>
                                <AccordionTrigger className="group flex items-center gap-2 bg-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-sky-400 pt-0 font-normal text-foreground hover:text-transparent text-lg hover:no-underline cursor-pointer">
                                    {isExpanded ? t("AboutMe.showLess") : t("AboutMe.showMore")}
                                </AccordionTrigger>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Right: Timeline */}
                    <div className="relative space-y-6 ml-8 pl-6 border-border border-l">
                        <TimelineItem icon={<FaGraduationCap />} year="2022" text={t("AboutMe.Timeline.text1")} />
                        <TimelineItem icon={<FaTrophy />} year="2023" text={t("AboutMe.Timeline.text2")} />
                        <TimelineItem icon={<FaTrophy />} year="2024" text={t("AboutMe.Timeline.text3")} />
                        <TimelineItem icon={<FaReact />} year="2025" text={t("AboutMe.Timeline.text4")} />
                        <TimelineItem icon={<FaCodeBranch />} year="2025" text={t("AboutMe.Timeline.text5")} />
                    </div>
                </div>
            </div>
        </section>
    );
}

// TimelineItem remains the same
function TimelineItem({ icon, year, text }: { icon: React.ReactNode; year: string; text: string }) {
    return (
        <div className="relative pl-8">
            <div className="top-3 left-[-34px] absolute text-blue-600 text-xl">{icon}</div>
            <p className="font-mono text-muted-foreground text-sm">{year}</p>
            <p className="text-foreground text-base">{text}</p>
        </div>
    );
}