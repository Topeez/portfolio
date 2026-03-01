"use client";

import { getLogos } from "@/src/data/tech-cards";
import { TechCard } from "@/components/sections/tech-card";
import { LazyMotion, m, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Lightbulb } from "lucide-react";

const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export function TechStack() {
    const t = useTranslations("HomePage.TechStack");
    const logos = getLogos(t);

    return (
        <section
            id="techstack"
            className="relative grid grid-cols-12 cs-container"
        >
            <LazyMotion
                features={() =>
                    import("framer-motion").then((mod) => mod.domMax)
                }
            >
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

                    <div className="flex flex-col items-start gap-2 text-xl text-left">
                        {t("text")}{" "}
                        <span className="inline-flex items-center gap-2 font-light text-muted-foreground text-sm">
                            <Lightbulb size={20} className="text-sky-400" />
                            {t("text2")}
                        </span>
                    </div>

                    <div className="place-items-center gap-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {logos.map((logo) => (
                            <m.div
                                key={logo.id}
                                variants={cardVariants}
                                className="relative w-full max-w-80 h-[350px]"
                            >
                                <m.div
                                    className="z-10 absolute inset-0 cursor-grab active:cursor-grabbing"
                                    style={{ touchAction: "none" }}
                                    drag
                                    dragConstraints={{
                                        left: -50,
                                        right: 50,
                                        top: -50,
                                        bottom: 50,
                                    }}
                                    dragElastic={0.4}
                                    whileDrag={{ scale: 1.1, zIndex: 50 }}
                                    dragTransition={{
                                        bounceStiffness: 200,
                                        bounceDamping: 20,
                                    }}
                                >
                                    <div className="h-full pointer-events-auto">
                                        <TechCard
                                            image={logo.image}
                                            text={logo.text}
                                            experience={logo.experience}
                                        />
                                    </div>
                                </m.div>
                            </m.div>
                        ))}
                    </div>
                </m.div>
            </LazyMotion>
        </section>
    );
}
