"use client";

import { Button } from "@/components/ui/button";
import {
    BadgeCheck,
    Construction,
    ExternalLink,
    GitBranch,
} from "lucide-react";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Spacer } from "@/components/utils/spacer";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion, useInView } from "framer-motion";
import { useRef, useMemo, memo, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const Projects = memo(function Projects() {
    const t = useTranslations("HomePage.Projects");
    const [api, setApi] = useState<CarouselApi>();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const autoplayRef = useRef(
        Autoplay({
            delay: 10000,
        })
    );

    // Memoize the project data to prevent recreation on every render
    const projectData = useMemo(
        () => [
            {
                id: 1,
                image: "/assets/img/projects/tv_rozvrh_1.png",
                technologies: ["PHP", "JavaScript", "CSS3", "Python"],
                github: "#",
                demo: "https://tv.mesosdev.cz",
                inProggress: false,
            },
            {
                id: 2,
                image: "/assets/img/projects/tda_homepage_1.png",
                technologies: [
                    "Python",
                    "Typescript",
                    "Tailwind CSS",
                    t("api"),
                    "Docker",
                    "Node.js",
                ],
                github: "#",
                demo: "#",
                inProggress: false,
            },
            {
                id: 3,
                image: "/assets/img/projects/zenith.png",
                technologies: [
                    "React",
                    "Next.js",
                    "Tailwind CSS",
                    t("api"),
                    "Node.js",
                ],
                github: "https://github.com/galfar-coder/zenith",
                demo: "#",
                inProggress: true,
            },
            {
                id: 4,
                image: "/assets/img/projects/web_skoly.png",
                technologies: ["PHP", "WordPress", t("template")],
                github: "#",
                demo: "https://sos.mesosdev.cz/",
                inProggress: true,
            },
            {
                id: 5,
                image: "/assets/img/projects/majktravas.png",
                technologies: [
                    "React",
                    "Next.js",
                    "Tailwind CSS",
                    "shadcn UI",
                    t("api"),
                ],
                github: "https://github.com/Topeez/majktravasweb",
                demo: "https://travasstineni.cz",
                inProggress: false,
            },
            {
                id: 6,
                image: "/assets/img/projects/urvtek.png",
                technologies: [
                    "React",
                    "Next.js",
                    "Tailwind CSS",
                    "shadcn UI",
                    t("api"),
                ],
                github: "",
                demo: "",
                inProggress: true,
            },
            {
                id: 7,
                image: "/assets/img/projects/rooksite.png",
                technologies: [
                    "React",
                    "Next.js",
                    "Tailwind CSS",
                    "shadcn UI",
                    t("api"),
                    "Prisma",
                    "SQLite",
                    t("db"),
                ],
                github: "",
                demo: "",
                inProggress: true,
            },
            {
                id: 8,
                image: "/assets/img/projects/flock layout.png",
                technologies: ["React", "Next.js", "Tailwind CSS", "shadcn UI"],
                github: "",
                demo: "",
                inProggress: true,
            },
        ],
        [t]
    );

    // Track the selected carousel index
    const onSelect = useCallback(() => {
        if (!api) return;
        setSelectedIndex(api.selectedScrollSnap());
    }, [api]);

    // Set up event listener for carousel selection changes
    useEffect(() => {
        if (!api) return;

        onSelect();
        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api, onSelect]);

    const handleDotClick = useCallback(
        (index: number) => {
            api?.scrollTo(index);
            autoplayRef.current.reset();
        },
        [api]
    );

    // Memoize the carousel items to prevent recreation on every render
    const carouselItems = useMemo(
        () =>
            projectData.map((project, index) => {
                const projectIndex = index + 1;
                const isSelected = selectedIndex === index;

                return (
                    <CarouselItem
                        key={project.id}
                        className="pl-4 md:basis-1/2"
                    >
                        <AnimatedCard
                            index={index}
                            image={project.image}
                            github={project.github}
                            demo={project.demo}
                            t={t}
                            projectIndex={projectIndex}
                            technologies={project.technologies}
                            inProgress={project.inProggress}
                            isSelected={isSelected}
                        />
                    </CarouselItem>
                );
            }),
        [projectData, t, selectedIndex]
    );

    return (
        <section id="projects" className="grid grid-cols-12 cs-container">
            <div className="space-y-4 col-span-12 md:text-left text-center">
                <h2 className="font-bold text-5xl">
                    <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 mx-3 font-bold text-transparent">
                        /
                    </span>
                    {t("title")}
                </h2>
                <div className="relative space-y-2 text-xl text-left">
                    <div>{t("text")}</div>
                    <Spacer />
                    <div className="z-10 inset-0 bg-gradient-to-r from-background via-transparent to-background aboslute"></div>

                    <Carousel
                        className="relative w-full"
                        setApi={setApi}
                        plugins={[
                            Autoplay({
                                delay: 10000,
                            }),
                        ]}
                    >
                        <CarouselContent className="-ml-4">
                            {carouselItems}
                        </CarouselContent>

                        {/* Pagination Dots */}
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <CarouselPrevious className="static translate-x-0 translate-y-0 cursor-pointer" />
                            {projectData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={cn(
                                        "border-2 rounded-full w-3 h-3 transition-all duration-300",
                                        selectedIndex === index
                                            ? "border-blue-600 dark:border-sky-400 bg-blue-600 dark:bg-sky-400"
                                            : "border-gray-400 dark:border-gray-600 hover:border-blue-500 dark:hover:border-sky-500"
                                    )}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}

                            <CarouselNext className="static translate-x-0 translate-y-0 cursor-pointer" />
                        </div>

                        <div className="hidden md:block top-0 left-0 absolute bg-gradient-to-r from-background to-transparent w-28 h-full"></div>
                        <div className="hidden md:block top-0 right-0 absolute bg-gradient-to-l from-background to-transparent w-28 h-full"></div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
});

// AnimatedCard component remains the same
const AnimatedCard = memo(function AnimatedCard({
    index,
    image,
    github,
    demo,
    t,
    projectIndex,
    technologies,
    inProgress,
    isSelected,
}: {
    index: number;
    image: string;
    github: string;
    demo: string;
    t: ReturnType<typeof useTranslations>;
    projectIndex: number;
    technologies: string[];
    inProgress: boolean;
    isSelected: boolean;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Memoize animation variants
    const animationVariants = useMemo(
        () => ({
            initial: { opacity: 0, y: 40 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.5, delay: index * 0.15 },
        }),
        [isInView, index]
    );

    // Check if links are disabled
    const isGithubDisabled = github === "#" || github === "";
    const isDemoDisabled = demo === "#" || demo === "";

    // Memoize button configurations to prevent recreation
    const buttonConfigs = useMemo(
        () => ({
            github: {
                disabled: isGithubDisabled,
                className: `cursor-pointer bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 !rounded-button whitespace-nowrap ${
                    isGithubDisabled ? "cursor-not-allowed opacity-50" : ""
                }`,
            },
            demo: {
                disabled: isDemoDisabled,
                className: `cursor-pointer bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-700 hover:to-sky-500 text-white !rounded-button whitespace-nowrap ${
                    isDemoDisabled ? "cursor-not-allowed opacity-50" : ""
                }`,
            },
        }),
        [isGithubDisabled, isDemoDisabled]
    );

    // Handle click events for disabled buttons
    const handleDisabledClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Memoize the technology badges to prevent recreation
    const technologyBadges = useMemo(
        () =>
            technologies.map((tech, i) => (
                <Badge
                    key={i}
                    variant="outline"
                    className="border-blue-600 dark:border-sky-400 text-blue-600 dark:text-sky-400 cursor-default"
                >
                    {tech}
                </Badge>
            )),
        [technologies]
    );

    // Memoize the status icon
    const statusIcon = useMemo(
        () =>
            inProgress ? (
                <Construction className="right-4 bottom-4 absolute text-yellow-400" />
            ) : (
                <BadgeCheck className="right-4 bottom-4 absolute text-green-400" />
            ),
        [inProgress]
    );

    // Get the alt text with fallback
    const altText = useMemo(() => {
        try {
            return (
                t(`project${projectIndex}.title`) || `Project ${projectIndex}`
            );
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return `Project ${projectIndex}`;
        }
    }, [t, projectIndex]);

    return (
        <motion.div
            ref={ref}
            initial={animationVariants.initial}
            animate={animationVariants.animate}
            transition={animationVariants.transition}
        >
            <Card
                className={`group relative hover:shadow-xl pt-0 pb-6 h-full overflow-hidden transition-shadow duration-300 ${isSelected ? "card-gradient" : ""}`}
            >
                <div className="relative h-[240px] overflow-hidden">
                    <Image
                        src={image}
                        alt={altText}
                        className="group-hover:scale-105 transition-transform duration-500"
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: "cover",
                            objectPosition: "top",
                        }}
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-4 w-full">
                            <div className="flex justify-between items-center">
                                {/* GitHub Button */}
                                {isGithubDisabled ? (
                                    <div onClick={handleDisabledClick}>
                                        <Button
                                            variant="outline"
                                            className={
                                                buttonConfigs.github.className
                                            }
                                            disabled
                                        >
                                            <GitBranch className="md:mr-2" />
                                            <span className="hidden md:inline">
                                                {t(
                                                    `project${projectIndex}.btncode`
                                                )}
                                            </span>
                                        </Button>
                                    </div>
                                ) : (
                                    <Link href={github} target="_blank">
                                        <Button
                                            variant="outline"
                                            className={
                                                buttonConfigs.github.className
                                            }
                                        >
                                            <GitBranch className="md:mr-2" />
                                            <span className="hidden md:inline">
                                                {t(
                                                    `project${projectIndex}.btncode`
                                                )}
                                            </span>
                                        </Button>
                                    </Link>
                                )}

                                {/* Demo Button */}
                                {isDemoDisabled ? (
                                    <div onClick={handleDisabledClick}>
                                        <Button
                                            className={
                                                buttonConfigs.demo.className
                                            }
                                            disabled
                                        >
                                            <ExternalLink className="md:mr-2" />
                                            <span className="hidden md:inline">
                                                {t(
                                                    `project${projectIndex}.btnlink`
                                                )}
                                            </span>
                                        </Button>
                                    </div>
                                ) : (
                                    <Link href={demo} target="_blank">
                                        <Button
                                            className={
                                                buttonConfigs.demo.className
                                            }
                                        >
                                            <ExternalLink className="md:mr-2" />
                                            <span className="hidden md:inline">
                                                {t(
                                                    `project${projectIndex}.btnlink`
                                                )}
                                            </span>
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <CardHeader>
                    <CardTitle>{t(`project${projectIndex}.title`)}</CardTitle>
                    <CardDescription className="text-gray-600">
                        {t(`project${projectIndex}.description`)}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <div className="flex flex-wrap gap-2">
                        {technologyBadges}
                    </div>
                    {statusIcon}
                </CardFooter>
            </Card>
        </motion.div>
    );
});

export default Projects;
