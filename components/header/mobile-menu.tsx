"use client";

import Flag from "react-world-flags";
import Link from "next/link";
import { ThemeToggle } from "@/components/header/theme-switcher";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import HamburgerIcon from "@/components/header/hamburger-icon";
import {
    LazyMotion,
    domAnimation,
    m,
    AnimatePresence,
    type Variants,
} from "framer-motion";

interface MobileMenuProps {
    isOpen: boolean;
    closeMenu: () => void;
    toggleLanguage: () => void;
    links: { href: string; label: string }[];
    isActive: (href: string) => boolean;
    handleLinkClick: (e: React.MouseEvent, href: string) => void;
    isHomePage?: boolean;
}

const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
        x: "0%",
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: "easeInOut",
            when: "beforeChildren",
            staggerChildren: 0.08,
        },
    },
    exit: {
        x: "100%",
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
            when: "afterChildren",
        },
    },
} satisfies Variants;

const itemVariants = {
    hidden: {
        opacity: 0,
        x: 40,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        x: 20,
        filter: "blur(5px)",
        transition: { duration: 0.2, ease: "easeIn" },
    },
} satisfies Variants;

export function MobileMenu({
    isOpen,
    closeMenu,
    toggleLanguage,
    links,
    isActive,
    handleLinkClick,
    isHomePage = true,
}: MobileMenuProps) {
    const currentLocale = useLocale();
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const flagCode = currentLocale === "en" ? "GB" : "CZ";
    const flagAlt = currentLocale === "en" ? "British flag" : "Czech flag";
    const languageToggleLabel =
        currentLocale === "en" ? "Switch to Czech" : "Přepnout na angličtinu";

    const flagStyle = { width: "1.5rem", height: "1rem", borderRadius: "2px" };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target as Node) &&
                !(e.target as Element).closest(".mobile-menu-button")
            ) {
                closeMenu();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeMenu();
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [closeMenu]);

    return (
        <LazyMotion features={domAnimation}>
            <AnimatePresence>
                {isOpen && (
                    <m.div
                        ref={mobileMenuRef}
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="z-[900] fixed inset-0 bg-background pt-24 pb-8 h-screen"
                        style={{ top: "0" }}
                    >
                        <Button
                            onClick={closeMenu}
                            className="group top-8 right-4 z-[1000] absolute bg-transparent hover:bg-transparent shadow-none size-10 aspect-square font-bold text-foreground hover:text-white cursor-pointer mobile-menu-button"
                            aria-label="Close menu"
                        >
                            <HamburgerIcon isOpen={isOpen} />
                        </Button>

                        <ul className="flex flex-col items-center gap-14 font-bold text-foreground text-4xl text-center">
                            {links.map((link) => {
                                const activeClass = isActive(link.href)
                                    ? "bg-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 text-transparent"
                                    : "";
                                const href = isHomePage
                                    ? link.href
                                    : `/${link.href}`;

                                return (
                                    <m.li
                                        key={href}
                                        variants={itemVariants}
                                        style={{
                                            willChange:
                                                "transform, opacity, filter",
                                        }}
                                        className={`${activeClass} hover:bg-transparent hover:text-foreground cursor-pointer uppercase`}
                                    >
                                        <Link
                                            href={`/${currentLocale}${link.href}`}
                                            className="block"
                                            onClick={(e) =>
                                                handleLinkClick(e, link.href)
                                            }
                                        >
                                            {link.label}
                                        </Link>
                                    </m.li>
                                );
                            })}
                        </ul>

                        <m.div
                            variants={itemVariants}
                            className="flex justify-center items-center gap-6 mt-10"
                            style={{ willChange: "transform, opacity, filter" }}
                        >
                            <ThemeToggle />
                            <Button
                                onClick={toggleLanguage}
                                variant="ghost"
                                size="icon"
                                className="relative rounded-full size-10 cursor-pointer"
                                aria-label={languageToggleLabel}
                            >
                                <Flag
                                    code={flagCode}
                                    style={flagStyle}
                                    alt={flagAlt}
                                />
                            </Button>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
}
