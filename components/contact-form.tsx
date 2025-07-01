"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

export function ContactForm() {
    const t = useTranslations("Contact")

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
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

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
                borderLeftColor: type === "success" ? "#5ca437" : "#c53030"
            },
            icon: type === "success" ? "✅" : "❌"
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto p-12 border rounded-2xl w-full md:w-1/2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("name")}</FormLabel>
                            <FormControl>
                                <Input className="focus-visible:border-blue-500 outline-none focus-visible:outline-none focus-visible:ring-0 active:ring-0 transition-colors" placeholder={t("name-placeholder")} {...field} />
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
                                <Input className="focus-visible:border-blue-600 outline-none focus-visible:outline-none focus-visible:ring-0 active:ring-0 transition-colors" placeholder={t("email-placeholder")} {...field} />
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
                                <Textarea className="focus-visible:border-blue-500 outline-none focus-visible:outline-none focus-visible:ring-0 active:ring-0 transition-colors" placeholder={t("message-placeholder")} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="hover:bg-gradient-to-br from-blue-500 to-sky-400 rounded-lg w-full hover:text-foreground hover:scale-[1.01] transition-all duration-300 cursor-pointer will-change-transform" type="submit">{t("send")}</Button>
            </form>
        </Form>
    )
}