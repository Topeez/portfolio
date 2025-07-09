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
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function ContactForm() {
    const t = useTranslations("Contact");

    // Define schema INSIDE component to use translations
    const formSchema = z.object({
        name: z.string().min(2, {
            message: t("errors.name.tooShort"),
        }),
        email: z.string().email({
            message: t("errors.email.invalid"),
        }),
        message: z.string().min(10, {
            message: t("errors.message.tooShort"),
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const { error } = await response.json();
                console.error("Chyba: ", error);
                notify("error", t("submitError"));
                return;
            }

            notify("success", t("submitSuccess"));
            form.reset();
        } catch (error) {
            console.error("Chyba při odesílání: ", error);
            notify("error", t("submitError"));
        }
    }

    // Keep your notify function exactly as is
    function notify(type: "success" | "error", message: string) {
        toast(message, {
            duration: 6000,
            className: "bg-background text-foreground",
            style: {
                color: "#1F2937",
                borderLeftColor: type === "success" ? "#5ca437" : "#c53030",
            },
            icon: type === "success" ? "✅" : "❌",
        });
    }

    const formRef = useRef(null);
    const isFormInView = useInView(formRef, { once: true });

    return (
        <Form {...form}>
            <motion.form
                ref={formRef}
                initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                animate={
                    isFormInView
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : {}
                }
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mx-auto p-12 border rounded-2xl w-full md:w-1/2"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("name")}</FormLabel>
                            <FormControl>
                                <Input
                                    className="focus-visible:border-blue-500 outline-none focus-visible:outline-none focus-visible:ring-0 active:ring-0 transition-colors"
                                    placeholder={t("name-placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("email")}</FormLabel>
                            <FormControl>
                                <Input
                                    className="focus-visible:border-blue-600 outline-none focus-visible:outline-none focus-visible:ring-0 active:ring-0 transition-colors"
                                    placeholder={t("email-placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("message")}</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="focus-visible:border-blue-500 outline-none focus-visible:outline-none focus-visible:ring-0 active:ring-0 transition-colors"
                                    placeholder={t("message-placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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

                <div className="flex justify-between items-center w-full">
                    {socialMedia.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link key={index} href={item.link} target="_blank">
                                <Icon className="fill-foreground hover:fill-blue-600 size-10 hover:scale-[1.02] transition-all duration-300 will-change-transform" />
                            </Link>
                        );
                    })}
                </div>
            </motion.form>
        </Form>
    );
}
