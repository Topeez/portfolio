"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, GitBranch } from "lucide-react";
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
import { Spacer } from "@/components/spacer";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function Projects() {
    const t = useTranslations("HomePage.Projects");

    const projectData = [
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
                "API Integration",
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
                "API Integration",
                "Node.js",
            ],
            github: "https://github.com/galfar-coder/zenith",
            demo: "#",
            inProggress: true,
        },
        {
            id: 4,
            image: "/assets/img/projects/web_skoly.png",
            technologies: ["PHP", "WordPress", "Templates"],
            github: "#",
            demo: "https://sos.mesosdev.cz/",
            inProggress: true,
        },
    ];

    return (
        <section id="projects" className="grid grid-cols-12 cs-container">
            <div className="space-y-4 col-span-12 md:text-left text-center">
                <h2 className="font-bold text-5xl">
                    <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 mx-3 font-bold text-transparent">
                        /
                    </span>
                    {t("title")}
                </h2>
                <div className="space-y-2 text-xl text-left">
                    <div>{t("text")}</div>
                    <Spacer />

                    <Carousel className="w-full">
                        <CarouselContent className="-ml-4">
                            {projectData.map((project, index) => {
                                const projectIndex = index + 1;
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
                                        />
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <div className="flex justify-center gap-4 mt-4">
                            <CarouselPrevious className="static translate-x-0 translate-y-0 cursor-pointer" />
                            <CarouselNext className="static translate-x-0 translate-y-0 cursor-pointer" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

function AnimatedCard({
    index,
    image,
    github,
    demo,
    t,
    projectIndex,
    technologies,
    inProgress,
}: {
    index: number;
    image: string;
    github: string;
    demo: string;
    t: ReturnType<typeof useTranslations>;
    projectIndex: number;
    technologies: string[];
    inProgress: boolean;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
        >
            <Card className="group relative hover:shadow-xl pt-0 pb-6 h-full overflow-hidden transition-shadow duration-300">
                <div className="relative h-[240px] overflow-hidden">
                    <Image
                        src={image}
                        alt={t(`project${projectIndex}.title`)}
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
                                <Button
                                    variant="outline"
                                    className={`bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 !rounded-button whitespace-nowrap ${github === "#" || github === "" ? "cursor-not-allowed" : ""}`}
                                >
                                    <GitBranch className="mr-2" />{" "}
                                    {t(`project${projectIndex}.btncode`)}
                                </Button>
                                <Link href={demo}>
                                    <Button
                                        className={`bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-700 hover:to-sky-500 text-white !rounded-button whitespace-nowrap ${demo === "#" || demo === "" ? "cursor-not-allowed" : ""}`}
                                    >
                                        <ExternalLink className="mr-2" />
                                        {t(`project${projectIndex}.btnlink`)}
                                    </Button>
                                </Link>
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
                        {technologies.map((tech, i) => (
                            <Badge
                                key={i}
                                variant="outline"
                                className="border-blue-600 text-blue-600 cursor-default"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                    {inProgress ? (
                        <Badge
                            variant="outline"
                            className="right-5 bottom-5 absolute border-yellow-400 text-yellow-400 cursor-default"
                        >
                            {t("inProgress")}
                        </Badge>
                    ) : (
                        <Badge
                            variant="outline"
                            className="right-5 bottom-5 absolute border-green-400 text-green-400 cursor-default"
                        >
                            {t("finished")}
                        </Badge>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    );
}
