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
import { socialMedia } from "@/components/sections/socialMedia";
import { toast } from "sonner";
import { Send } from "lucide-react";
import Link from "next/link";
import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import {
    createContactSchema,
    ContactFormValues,
} from "@/schemas/contact-form-schema";
import { useTranslations } from "next-intl";

const blurFade: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.2 },
    },
};

export function ContactForm() {
    const t = useTranslations("Contact");
    const formSchema = createContactSchema(t);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", message: "" },
    });

    const toastConfig = {
        duration: 6000,
        className: "bg-background text-foreground",
        style: { color: "#1F2937" },
    };

    const notify = (type: "success" | "error", message: string) => {
        toast(message, {
            ...toastConfig,
            style: {
                ...toastConfig.style,
                borderLeftColor: type === "success" ? "#5ca437" : "#c53030",
            },
            icon: type === "success" ? "✅" : "❌",
        });
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
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
    };

    const formFields = [
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
    ];

    return (
        <Form {...form}>
            <LazyMotion features={domAnimation}>
                <m.div
                    variants={blurFade}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mx-auto w-full md:w-1/2 form-wrapper"
                    style={{ willChange: "transform, opacity, filter" }}
                >
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 bg-background p-6 lg:p-12 rounded-2xl form-content"
                    >
                        <input
                            type="text"
                            {...form.register("honeypot" as any)}
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
                                        <FormLabel>
                                            {fieldConfig.label}
                                        </FormLabel>
                                        <FormControl>
                                            <fieldConfig.component
                                                className="focus-visible:border-blue-500 outline-none focus-visible:outline-none focus-visible:ring-0 active:ring-0 max-h-32 transition-colors"
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
                            className="group bg-foreground hover:bg-gradient-to-br from-blue-500 to-sky-400 rounded-lg w-full hover:text-foreground hover:scale-[1.01] transition-all duration-300 cursor-pointer will-change-transform"
                            type="submit"
                        >
                            {t("send")}
                            <Send className="group-hover:scale-105" />
                        </Button>

                        <div className="after:top-1/2 after:z-0 after:absolute relative after:inset-0 after:flex after:items-center after:border-border after:border-t text-sm text-center">
                            <span className="z-10 relative bg-background px-2 text-muted-foreground">
                                {t("contact")}
                            </span>
                        </div>

                        <div className="flex justify-center items-center gap-8 w-full">
                            {socialMedia.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.label}
                                    >
                                        <Icon className="fill-foreground hover:fill-blue-600 size-10 hover:scale-[1.02] transition-all duration-300 will-change-transform" />
                                        <span className="sr-only">
                                            {item.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </form>
                </m.div>
            </LazyMotion>
        </Form>
    );
}

export function Contact() {
    const t = useTranslations("Contact");

    return (
        <section id="contact" className="py-16 w-full">
            <LazyMotion features={domAnimation}>
                <m.div
                    variants={blurFade}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    className="flex flex-col justify-center items-center space-y-8 md:text-left text-center cs-container"
                    style={{ willChange: "transform, opacity, filter" }}
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
