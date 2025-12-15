export type Project = {
    id: string; // Unique ID, good for React keys
    translationKey: string; // Matches the key in your JSON (e.g., "tv-rozvrh")
    slug: string; // For the URL (e.g., /projects/tv-rozvrh)
    image: string;
    technologies: string[];
    github?: string;
    demo?: string;
    inProgress: boolean;
    featured: boolean; // true = show in home carousel
};

export const projects: Project[] = [
    {
        id: "tv-rozvrh",
        slug: "tv-rozvrh",
        featured: false,
        translationKey: "tv-rozvrh",
        image: "/assets/img/projects/tv_rozvrh_1.png",
        technologies: ["PHP", "JavaScript", "CSS3", "Python"],
        github: "#",
        demo: "https://tv.mesosdev.cz",
        inProgress: false,
    },
    {
        id: "tda25",
        slug: "tda25",
        featured: false,
        translationKey: "tda25",
        image: "/assets/img/projects/tda_homepage_1.png",
        technologies: [
            "Python",
            "Typescript",
            "Tailwind CSS",
            "api",
            "Docker",
            "Node.js",
        ],
        github: "#",
        demo: "#",
        inProgress: false,
    },
    {
        id: "zenith",
        slug: "zenith",
        featured: true,
        translationKey: "zenith",
        image: "/assets/img/projects/zenith.png",
        technologies: ["React", "Next.js", "Tailwind CSS", "api", "Node.js"],
        github: "https://github.com/galfar-coder/zenith",
        demo: "#",
        inProgress: true,
    },
    {
        id: "mesosweb",
        slug: "mesosweb",
        featured: false,
        translationKey: "mesosweb",
        image: "/assets/img/projects/web_skoly.png",
        technologies: ["PHP", "WordPress", "template"],
        github: "#",
        demo: "https://sos.mesosdev.cz/",
        inProgress: true,
    },
    {
        id: "travasstineni",
        slug: "travasstineni",
        featured: true,
        translationKey: "travasstineni",
        image: "/assets/img/projects/majktravas.png",
        technologies: ["React", "Next.js", "Tailwind CSS", "shadcn UI", "API"],
        github: "https://github.com/Topeez/majktravasweb",
        demo: "https://travasstineni.cz",
        inProgress: false,
    },
    {
        id: "urvtek",
        slug: "urvtek",
        featured: false,
        translationKey: "urvtek",
        image: "/assets/img/projects/urvtek.png",
        technologies: ["React", "Next.js", "Tailwind CSS", "shadcn UI", "api"],
        github: "",
        demo: "",
        inProgress: true,
    },
    {
        id: "gamedex",
        slug: "gamedex",
        featured: true,
        translationKey: "gamedex",
        image: "/assets/img/projects/rooksite.png",
        technologies: [
            "React",
            "Next.js",
            "Tailwind CSS",
            "shadcn UI",
            "api",
            "Prisma",
            "SQLite",
            "db",
        ],
        github: "",
        demo: "",
        inProgress: true,
    },
    {
        id: "flock",
        slug: "flock",
        featured: false,
        translationKey: "flock",
        image: "/assets/img/projects/flock layout.png",
        technologies: ["React", "Next.js", "Tailwind CSS", "shadcn UI"],
        github: "",
        demo: "",
        inProgress: true,
    },
];
