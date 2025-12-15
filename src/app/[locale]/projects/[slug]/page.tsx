// src/app/[locale]/projects/[slug]/page.tsx
import { projects } from "@/src/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/sections/footer";

interface ProjectPageProps {
    // In Next.js 15, params is a Promise you must await
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

// 1. Generate Static Params (Optional but recommended for performance)
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    // 2. Await params to get the slug
    const { slug } = await params;

    // 3. Find the project in your data
    const project = projects.find((p) => p.slug === slug);

    // 4. Handle invalid slugs
    if (!project) {
        notFound();
    }

    // 5. Setup Translations
    // Note: We can't call useTranslations directly in an async Server Component nicely
    // without some setup, but 'next-intl' supports it if configured correctly.
    // simpler way for Server Components usually involves `getTranslations`.

    // However, if you are using the standard setup, you can make a client component
    // OR just use `getTranslations` (async) for server components.

    // Let's use the standard Server Component approach:
    const { getTranslations } = await import("next-intl/server");
    const t = await getTranslations("HomePage.Projects");

    // Translate techs
    const translatedTechs = project.technologies.map((tech) =>
        ["api", "db", "template"].includes(tech) ? t(tech) : tech
    );

    return (
        <>
            <Header />
            <main className="py-32 min-h-screen cs-container">
                <div className="flex flex-col gap-10">
                    {/* Header Section */}
                    <div className="space-y-4 md:text-left text-center">
                        <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 w-fit font-bold text-transparent text-4xl md:text-6xl">
                            {t(`${project.translationKey}.title`)}
                        </h1>
                        <p className="max-w-2xl text-muted-foreground text-xl">
                            {t(`${project.translationKey}.description`)}
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                            {translatedTechs.map((tech) => (
                                <Badge
                                    key={tech}
                                    variant="secondary"
                                    className="px-3 py-1 text-md"
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="items-start gap-10 grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Section */}
                        <div className="relative shadow-2xl border border-muted rounded-xl w-full aspect-video overflow-hidden">
                            <Image
                                src={project.image}
                                alt={t(`${project.translationKey}.title`)}
                                fill
                                className="object-cover"
                                priority
                            />
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
                                                `${project.translationKey}.btnlink`
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
                                                `${project.translationKey}.btncode`
                                            )}
                                        </Link>
                                    </Button>
                                )}
                            </div>

                            {/* You can add more detailed descriptions here if you expand your JSON/Data later */}
                            <div className="bg-muted/50 mt-4 p-4 rounded-lg">
                                <p className="text-muted-foreground text-sm italic">
                                    Status:{" "}
                                    {project.inProgress
                                        ? "In Progress 🚧"
                                        : "Completed ✅"}
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
