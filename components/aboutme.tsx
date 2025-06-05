import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaReact, FaGraduationCap, FaTrophy, FaCodeBranch } from "react-icons/fa";

export function AboutMe() {
    const t = useTranslations("HomePage");

    return (
        <section id="about" className="grid grid-cols-12 cs-container py-20">
            <div className="col-span-12 space-y-12">
                <h2 className="text-5xl font-bold">
                    <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 text-transparent mx-3">/</span>
                    {t("AboutMe.title")}
                </h2>

                <div className="grid md:grid-cols-2 gap-10 items-start">
                    {/* Left: Text Summary */}
                    <div className="space-y-4 text-xl text-muted-foreground">
                        <p className="text-foreground">
                            {t("AboutMe.text1-part1")} <span className="font-bold">{t("AboutMe.cz")}</span>{t("AboutMe.text1-part2")}
                        </p>
                        <p>{t("AboutMe.text2")}</p>
                        <p>{t("AboutMe.text3")}</p>
                        <p>
                            {t("AboutMe.text4")}
                            <Link href="https://github.com/galfar-coder" className="font-bold bg-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-sky-400 hover:text-transparent transition-all ease-in-out"> {t("AboutMe.galfar")}</Link>
                        </p>
                    </div>

                    {/* Right: Timeline */}
                    <div className="space-y-6 border-l border-border pl-6 relative">
                        {/* <div className="absolute top-0 left-[-3px] h-full w-1 bg-gradient-to-b from-blue-500 via-sky-400 to-transparent rounded"></div> */}

                        <TimelineItem icon={<FaGraduationCap />} year="2022" text={t("AboutMe.Timeline.text1")} />
                        <TimelineItem icon={<FaTrophy />} year="2023" text={t("AboutMe.Timeline.text2")} />
                        <TimelineItem icon={<FaTrophy />} year="2024" text={t("AboutMe.Timeline.text3")} />
                        <TimelineItem icon={<FaReact />} year="2025" text={t("AboutMe.Timeline.text4")} />
                        <TimelineItem icon={<FaCodeBranch />} year="2025" text={t("AboutMe.Timeline.text5")} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ icon, year, text }: { icon: React.ReactNode; year: string; text: string }) {
    return (
        <div className="relative pl-8">
            <div className="absolute left-[-34px] top-3 text-xl text-blue-600">{icon}</div>
            <p className="text-sm text-muted-foreground font-mono">{year}</p>
            <p className="text-base text-foreground">{text}</p>
        </div>
    );
}
