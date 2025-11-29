"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/header/theme-switcher";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LanguageToggleWithTooltip } from "@/components/header/lang-switcher";
import { MobileMenu } from "./mobile-menu";
import HamburgerIcon from "@/components/header/hamburger-icon";
import { Kbd, KbdGroup } from "../ui/kbd";
import { ArrowBigUp } from "lucide-react";

export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const sectionIds = useMemo(
        () => ["home", "about", "projects", "techstack", "contact"],
        []
    );

    const liClasses = useMemo(
        () =>
            "hover:bg-transparent p-3 border-b-2 border-transparent hover:border-foreground transition-all ease-fluid cursor-pointer uppercase will-change-transform",
        []
    );

    const t = useTranslations("Header");

    const links = useMemo(
        () => [
            { href: "#home", label: t("home") },
            { href: "#about", label: t("about") },
            { href: "#projects", label: t("projects") },
            { href: "#techstack", label: t("techstack") },
            { href: "#contact", label: t("contact") },
        ],
        [t]
    );

    const isHomePage = useMemo(
        () => pathname === "/en" || pathname === "/cz",
        [pathname]
    );

    const headerClasses = useMemo(
        () =>
            `fixed top-0 lg:top-5 right-0 left-0 z-[1501] transition-all ease-fluid duration-500 ${!isVisible ? "-translate-y-28" : "-translate-y-2"}`,
        [isVisible]
    );

    // Define callbacks BEFORE useEffect hooks that use them
    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const highlightCurrentSection = useCallback(() => {
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
    }, [sectionIds]);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        const scrollDown =
            currentScrollY > lastScrollY.current && currentScrollY > 100;

        setIsVisible(!scrollDown || currentScrollY === 0);

        if (isHomePage) {
            highlightCurrentSection();
        }

        lastScrollY.current = currentScrollY;
    }, [isHomePage, highlightCurrentSection]);

    // Throttled scroll handler
    const throttledScroll = useCallback(() => {
        if (throttleTimeoutRef.current) return;

        throttleTimeoutRef.current = setTimeout(() => {
            handleScroll();
            throttleTimeoutRef.current = null;
        }, 100);
    }, [handleScroll]);

    // Scroll event listener with throttling
    useEffect(() => {
        window.addEventListener("scroll", throttledScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener("scroll", throttledScroll);
            if (throttleTimeoutRef.current) {
                clearTimeout(throttleTimeoutRef.current);
            }
        };
    }, [throttledScroll, handleScroll]);

    // Combined mobile menu effects (body overflow + click outside + escape)
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";

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

        if (isMobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isMobileMenuOpen, closeMobileMenu]);

    const handleLinkClick = useCallback(
        (e: React.MouseEvent, hash: string) => {
            const sectionId = hash.replace("#", "");

            if (isMobileMenuOpen) {
                closeMobileMenu();
            }

            if (isHomePage) {
                e.preventDefault();
                const target = document.getElementById(sectionId);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                    setActiveSection(sectionId);
                }
            }
        },
        [isMobileMenuOpen, isHomePage, closeMobileMenu]
    );

    const isActive = useCallback(
        (href: string) => {
            const sectionId = href.replace("#", "");
            return activeSection === sectionId;
        },
        [activeSection]
    );

    const toggleLanguage = useCallback(() => {
        const newLocale = currentLocale === "en" ? "cz" : "en";
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.replace(newPath);
    }, [currentLocale, pathname, router]);

    // Keyboard shortcut for language toggle
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && event.key === "C") {
                toggleLanguage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleLanguage]);

    const desktopLinks = useMemo(
        () =>
            links.map((link) => {
                const activeClass = isActive(link.href)
                    ? "bg-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 text-transparent border-b-2 border-sky-400 transition-all ease-fluid duration-500 hover:text-foreground"
                    : "";

                return (
                    <li
                        key={link.href}
                        className={`${activeClass} ${liClasses}`}
                    >
                        <Link
                            href={`${"/en" + link.href} || ${"/cz" + link.href}`}
                            className="block"
                            onClick={(e) => handleLinkClick(e, link.href)}
                        >
                            {link.label}
                        </Link>
                    </li>
                );
            }),
        [links, isActive, liClasses, handleLinkClick]
    );

    return (
        <header className={headerClasses}>
            <nav className="flex justify-between items-center backdrop-blur-xl p-3 xl:border border-muted md:rounded-full w-full cs-container">
                <Link
                    href={"/"}
                    className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent uppercase"
                >
                    <span className="capitalize">by</span> Topeeez
                </Link>

                <ul className="hidden xl:flex items-center gap-4 font-semibold uppercase">
                    {desktopLinks}
                </ul>

                <div className="hidden xl:flex items-center gap-4">
                    <KbdGroup>
                        <Kbd className="bg-transparent p-3.5 border border-muted rounded-full">
                            <ArrowBigUp className="size-4" /> + D
                        </Kbd>
                    </KbdGroup>
                    <ThemeToggle />
                    <LanguageToggleWithTooltip currentLocale={currentLocale} />
                </div>

                <div className="xl:hidden">
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
