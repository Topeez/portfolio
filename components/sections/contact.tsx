"use client";

import { ContactForm } from "./contact-form";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Contact() {
    const t = useTranslations("Contact");

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <section
            id="contact"
            className="bg-foreground bg-gradient-to-b from-background to-neutral-200 dark:to-neutral-900 py-16"
            ref={ref}
        >
            <motion.div
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={
                    isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                }
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col justify-center items-center space-y-8 md:text-left text-center cs-container"
            >
                <h2 className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent text-5xl">
                    {t("title")}
                </h2>
                <h3 className="font-bold text-3xl">{t("subtitle")}</h3>

                <ContactForm />
            </motion.div>
        </section>
    );
}
