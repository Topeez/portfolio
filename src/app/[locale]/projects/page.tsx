import { projects } from "@/src/data/projects";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";
import Image from "next/image";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Construction } from "lucide-react";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/sections/footer";

import {
    ProjectsGridAnimator,
    ProjectCardAnimator,
} from "@/components/utils/project-grid-animator";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "HomePage.Projects" });
    return {
        title: `${t("title")} | My Portfolio`,
    };
}

export default async function ProjectsIndexPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "HomePage.Projects" });

    return (
        <>
            <Header />
            <main className="py-32 min-h-screen overflow-hidden cs-container">
                <div className="space-y-4 mb-12 md:text-left text-center slide-in">
                    <h1 className="font-bold text-5xl">
                        <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 mr-2 font-bold text-transparent">
                            /
                        </span>
                        {t("title")}
                    </h1>
                    <p className="max-w-2xl text-muted-foreground text-xl">
                        {t("text")}
                    </p>
                </div>

                {/* Nahradili jsme klasický <div className="grid..."> za náš Client Wrapper */}
                <ProjectsGridAnimator>
                    {projects.map((project) => {
                        const translatedTechs = project.technologies.map(
                            (tech) =>
                                ["api", "db", "template"].includes(tech)
                                    ? t(tech)
                                    : tech,
                        );

                        const displayTechs = translatedTechs.slice(0, 4);
                        const remainingTechs = translatedTechs.length - 4;

                        return (
                            // Obalíme každou položku do Card Animátoru.
                            // Key musí zůstat vždy na nejvyšším prvku v mapě.
                            <ProjectCardAnimator key={project.id}>
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="group block h-full"
                                >
                                    <Card className="flex flex-col hover:shadow-xl pt-0 border-muted h-full overflow-hidden transition-all hover:-translate-y-1 duration-300">
                                        {/* Image Container */}
                                        <div className="relative bg-muted w-full h-48 overflow-hidden">
                                            <Image
                                                src={project.images[0]}
                                                alt={t(
                                                    `${project.translationKey}.title`,
                                                )}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>

                                        <CardHeader className="flex-grow">
                                            <CardTitle className="group-hover:text-blue-600 text-xl line-clamp-1 transition-colors">
                                                {t(
                                                    `${project.translationKey}.title`,
                                                )}
                                            </CardTitle>
                                            <CardDescription className="mt-2 line-clamp-2">
                                                {t(
                                                    `${project.translationKey}.description`,
                                                )}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardFooter className="relative flex flex-col items-start gap-4 pt-0">
                                            <div className="flex flex-wrap gap-2">
                                                {displayTechs.map((tech) => (
                                                    <Badge
                                                        key={tech}
                                                        variant="outline"
                                                        className="border-blue-600 dark:border-sky-400 text-blue-600 dark:text-sky-400 cursor-default"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                ))}
                                                {remainingTechs > 0 && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="font-normal text-xs"
                                                    >
                                                        +{remainingTechs}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="right-2 bottom-0 absolute">
                                                {project.inProgress ? (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-yellow-500/10 backdrop-blur-md border-amber-400 text-yellow-600"
                                                    >
                                                        <Construction className="mr-1 w-3 h-3" />
                                                        In Progress
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-green-500/10 backdrop-blur-md border-green-400 text-green-600"
                                                    >
                                                        <BadgeCheck className="mr-1 w-3 h-3" />
                                                        Done
                                                    </Badge>
                                                )}
                                            </div>

                                            <Button
                                                variant="ghost"
                                                className="p-0 h-auto text-blue-600 transition-transform group-hover:translate-x-1"
                                            >
                                                Read more &rarr;
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </ProjectCardAnimator>
                        );
                    })}
                </ProjectsGridAnimator>
            </main>
            <Footer />
        </>
    );
}
