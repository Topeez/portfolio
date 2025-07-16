"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { socialMedia } from "@/components/socialMedia";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useMemo, useCallback } from "react";

export function ContactForm() {
    const t = useTranslations("Contact");

    // Memoize form schema to prevent recreation on every render
    const formSchema = useMemo(
        () =>
            z.object({
                name: z.string().min(2, {
                    message: t("errors.name.tooShort"),
                }),
                email: z.string().email({
                    message: t("errors.email.invalid"),
                }),
                message: z.string().min(10, {
                    message: t("errors.message.tooShort"),
                }),
            }),
        [t]
    );

    // Memoize form configuration
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    // Memoize toast configuration to prevent recreation
    const toastConfig = useMemo(
        () => ({
            duration: 6000,
            className: "bg-background text-foreground",
            style: {
                color: "#1F2937",
            },
        }),
        []
    );

    // Memoize notify function
    const notify = useCallback(
        (type: "success" | "error", message: string) => {
            toast(message, {
                ...toastConfig,
                style: {
                    ...toastConfig.style,
                    borderLeftColor: type === "success" ? "#5ca437" : "#c53030",
                },
                icon: type === "success" ? "✅" : "❌",
            });
        },
        [toastConfig]
    );

    // Memoize submit handler
    const onSubmit = useCallback(
        async (values: z.infer<typeof formSchema>) => {
            try {
                // Add honeypot field to detect bots
                const payload = {
                    ...values,
                    honeypot: "", // Empty honeypot field
                };

                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error("Chyba: ", data.error);
                    notify("error", t("submitError"));
                    return;
                }

                notify("success", t("submitSuccess"));
                form.reset();
            } catch (error) {
                console.error("Chyba při odesílání: ", error);
                notify("error", t("submitError"));
            }
        },
        [notify, t, form]
    );

    // Memoize animation variants
    const animationVariants = useMemo(
        () => ({
            initial: { opacity: 0, y: 40, filter: "blur(6px)" },
            animate: { opacity: 1, y: 0, filter: "blur(0px)" },
            transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
        }),
        []
    );

    // Memoize social media links to prevent recreation
    const socialMediaLinks = useMemo(
        () =>
            socialMedia.map((item, index) => {
                const Icon = item.icon;
                return (
                    <Link
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon className="fill-foreground hover:fill-blue-600 size-10 hover:scale-[1.02] transition-all duration-300 will-change-transform" />
                    </Link>
                );
            }),
        []
    );

    const formRef = useRef(null);
    const isFormInView = useInView(formRef, { once: true });

    // Memoize form fields configuration
    const formFields = useMemo(
        () => [
            {
                name: "name" as const,
                label: t("name"),
                placeholder: t("name-placeholder"),
                component: Input,
            },
            {
                name: "email" as const,
                label: t("email"),
                placeholder: t("email-placeholder"),
                component: Input,
            },
            {
                name: "message" as const,
                label: t("message"),
                placeholder: t("message-placeholder"),
                component: Textarea,
            },
        ],
        [t]
    );

    return (
        <Form {...form}>
            <motion.div
                ref={formRef}
                initial={animationVariants.initial}
                animate={isFormInView ? animationVariants.animate : {}}
                transition={animationVariants.transition}
                className="mx-auto w-full md:w-1/2 form-wrapper"
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 bg-background p-12 rounded-2xl form-content"
                >
                    {/* Honeypot field - hidden from users but visible to bots */}
                    <input
                        type="text"
                        name="honeypot"
                        style={{ display: "none" }}
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    {formFields.map((fieldConfig) => (
                        <FormField
                            key={fieldConfig.name}
                            control={form.control}
                            name={fieldConfig.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{fieldConfig.label}</FormLabel>
                                    <FormControl>
                                        <fieldConfig.component
                                            className="focus-visible:border-blue-500 outline-none focus-visible:outline-none focus-visible:ring-0 active:ring-0 transition-colors"
                                            placeholder={
                                                fieldConfig.placeholder
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <Button
                        className="group hover:bg-gradient-to-br from-blue-500 to-sky-400 rounded-lg w-full hover:text-foreground hover:scale-[1.01] transition-all duration-300 cursor-pointer will-change-transform"
                        type="submit"
                    >
                        {t("send")}
                        <Send className="group-hover:scale-105" />
                    </Button>

                    <div className="after:top-1/2 after:z-0 after:absolute relative after:inset-0 after:flex after:items-center after:border-t after:border-border text-sm text-center">
                        <span className="z-10 relative bg-background px-2 text-muted-foreground">
                            {t("contact")}
                        </span>
                    </div>

                    <div className="flex justify-center items-center gap-8 w-full">
                        {socialMediaLinks}
                    </div>
                </form>
            </motion.div>
        </Form>
    );
}

// Optimized Contact component
export function Contact() {
    const t = useTranslations("Contact");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Memoize animation config
    const animationConfig = useMemo(
        () => ({
            initial: { opacity: 0, y: 40, filter: "blur(8px)" },
            animate: isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
            transition: { duration: 0.6, ease: "easeOut" },
        }),
        [isInView]
    );

    return (
        <section id="contact" className="py-16 w-full" ref={ref}>
            <motion.div
                initial={animationConfig.initial}
                animate={animationConfig.animate}
                transition={animationConfig.transition}
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
