"use client";

import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import { ReactNode } from "react";

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
    hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export function ProjectsGridAnimator({ children }: { children: ReactNode }) {
    return (
        <LazyMotion features={domAnimation}>
            <m.div
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
                {children}
            </m.div>
        </LazyMotion>
    );
}

export function ProjectCardAnimator({ children }: { children: ReactNode }) {
    return (
        <m.div
            variants={cardVariants}
            style={{ willChange: "transform, opacity, filter" }}
            className="h-full"
        >
            {children}
        </m.div>
    );
}
