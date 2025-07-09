import LocaleProvider from "../../providers/LocaleProvider";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Frontend Developer",
    description: "Professional portfolio of a frontend developer",
};

export default async function RootLayout(
    props: {
        children: ReactNode;
        params: Promise<{ locale: string }>;
    }
) {
    const params = await props.params;

    const {
        locale
    } = params;

    const {
        children
    } = props;

    let messages = {};

    try {
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${inter.className} antialiased relative`}>
                <LocaleProvider locale={locale} messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                    >
                        {children}
                        <SpeedInsights />
                        <Toaster />
                    </ThemeProvider>
                </LocaleProvider>
            </body>
        </html>
    );
}