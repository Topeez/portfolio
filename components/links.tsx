import Link from "next/link";
import { useTranslations } from "next-intl";

export function Links() {
    const t = useTranslations("Header");
    const liClasses = "hover:bg-foreground hover:text-card p-3 rounded-md transition-all ease-fluid cursor-pointer";

    return (
        <ul className="hidden lg:flex items-center gap-4 font-semibold uppercase">
            {[
                { name: t("home"), href: "/#home" },
                { name: t("about"), href: "/#about" },
                { name: t("projects"), href: "/#projects" },
                { name: t("contact"), href: "/contacts" },
            ].map(({ name, href }) => (
                <li key={href}>
                    <Link href={href} className={`${liClasses}`
                    }>{name}</Link>
                </li>
            ))}
        </ul>
    )
}
