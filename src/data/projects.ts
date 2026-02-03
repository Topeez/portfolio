export type Project = {
    id: string; 
    translationKey: string; 
    slug: string; 
    images: string[];
    technologies: string[];
    github?: string;
    demo?: string;
    inProgress: boolean;
    featured: boolean; 
};

export const projects: Project[] = [
    {
        id: "tv-rozvrh",
        slug: "tv-rozvrh",
        featured: false,
        translationKey: "tv-rozvrh",
        images: [
            "/assets/img/projects/tv_rozvrh_1.png"
        ],
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
        images: [
            "/assets/img/projects/tda_homepage_1.png"
        ],
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
        images: [
            "/assets/img/projects/zenith.png"
        ],
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
        images: [
            "/assets/img/projects/web_skoly.png"
        ],
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
        images: [
            "/assets/img/projects/majktravas.png"
        ],
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
        images: [
            "/assets/img/projects/urvtek.png"
        ],
        technologies: ["React", "Next.js", "Tailwind CSS", "shadcn UI", "api"],
        github: "",
        demo: "",
        inProgress: true,
    },
    {
        id: "gamedex",
        slug: "gamedex",
        featured: false,
        translationKey: "gamedex",
        images: [
            "/assets/img/projects/rooksite.png"
        ],
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
        images: [
            "/assets/img/projects/flock layout.png"
        ],
        technologies: ["React", "Next.js", "Tailwind CSS", "shadcn UI"],
        github: "",
        demo: "",
        inProgress: true,
    },
    {
        id: "sidebyside",
        slug: "sidebyside",
        featured: true,
        translationKey: "sidebyside",
        images: [
            "/assets/img/projects/sidebyside/sidebyside-dashboard.png",
            "/assets/img/projects/sidebyside/sidebyside-profile.png",
            "/assets/img/projects/sidebyside/sidebyside-settings.png",
            "/assets/img/projects/sidebyside/sidebyside-couple.png"
        ],
        technologies: ["React", "Next.js", "Tailwind CSS", "shadcn UI", "api", "db"],
        github: "https://github.com/Topeez/SideBySide",
        demo: "https://side-by-side-nu.vercel.app",
        inProgress: true,
    },
];
