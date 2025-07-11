"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LanguageToggleWithTooltip } from "@/components/lang-switcher";
import { MobileMenu } from "./mobile-menu";
import HamburgerIcon from "@/components/hamburger-icon";

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
    const liClasses =
        "hover:bg-foreground hover:text-background p-3 rounded-md transition-all ease-fluid cursor-pointer uppercase will-change-transform";

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
            const scrollDown =
                currentScrollY > lastScrollY.current && currentScrollY > 100;

            setIsVisible(!scrollDown || currentScrollY === 0);

            if (pathname === "/en" || pathname === "/cz") {
                highlightCurrentSection();
            }

            lastScrollY.current = currentScrollY;
        };

        const highlightCurrentSection = () => {
            let current = "";

            sectionIds.forEach((id) => {
                const section = document.getElementById(id);
                if (!section) return;

                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY - 110;
                const sectionHeight = rect.height;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {
                    current = id;
                }
            });

            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMobileMenuOpen]);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
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

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [closeMobileMenu]);

    const handleLinkClick = useCallback(
        (e: React.MouseEvent, hash: string) => {
            const sectionId = hash.replace("#", "");

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
        },
        [isMobileMenuOpen, pathname, closeMobileMenu]
    );

    const isActive = (href: string) => {
        const sectionId = href.replace("#", "");
        return activeSection === sectionId;
    };

    const toggleLanguage = () => {
        const newLocale = currentLocale === "en" ? "cz" : "en";
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.replace(newPath);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && event.key === "C") {
                toggleLanguage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    return (
        <header
            className={`fixed top-2 right-0 left-0 z-[1501] transition-all ease-fluid duration-500 ${!isVisible ? "-translate-y-28" : "-translate-y-2"}`}
        >
            <nav className="flex justify-between items-center backdrop-blur-lg p-5 lg:border border-muted md:rounded-2xl w-full cs-container">
                <Link
                    href={"/"}
                    className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent uppercase"
                >
                    <span className="capitalize">by</span> Topeeez
                </Link>

                <ul className="hidden lg:flex items-center gap-4 font-semibold uppercase">
                    {links.map((link) => (
                        <li
                            key={link.href}
                            className={`${isActive(link.href) ? "bg-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 text-transparent transition-all ease-fluid duration-500" : ""} ${liClasses}`}
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
                    <LanguageToggleWithTooltip
                        currentLocale={currentLocale}
                        toggleLanguage={toggleLanguage}
                    />
                </div>

                <div className="lg:hidden">
                    <Button
                        onClick={toggleMobileMenu}
                        size="icon"
                        className="group bg-transparent hover:bg-transparent shadow-none size-10 cursor-pointer mobile-menu-button"
                        aria-expanded={isMobileMenuOpen}
                        aria-label={
                            isMobileMenuOpen ? "Close menu" : "Open menu"
                        }
                    >
                        <HamburgerIcon isOpen={isMobileMenuOpen} />
                    </Button>

                    <MobileMenu
                        isOpen={isMobileMenuOpen}
                        closeMenu={closeMobileMenu}
                        toggleLanguage={toggleLanguage}
                        links={links}
                        isActive={isActive}
                        handleLinkClick={handleLinkClick}
                    />
                </div>
            </nav>
        </header>
    );
}
