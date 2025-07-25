"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useMemo } from "react";
import { useTranslations } from "next-intl";

export function TechCard({
    image,
    link,
    text,
    level,
}: {
    image: string;
    link: string;
    text: string;
    level: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const t = useTranslations("HomePage.TechStack");

    // Memoize the animation variants to prevent recreation on every render
    const animationVariants = useMemo(
        () => ({
            initial: {
                opacity: 0,
                filter: "blur(8px)",
                transform: "translateY(20px)",
                pointerEvents: "none" as const,
            },
            animate: {
                opacity: 1,
                filter: "blur(0px)",
                transform: "translateY(0px)",
                pointerEvents: "all" as const,
            },
        }),
        []
    );

    // Memoize the transition object
    const transitionConfig = useMemo(
        () => ({
            duration: 0.5,
            ease: "easeOut" as const,
        }),
        []
    );

    // Memoize the level indicators array creation
    const levelIndicators = useMemo(() => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={`group-hover:rotate-0 transition-all duration-400 ease-in-out group-hover:h-2 group-hover:rounded-xs will-change-transform
                    ${
                        i < level
                            ? "bg-gradient-to-r from-blue-600 to-sky-400 h-1 w-5 -rotate-70"
                            : "h-1 w-5 -rotate-70 bg-muted-foreground"
                    }
                `}
            />
        ));
    }, [level]);

    return (
        <motion.div
            ref={ref}
            initial={animationVariants.initial}
            animate={isInView ? animationVariants.animate : {}}
            transition={transitionConfig}
            className="group !z-50 flex flex-col justify-center items-center shadow-sm p-8 border border-muted rounded-xl w-full max-w-80 hover:scale-[1.03] transition-transform duration-300 ease-in-out card-gradient"
        >
            <Link href={link} target="_blank" aria-label={text}>
                <Image
                    src={image}
                    alt={text}
                    width={100}
                    height={100}
                    className="size-32 lg:size-52 object-contain select-none"
                    draggable={false}
                />
            </Link>
            <div className="mt-2 text-muted-foreground">{t("skill")}</div>
            <div className="flex justify-center items-center gap-1 mt-2">
                <span className="font-extrabold text-muted-foreground text-2xl">
                    &lt;
                </span>
                {levelIndicators}
                <span className="font-extrabold text-muted-foreground text-2xl">
                    &gt;
                </span>
            </div>
        </motion.div>
    );
}
