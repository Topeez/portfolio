"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <div className="space-y-1">
        <span className={`block h-1 w-6 origin-center bg-foreground rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
        <span className={`block h-1 w-4 origin-center bg-foreground rounded-full transition-all duration-300 ease-in-out mt-1.5 ${isOpen ? '-rotate-45 -translate-y-1.5 w-6' : ''}`}></span>
    </div>
);

export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const sectionIds = ["home", "about", "projects", "techstack", "contact"];
    const liClasses = "hover:bg-foreground hover:text-background p-3 rounded-md transition-all ease-fluid cursor-pointer";

    const t = useTranslations("Header");

    const links = [
        { href: "#home", label: t("home") },
        { href: "#about", label: t("about") },
        { href: "#projects", label: t("projects") },
        { href: "#techstack", label: t("techstack") },
        { href: "#contact", label: t("contact") },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDown = currentScrollY > lastScrollY.current && currentScrollY > 100;

            setIsVisible(!scrollDown || currentScrollY === 0);

            if (pathname === "/en" || pathname === "/cz") {
                highlightCurrentSection();
            }

            lastScrollY.current = currentScrollY;
        };

        const highlightCurrentSection = () => {
            let current = '';

            sectionIds.forEach(id => {
                const section = document.getElementById(id);
                if (!section) return;

                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY - 110;
                const sectionHeight = rect.height;

                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = id;
                }
            });

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto" };
    }, [isMobileMenuOpen]);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target as Node) &&
                !(e.target as Element).closest(".mobile-menu-button")
            ) {
                closeMobileMenu();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeMobileMenu();
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [closeMobileMenu]);

    const handleLinkClick = useCallback((e: React.MouseEvent, hash: string) => {
        const sectionId = hash.replace('#', '');

        if (isMobileMenuOpen) {
            closeMobileMenu();
        }

        if (pathname === "/en" || pathname === "/cz") {
            e.preventDefault();
            const target = document.getElementById(sectionId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                setActiveSection(sectionId);
            }
        }
    }, [isMobileMenuOpen, pathname, closeMobileMenu]);

    const isActive = (href: string) => {
        const sectionId = href.replace('#', '');
        return activeSection === sectionId;
    };

    const toggleLanguage = () => {
        const newLocale = currentLocale === "en" ? "cz" : "en";
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.replace(newPath);
    };

    return (
        <header className={`fixed top-2 right-0 left-0 z-[1501] transition-all ease-fluid duration-500 ${!isVisible ? "-translate-y-24" : "translate-y-0"}`}>
            <nav className="flex justify-between items-center backdrop-blur-lg p-5 lg:border border-muted rounded-2xl cs-container">
                <Link href={"/"} className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent uppercase"><span className="capitalize">by</span> Topeeez</Link>

                <ul className="hidden lg:flex items-center gap-4 font-semibold uppercase">
                    {links.map((link) => (
                        <li
                            key={link.href}
                            className={`${isActive(link.href) ? 'bg-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 text-transparent transition-all ease-fluid duration-500' : ''} ${liClasses}`}
                        >
                            <Link
                                href={`${"/en" + link.href} || ${"/cz" + link.href}`}
                                className="block"
                                onClick={(e) => handleLinkClick(e, link.href)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Controls (hidden on mobile) */}
                <div className="hidden lg:flex items-center gap-4">
                    <ModeToggle />
                    <Button
                        onClick={toggleLanguage}
                        variant="ghost"
                        size="icon"
                        className="rounded-full cursor-pointer"
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

                <div className="lg:hidden">
                    <Button
                        onClick={toggleMobileMenu}
                        variant="ghost"
                        size="icon"
                        className="group size-10 mobile-menu-button"
                        aria-expanded={isMobileMenuOpen}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <HamburgerIcon isOpen={isMobileMenuOpen} />
                    </Button>

                    <div
                        ref={mobileMenuRef}
                        className={`fixed inset-0 z-[900] bg-background transition-all duration-650 ease-in-out h-screen -translate-y-22 ${isMobileMenuOpen
                            ? "-translate-x-0 opacity-100 pointer-events-auto"
                            : "translate-x-44 opacity-0 pointer-events-none"
                            }`}
                        style={{ top: "5rem" }}
                    >
                        <Button
                            onClick={toggleMobileMenu}
                            className="group top-8 right-4 z-[1000] absolute bg-transparent shadow-none size-10 aspect-square font-bold text-foreground hover:text-white cursor-pointer mobile-menu-button"
                            aria-label="Close menu"
                        >
                            <HamburgerIcon isOpen={isMobileMenuOpen} />
                        </Button>

                        <div className="flex flex-col gap-4 pt-24 pb-16 h-full">
                            <ul className="flex flex-col items-center gap-8 overflow-hidden font-bold text-foreground text-4xl text-center">
                                {links.map((link) => (
                                    <li
                                        key={link.href}
                                        className={`${isActive(link.href) ? 'bg-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 text-transparent transition-all ease-fluid duration-500' : ''} ${liClasses}`}
                                    >
                                        <Link
                                            href={`${"/en" + link.href} || ${"/cz" + link.href}`}
                                            className="block"
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Mobile Controls (only visible in mobile menu) */}
                            <div className="flex justify-center items-center gap-6">
                                <ModeToggle />
                                <Button
                                    onClick={toggleLanguage}
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full w-12 h-12 cursor-pointer"
                                    aria-label={currentLocale === "en"
                                        ? "Switch to Czech"
                                        : "Přepnout na angličtinu"}
                                >
                                    {currentLocale === "en" ? (
                                        <span role="img" aria-label="Czech flag" className="text-2xl">🇬🇧</span>
                                    ) : (
                                        <span role="img" aria-label="US flag" className="text-2xl">🇨🇿</span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}