"use client";

import { Links } from "@/components/links";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            if (currentScrollY === 0) {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const toggleLanguage = () => {
        const newLocale = currentLocale === "en" ? "cz" : "en";
        // Create new path with updated locale
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.replace(newPath);
    };

    return (
        <header className={`fixed top-2 right-0 left-0 z-[1501]  transition-all ease-fluid duration-500 ${!isVisible ? "-translate-y-24" : "translate-y-0"}`}>
            <nav className="backdrop-blur-lg rounded-2xl border border-muted flex items-center justify-between cs-container p-5">
                <Link href={"/"} className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent uppercase"><span className="capitalize">by</span> Topeeez</Link>

                <Links />

                <div className="flex items-center gap-4">
                    <ModeToggle />

                    <div className="flex gap-1">
                        <Button
                            onClick={toggleLanguage}
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer rounded-full"
                            aria-label={currentLocale === "en"
                                ? "Switch to Czech"
                                : "Přepnout na angličtinu"}
                        >
                            {currentLocale === "en" ? (
                                <span role="img" aria-label="Czech flag">🇬🇧</span>
                            ) : (
                                <span role="img" aria-label="US flag">🇨🇿</span>
                            )}
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    )
}