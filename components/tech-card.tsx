"use client";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
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

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                filter: "blur(8px)",
                transform: "translateY(20px)",
                pointerEvents: "none",
            }}
            animate={
                isInView
                    ? {
                          opacity: 1,
                          filter: "blur(0px)",
                          transform: "translateY(0px)",
                          pointerEvents: "all",
                      }
                    : {}
            }
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
            className="!z-50 flex flex-col justify-center items-center bg-background shadow-sm p-8 border border-muted rounded-xl w-full max-w-80 hover:scale-[1.03] transition-transform duration-300 ease-in-out"
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
            <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className={
                            i < level
                                ? "text-yellow-400"
                                : "text-muted-foreground"
                        }
                    >
                        ★
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
