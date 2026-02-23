"use client";

import { ContactForm } from "./contact-form";
import { useTranslations } from "next-intl";
import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";

const blurFade: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

export function Contact() {
    const t = useTranslations("Contact");

    return (
        <section
            id="contact"
            className="bg-foreground bg-gradient-to-b from-background to-neutral-200 dark:to-neutral-900 py-16"
        >
            <LazyMotion features={domAnimation}>
                <m.div
                    variants={blurFade}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    style={{ willChange: "transform, opacity, filter" }}
                    className="flex flex-col justify-center items-center space-y-8 md:text-left text-center cs-container"
                >
                    <h2 className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent text-5xl">
                        {t("title")}
                    </h2>
                    <h3 className="font-bold text-3xl">{t("subtitle")}</h3>

                    <ContactForm />
                </m.div>
            </LazyMotion>
        </section>
    );
}
