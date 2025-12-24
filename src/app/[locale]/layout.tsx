import LocaleProvider from "../../providers/LocaleProvider";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/utils/theme-provider";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BackToTop } from "@/components/utils/back-to-top";

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'cz' }];
}

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

// Enhanced metadata with comprehensive SEO optimization
export const metadata: Metadata = {
    metadataBase: new URL("https://topeeez.cz"),

    // Basic metadata
    title: {
        default: "Ondřej Topínka - Frontend Developer & UI/UX Designer",
        template: "%s | Ondřej Topínka - Frontend Developer",
    },
    description:
        "Experienced Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies. Creating responsive, user-friendly web applications with focus on performance and accessibility.",

    // Keywords for SEO
    keywords: [
        "frontend developer",
        "React developer",
        "Next.js developer",
        "TypeScript developer",
        "JavaScript developer",
        "web developer",
        "UI/UX designer",
        "portfolio",
        "Czech Republic",
        "Prague",
        "freelancer",
        "web applications",
        "responsive design",
    ],

    // Author information
    authors: [{ name: "Ondřej Topínka", url: "https://topeeez.cz" }],
    creator: "Ondřej Topínka",
    publisher: "Ondřej Topínka",

    // Open Graph metadata for social sharing
    openGraph: {
        type: "website",
        locale: "en_US",
        alternateLocale: ["cs_CZ"],
        url: "https://topeeez.cz",
        siteName: "Ondřej Topínka - Frontend Developer Portfolio",
        title: "Ondřej Topínka - Frontend Developer & UI/UX Designer",
        description:
            "Experienced Frontend Developer creating modern web applications with React, Next.js, and TypeScript. View my portfolio of projects and get in touch for collaboration.",
        images: [
            {
                url: "/og-image.jpg", // Create this image (1200x630px)
                width: 1200,
                height: 630,
                alt: "Ondřej Topínka - Frontend Developer Portfolio",
                type: "image/jpeg",
            },
            {
                url: "/og-image-square.jpg", // Square version for some platforms
                width: 1200,
                height: 1200,
                alt: "Ondřej Topínka - Frontend Developer",
                type: "image/jpeg",
            },
        ],
    },

    // Additional metadata
    category: "Technology",
    classification: "Portfolio Website",

    // Robots and indexing
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    // Verification codes (add these if you use these services)
    verification: {
        google: "	google-site-verification=0DnDrwVUQ-fbq7JrpY1OF69zEKilb3OUMyAJ0WXiE50",
        // yandex: "your-yandex-verification-code",
        // bing: "your-bing-verification-code"
    },

    // Manifest and icons (simplified - Next.js will auto-serve from /public)
    manifest: "/manifest.json",

    // Alternate languages
    alternates: {
        canonical: "https://topeeez.cz",
        languages: {
            "en-US": "https://topeeez.cz/en",
            "cs-CZ": "https://topeeez.cz/cz",
        },
    },

    // Additional meta tags
    other: {
        "theme-color": "#ffffff", // Your brand color
        "color-scheme": "light dark",
        "mobile-web-app-capable": "yes",
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "default",
        "apple-mobile-web-app-title": "Ondřej Topínka Portfolio",
        "application-name": "Ondřej Topínka Portfolio",
        "msapplication-TileColor": "#ffffff",
        "msapplication-config": "/browserconfig.xml",
    },
};

export default async function RootLayout(props: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;
    const { locale } = params;
    const { children } = props;

    // Validate locale against your supported locales
    const supportedLocales = ["en", "cz"];
    const validLocale = supportedLocales.includes(locale) ? locale : "en";

    let messages = {};
    try {
        messages = (await import(`@/messages/${validLocale}.json`)).default;
    } catch (error) {
        console.error(
            `Failed to load messages for locale: ${validLocale}`,
            error
        );
        // Fallback to English if the specific locale fails
        if (validLocale !== "en") {
            try {
                messages = (await import(`@/messages/en.json`)).default;
            } catch (fallbackError) {
                console.error(
                    "Failed to load fallback English messages:",
                    fallbackError
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
                {/* Additional meta tags that can't be set via Metadata API */}
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
            <body className={`${inter.className} antialiased relative`}>
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
                        {children}
                        <BackToTop />
                        <SpeedInsights />
                        <Toaster />
                    </ThemeProvider>
                </LocaleProvider>
            </body>
        </html>
    );
}
