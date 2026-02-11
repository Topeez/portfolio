"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/header/theme-switcher";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "@/src/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LanguageToggleWithTooltip } from "@/components/header/lang-switcher";
import { MobileMenu } from "./mobile-menu";
import HamburgerIcon from "@/components/header/hamburger-icon";
import { Kbd, KbdGroup } from "../ui/kbd";
import { ArrowBigUp } from "lucide-react";

const SECTION_IDS = ["home", "about", "projects", "techstack", "contact"];
const LI_CLASSES =
    "hover:bg-transparent p-3 border-b-2 border-transparent hover:border-foreground transition-all ease-fluid cursor-pointer uppercase will-change-transform";

export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const lastScrollY = useRef(0);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const t = useTranslations("Header");

    // 2. Computed values are now just regular variables.
    const isHomePage =
        pathname === "/" || pathname === "/en" || pathname === "/cz";

    const links = [
        { href: "#home", label: t("home") },
        { href: "#about", label: t("about") },
        { href: "#projects", label: t("projects") },
        { href: "#techstack", label: t("techstack") },
        { href: "#contact", label: t("contact") },
    ];

    const headerClasses = `fixed top-0 lg:top-5 right-0 left-0 z-[1501] transition-all ease-fluid duration-500 ${
        !isVisible ? "-translate-y-28" : "-translate-y-2"
    }`;

    // 3. Functions are defined directly.
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const highlightCurrentSection = () => {
        let current = "";

        SECTION_IDS.forEach((id) => {
            const section = document.getElementById(id);
            if (!section) return;

            const rect = section.getBoundingClientRect();
            // Adjusted offset slightly for better accuracy
            const sectionTop = rect.top + window.scrollY - 150;
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

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        // Simple scroll direction check
        const scrollDown =
            currentScrollY > lastScrollY.current && currentScrollY > 100;

        setIsVisible(!scrollDown || currentScrollY === 0);

        if (isHomePage) {
            highlightCurrentSection();
        }

        lastScrollY.current = currentScrollY;
    };

    // 4. Effects still work the same way, but dependencies are handled more smartly by the compiler.
    // We keep strict dependencies for safety, but `handleScroll` being a fresh function every render
    // won't trigger infinite loops because the Compiler memoizes the function identity under the hood.
    useEffect(() => {
        const onScroll = () => {
            if (throttleTimeoutRef.current) return;
            throttleTimeoutRef.current = setTimeout(() => {
                handleScroll();
                throttleTimeoutRef.current = null;
            }, 100);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (throttleTimeoutRef.current)
                clearTimeout(throttleTimeoutRef.current);
        };
    }, [isHomePage]); // Only re-attach if isHomePage status changes (logic dependency)

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
    }, [isMobileMenuOpen]);

    const handleLinkClick = (e: React.MouseEvent, hash: string) => {
        const sectionId = hash.replace("#", "");

        if (isMobileMenuOpen) closeMobileMenu();

        if (isHomePage) {
            e.preventDefault();
            const target = document.getElementById(sectionId);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
                setActiveSection(sectionId);
                window.history.pushState(null, "", `#${sectionId}`);
            }
        }
    };

    const toggleLanguage = () => {
        const newLocale = currentLocale === "en" ? "cz" : "en";
        router.replace(pathname, { locale: newLocale });
        router.refresh();
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && (event.key === "C" || event.key === "c")) {
                toggleLanguage();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentLocale, pathname, router]); // Dependencies for router/locale

    // 5. Removed useMemo for mapping links. It's fast enough to run every render.
    const desktopLinks = links.map((link) => {
        // Simple logic for active class
        const isActiveLink = activeSection === link.href.replace("#", "");

        const activeClass = isActiveLink
            ? "bg-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 text-transparent border-b-2 border-sky-400 transition-all ease-fluid duration-500 hover:text-foreground"
            : "";

        const destination = isHomePage ? link.href : `/${link.href}`;

        return (
            <li key={link.href} className={`${activeClass} ${LI_CLASSES}`}>
                <Link
                    href={destination}
                    className="block"
                    onClick={(e) => handleLinkClick(e, link.href)}
                >
                    {link.label}
                </Link>
            </li>
        );
    });

    return (
        <header className={headerClasses}>
            <nav className="flex justify-between items-center backdrop-blur-xl p-7 lg:p-4 xl:border border-muted md:rounded-full w-full cs-container">
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
                        isActive={(href) =>
                            activeSection === href.replace("#", "")
                        }
                        handleLinkClick={handleLinkClick}
                        isHomePage={isHomePage}
                    />
                </div>
            </nav>
        </header>
    );
}
