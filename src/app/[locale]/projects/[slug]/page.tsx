// src/app/[locale]/projects/[slug]/page.tsx
import { projects } from "@/src/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ExternalLink,
    GitBranch,
    Construction,
    BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/sections/footer";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;

    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const { getTranslations } = await import("next-intl/server");
    const t = await getTranslations("HomePage.Projects");

    const translatedTechs = project.technologies.map((tech) =>
        ["api", "db", "template"].includes(tech) ? t(tech) : tech,
    );

    return (
        <>
            <Header />
            <main className="py-32 min-h-screen cs-container">
                <div className="flex flex-col gap-10">
                    {/* Header Section */}
                    <div className="space-y-4 md:text-left text-center">
                        <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 py-2 w-fit font-bold text-transparent text-4xl md:text-6xl">
                            {t(`${project.translationKey}.title`)}
                        </h1>
                        <p className="max-w-2xl text-muted-foreground text-xl">
                            {t(`${project.translationKey}.description`)}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                            {translatedTechs.map((tech) => (
                                <Badge
                                    key={tech}
                                    variant="outline"
                                    className="border-blue-600 dark:border-sky-400 text-blue-600 dark:text-sky-400 cursor-default"
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="items-start gap-10 grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Section - Carousel */}
                        <div className="w-full">
                            <Carousel className="w-full">
                                <CarouselContent>
                                    {project.images.map((img, index) => (
                                        <CarouselItem key={index}>
                                            <div className="relative shadow-2xl border border-muted rounded-xl w-full aspect-video overflow-hidden">
                                                <Image
                                                    src={img}
                                                    alt={`${project.translationKey} screenshot ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    priority={index === 0}
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {/* Only show navigation if there is more than one image */}
                                {project.images.length > 1 && (
                                    <>
                                        <CarouselPrevious className="left-2" />
                                        <CarouselNext className="right-2" />
                                    </>
                                )}
                            </Carousel>
                        </div>

                        {/* Links & Info Section */}
                        <div className="flex flex-col gap-6 bg-card shadow-sm p-6 border rounded-xl">
                            <h2 className="font-semibold text-2xl">
                                Project Links
                            </h2>

                            <div className="flex sm:flex-row flex-col gap-4">
                                {project.demo && project.demo !== "#" && (
                                    <Button asChild size="lg" className="gap-2">
                                        <Link
                                            href={project.demo}
                                            target="_blank"
                                        >
                                            <ExternalLink className="size-4" />
                                            {t(
                                                `${project.translationKey}.btnlink`,
                                            )}
                                        </Link>
                                    </Button>
                                )}

                                {project.github && project.github !== "#" && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="gap-2"
                                    >
                                        <Link
                                            href={project.github}
                                            target="_blank"
                                        >
                                            <GitBranch className="size-4" />
                                            {t(
                                                `${project.translationKey}.btncode`,
                                            )}
                                        </Link>
                                    </Button>
                                )}
                            </div>

                            {/* Status Section */}
                            <div className="bg-muted/50 mt-4 p-4 rounded-lg">
                                <p className="flex items-center gap-2 text-muted-foreground text-sm italic">
                                    Status:
                                    {project.inProgress ? (
                                        <span className="flex items-center gap-1">
                                            In Progress{" "}
                                            <Construction className="w-4 h-4 text-yellow-500" />
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1">
                                            Completed{" "}
                                            <BadgeCheck className="w-4 h-4 text-green-500" />
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
