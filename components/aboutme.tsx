import { useTranslations } from "next-intl";
import Link from "next/link";

export function AboutMe() {
    const t = useTranslations("HomePage");
    return (
        <>
            <section id="about" className="grid grid-cols-12 relative cs-container">
                <div className="col-span-12 space-y-12">
                    <h2 className="text-5xl font-bold"><span className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent mx-3">/</span>{t("AboutMe.title")}</h2>
                    <div className="text-left text-xl text-muted-foreground space-y-2">
                        <div className="text-foreground">{t("AboutMe.text1-part1")} <span className="font-bold">{t("AboutMe.cz")}</span>{t("AboutMe.text1-part2")}</div>
                        <div>{t("AboutMe.text2")}</div>
                        <div>{t("AboutMe.text3")}</div>
                        <div>{t("AboutMe.text4")}<Link href={"https://github.com/galfar-coder"} className="font-bold hover:bg-clip-text hover:bg-gradient-to-r from-blue-600 to-sky-400 hover:text-transparent transition-all ease-in-out">{t("AboutMe.galfar")}</Link></div>
                    </div>
                </div>
            </section>
        </>
    )
}