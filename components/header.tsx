/**
 * A fixed header that appears at the top of the page.
 *
 * It contains a link to the homepage, a list of links to the other pages,
 * a button to toggle the language between English and Czech, and a button
 * to toggle the theme between light and dark.
 *
 * The language is stored in the component's state and is toggled when the
 * language button is clicked.
 *
 * @returns The JSX element representing the header.
 */

"use client"

import { Links } from "@/components/links";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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

    const [language, setLanguage] = useState("EN");

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === "EN" ? "CZ" : "EN"));
    };

    return (
        <header className={`fixed top-0 right-0 left-0 z-[1501] p-5 backdrop-blur-lg transition-all ease-fluid duration-500 ${!isVisible ? "-translate-y-full" : "translate-y-0"}`}>
            <nav className="flex items-center justify-between cs-container">
                <Link href={"/"} className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent uppercase">Topeeez</Link>

                <Links />

                <div className="flex items-center gap-4">
                    <ModeToggle />

                    <Button onClick={toggleLanguage} className=" cursor-pointer bg-transparent hover:bg-transparent">
                        {language === "EN" ? <span role="img" aria-label="United States flag">🇺🇸</span> : <span role="img" aria-label="Czech Republic flag">🇨🇿</span>}
                    </Button>

                </div>
            </nav>
        </header>
    )
}
