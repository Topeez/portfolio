export type TranslationFunction = (key: string) => string;

export const getLogos = (t: TranslationFunction) => [
        {
            id: 1,
            text: "HTML5",
            image: "/assets/icons/html-5.svg",
            experience: t("experience.3plus"),
        },
        {
            id: 2,
            text: "CSS3",
            image: "/assets/icons/css3.svg",
            experience: t("experience.3plus"),
        },
        {
            id: 3,
            text: "Tailwind CSS",
            image: "/assets/icons/tailwind.svg",
            experience: t("experience.2plus"),
        },
        {
            id: 4,
            text: "JavaScript",
            image: "/assets/icons/javascript.svg",
            experience: t("experience.3plus"),
        },
        {
            id: 5,
            text: "React",
            image: "/assets/icons/react.svg",
            experience: t("experience.1plus"),
        },
        {
            id: 6,
            text: "Next.js",
            image: "/assets/icons/nextjs.svg",
            experience: t("experience.1plus"),
        },
        {
            id: 7,
            text: "TypeScript",
            image: "/assets/icons/typescript.svg",
            experience: t("experience.1plus"),
        },
        {
            id: 8,
            text: "Python Django",
            image: "/assets/icons/django.svg",
            experience: t("experience.2plus"),
        },
        {
            id: 9,
            text: "Docker",
            image: "/assets/icons/docker.svg",
            experience: t("experience.2plus"),
        },
    ];