import LocaleProvider from "../../providers/LocaleProvider";
import { ReactNode } from "react";
import { metadata as baseMetadata } from "../../seo/seo-schema";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/utils/theme-provider";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BackToTop } from "@/components/utils/back-to-top";
import { SmoothScroll } from "@/components/utils/smooth-scroll";
import { Metadata } from "next";

export function generateStaticParams() {
    return [{ locale: "en" }, { locale: "cz" }];
}

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = baseMetadata;

export default async function RootLayout(props: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;
    const { locale } = params;
    const { children } = props;

    const supportedLocales = ["en", "cz"];
    const validLocale = supportedLocales.includes(locale) ? locale : "en";

    let messages = {};
    try {
        messages = (await import(`@/messages/${validLocale}.json`)).default;
    } catch (error) {
        console.error(
            `Failed to load messages for locale: ${validLocale}`,
            error,
        );

        if (validLocale !== "en") {
            try {
                messages = (await import(`@/messages/en.json`)).default;
            } catch (fallbackError) {
                console.error(
                    "Failed to load fallback English messages:",
                    fallbackError,
                );
            }
        }
    }

    const defaultTimeZones: Record<string, string> = {
        en: "Europe/London",
        cz: "Europe/Prague",
    };

    const timeZone = defaultTimeZones[validLocale] || "UTC";

    return (
        <html lang={validLocale} suppressHydrationWarning>
            <head>
                <meta name="format-detection" content="telephone=no" />
                <meta
                    name="theme-color"
                    content="#ffffff"
                    media="(prefers-color-scheme: light)"
                />
                <meta
                    name="theme-color"
                    content="#000000"
                    media="(prefers-color-scheme: dark)"
                />

                {/* Preconnect to external domains for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />

                {/* Structured data for better SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Ondřej Topínka",
                            jobTitle: "Frontend Developer",
                            description:
                                "Experienced Frontend Developer specializing in React, Next.js, and modern web technologies",
                            url: "https://topeeez.cz",
                            sameAs: [
                                "https://linkedin.com/in/yourprofile",
                                "https://github.com/yourusername",
                                "https://twitter.com/yourusername",
                            ],
                            address: {
                                "@type": "PostalAddress",
                                addressLocality: "Prague",
                                addressCountry: "Czech Republic",
                            },
                            knowsAbout: [
                                "React",
                                "Next.js",
                                "TypeScript",
                                "JavaScript",
                                "HTML",
                                "CSS",
                                "Node.js",
                                "Web Development",
                                "Frontend Development",
                                "UI/UX Design",
                            ],
                        }),
                    }}
                />
            </head>
            <body
                className={`${inter.className} overflow-clip antialiased relative`}
            >
                <LocaleProvider
                    locale={validLocale}
                    messages={messages}
                    timeZone={timeZone}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                    >
                        <SmoothScroll>
                            {children}
                            <BackToTop />
                            <SpeedInsights />
                            <Toaster />
                        </SmoothScroll>
                    </ThemeProvider>
                </LocaleProvider>
            </body>
        </html>
    );
}
