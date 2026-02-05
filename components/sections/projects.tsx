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
import { projects } from "@/src/data/projects";
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
        }),
    );

    const featuredProjects = useMemo(
        () => projects.filter((p) => p.featured).slice(0, 3),
        [],
    );

    const onSelect = useCallback(() => {
        if (!api) return;
        setSelectedIndex(api.selectedScrollSnap());
        autoplayRef.current.reset();
    }, [api]);

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
        },
        [api],
    );

    const carouselItems = useMemo(
        () =>
            featuredProjects.map((project, index) => {
                const isSelected = selectedIndex === index;

                return (
                    <CarouselItem
                        key={project.id}
                        className="pl-4 md:basis-1/2"
                    >
                        <AnimatedCard
                            index={index}
                            image={project.images[0]}
                            slug={project.slug}
                            github={project.github ?? "#"}
                            demo={project.demo ?? "#"}
                            t={t}
                            translationKey={project.translationKey}
                            technologies={project.technologies.map((tech) =>
                                tech === "api" ||
                                tech == "db" ||
                                tech == "template"
                                    ? t(tech)
                                    : tech,
                            )}
                            inProgress={project.inProgress}
                            isSelected={isSelected}
                        />
                    </CarouselItem>
                );
            }),
        [featuredProjects, t, selectedIndex],
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
                        plugins={[autoplayRef.current]}
                    >
                        <CarouselContent className="-ml-4">
                            {carouselItems}
                        </CarouselContent>

                        {/* Pagination Dots */}
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <CarouselPrevious className="static translate-x-0 translate-y-0 cursor-pointer" />
                            {featuredProjects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={cn(
                                        "border rounded-full size-3 transition-all duration-300",
                                        selectedIndex === index
                                            ? "border-blue-600 dark:border-sky-400 bg-blue-600 dark:bg-sky-400"
                                            : "border-gray-400 dark:border-gray-600 hover:border-blue-500 dark:hover:border-sky-500",
                                    )}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}

                            <CarouselNext className="static translate-x-0 translate-y-0 cursor-pointer" />
                        </div>

                        <div className="hidden dark:md:block top-0 left-0 absolute bg-gradient-to-r from-background/65 to-transparent w-28 h-full"></div>
                        <div className="hidden dark:md:block top-0 right-0 absolute bg-gradient-to-l from-background/65 to-transparent w-28 h-full"></div>
                    </Carousel>
                </div>
                <div className="flex justify-center mt-6">
                    <Button asChild>
                        <Link href="/projects">{t("viewAllProjects")} </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
});

const AnimatedCard = memo(function AnimatedCard({
    index,
    image,
    github,
    demo,
    t,
    slug,
    translationKey,
    technologies,
    inProgress,
    isSelected,
}: {
    index: number;
    image: string;
    github: string;
    demo: string;
    t: ReturnType<typeof useTranslations>;
    slug: string;
    translationKey: string;
    technologies: string[];
    inProgress: boolean;
    isSelected: boolean;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const animationVariants = useMemo(
        () => ({
            initial: { opacity: 0, y: 20 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.3, delay: index * 0.05 },
        }),
        [isInView, index],
    );

    const isGithubDisabled = github === "#" || github === "";
    const isDemoDisabled = demo === "#" || demo === "";

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
        [isGithubDisabled, isDemoDisabled],
    );

    const handleDisabledClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

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
        [technologies],
    );

    const statusIcon = useMemo(
        () =>
            inProgress ? (
                <Construction className="right-4 bottom-4 absolute text-yellow-400" />
            ) : (
                <BadgeCheck className="right-4 bottom-4 absolute text-green-400" />
            ),
        [inProgress],
    );

    const altText = useMemo(() => {
        try {
            return t(`${translationKey}.title`) || `Project ${translationKey}`;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return `Project ${translationKey}`;
        }
    }, [t, translationKey]);

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
                                                {t(`${translationKey}.btncode`)}
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
                                                {t(`${translationKey}.btncode`)}
                                            </span>
                                        </Button>
                                    </Link>
                                )}

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
                                                {t(`${translationKey}.btnlink`)}
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
                                                {t(`${translationKey}.btnlink`)}
                                            </span>
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <CardHeader>
                    <Link
                        href={`/projects/${slug}`}
                        className="decoration-blue-500 hover:underline underline-offset-4"
                    >
                        <CardTitle>{t(`${translationKey}.title`)}</CardTitle>
                    </Link>
                    <CardDescription className="text-gray-600">
                        {t(`${translationKey}.description`)}
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
