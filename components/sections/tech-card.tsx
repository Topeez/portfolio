"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useMemo } from "react";

export function TechCard({
    image,
    link,
    text,
    experience,
}: {
    image: string;
    link: string;
    text: string;
    experience?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

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
                    className="size-32 lg:size-52 object-contain group-hover:scale-110 transition-transform duration-300 select-none"
                    draggable={false}
                />
            </Link>
            <div className="mt-4 font-semibold text-foreground text-lg">
                {text}
            </div>
            {experience && (
                <div className="mt-1 text-muted-foreground text-sm">
                    {experience}
                </div>
            )}
        </motion.div>
    );
}
