import { Button } from "@/components/ui/button";
import { ExternalLink, GitBranch } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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

export function Projects() {
    const t = useTranslations("HomePage.Projects");

    const projectData = [
        {
            id: 1,
            image: "/assets/img/projects/tv_rozvrh_1.png",
            technologies: ["PHP", "JavaScript", "CSS3", "Python"],
            github: "#",
            demo: "https://tv.mesosdev.cz"
        },
        {
            id: 2,
            image: "/assets/img/projects/tda_homepage_1.png",
            technologies: ["Python", "Typescript", "Tailwind CSS", "API Integration", "Docker", "Node.js"],
            github: "#",
            demo: "#"
        },
        {
            id: 3,
            image: "/assets/img/projects/zenith.png",
            technologies: ["React", "Next.js", "Tailwind CSS", "API Integration", "Node.js"],
            github: "https://github.com/galfar-coder/zenith",
            demo: "#"
        },
        {
            id: 4,
            image: "/assets/img/projects/zenith.png",
            technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
            github: "#",
            demo: "#"
        }
    ]

    return (
        <section id="projects" className="grid grid-cols-12 cs-container">
            <div className="col-span-12 space-y-4">
                <h2 className="text-5xl font-bold"><span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent mx-3">/</span>{t("title")}</h2>
                <div className="text-left text-xl space-y-2">
                    <div>{t("text")}</div>
                    <Spacer />

                    <Carousel className="w-full">
                        <CarouselContent className="-ml-4">
                            {projectData.map((project, index) => {
                                const projectIndex = index + 1;
                                return (
                                    <CarouselItem key={project.id} className="pl-4 md:basis-1/2">
                                        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group pb-6 pt-0 h-full">
                                            <div className="relative overflow-hidden h-[240px]">
                                                <Image
                                                    src={project.image}
                                                    alt={t(`project${projectIndex}.title`)}
                                                    className="transition-transform duration-500 group-hover:scale-105"
                                                    fill
                                                    sizes="100vw"
                                                    style={{
                                                        objectFit: "cover",
                                                        objectPosition: "top"
                                                    }} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                                    <div className="p-4 w-full">
                                                        <div className="flex justify-between items-center">
                                                            <Button
                                                                variant="outline"
                                                                className={`bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 !rounded-button whitespace-nowrap cursor-pointer ${project.github === "#" || project.github === "" ? "cursor-not-allowed" : ""}`}
                                                            >
                                                                <GitBranch className="mr-2" /> {t(`project${projectIndex}.btncode`)}
                                                            </Button>
                                                            <Link href={project.demo}>
                                                                <Button className={`bg-gradient-to-r from-blue-600 to-sky-400 hover:from-blue-700 hover:to-sky-500 text-white !rounded-button whitespace-nowrap cursor-pointer ${project.demo === "#" || project.demo === "" ? "cursor-not-allowed" : ""}`}>
                                                                    <ExternalLink className="mr-2" />{t(`project${projectIndex}.btnlink`)}
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
                                                    {project.technologies.map((tech, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant="outline"
                                                            className="border-blue-600 text-blue-600 cursor-default"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <div className="mt-4 flex gap-4 justify-center">
                            <CarouselPrevious className="static translate-x-0 translate-y-0 cursor-pointer" />
                            <CarouselNext className="static translate-x-0 translate-y-0 cursor-pointer" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
