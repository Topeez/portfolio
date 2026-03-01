import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://topeeez.cz"),

    title: {
        default: "Ondřej Topínka - Frontend Developer & UI/UX Designer",
        template: "%s | Ondřej Topínka - Frontend Developer",
    },
    description:
        "Experienced Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies. Creating responsive, user-friendly web applications with focus on performance and accessibility.",

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

    authors: [{ name: "Ondřej Topínka", url: "https://topeeez.cz" }],
    creator: "Ondřej Topínka",
    publisher: "Ondřej Topínka",

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
                url: "/og-image-square.jpg",
                width: 1200,
                height: 1200,
                alt: "Ondřej Topínka - Frontend Developer",
                type: "image/jpeg",
            },
        ],
    },

  
    category: "Technology",
    classification: "Portfolio Website",

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

    verification: {
        google: "	google-site-verification=0DnDrwVUQ-fbq7JrpY1OF69zEKilb3OUMyAJ0WXiE50",

    },

    manifest: "/manifest.json",

    alternates: {
        canonical: "https://topeeez.cz",
        languages: {
            "en-US": "https://topeeez.cz/en",
            "cs-CZ": "https://topeeez.cz/cz",
        },
    },

    other: {
        "theme-color": "#2563eb", 
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