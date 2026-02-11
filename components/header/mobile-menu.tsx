"use client";

import Flag from "react-world-flags";
import Link from "next/link";
import { ThemeToggle } from "@/components/header/theme-switcher";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import HamburgerIcon from "@/components/header/hamburger-icon";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
    isOpen: boolean;
    closeMenu: () => void;
    toggleLanguage: () => void;
    links: { href: string; label: string }[];
    isActive: (href: string) => boolean;
    handleLinkClick: (e: React.MouseEvent, href: string) => void;
    isHomePage?: boolean;
}

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
    const [showItems, setShowItems] = useState(false);

    const flagCode = currentLocale === "en" ? "GB" : "CZ";
    const flagAlt = currentLocale === "en" ? "British flag" : "Czech flag";
    const languageToggleLabel =
        currentLocale === "en" ? "Switch to Czech" : "Přepnout na angličtinu";

    const flagStyle = {
        width: "1.5rem",
        height: "1rem",
        borderRadius: "2px",
    };

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setShowItems(true), 100);
            return () => clearTimeout(timer);
        } else {
            setShowItems(false);
        }
    }, [isOpen]);

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

    const menuItems = links.map((link, index) => {
        const activeClass = isActive(link.href)
            ? "bg-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 text-transparent"
            : "";

        const href = isHomePage ? link.href : `/${link.href}`;

        return (
            <li
                key={href}
                className={`${activeClass} hover:bg-transparent hover:text-foreground transition-all duration-500 ease-in-out cursor-pointer uppercase ${
                    showItems
                        ? "opacity-100 translate-x-0 blur-none"
                        : "opacity-0 translate-x-32 blur-sm"
                }`}
                style={{
                    transitionDelay: showItems ? `${index * 150}ms` : "0ms",
                }}
            >
                <Link
                    href={`/${currentLocale}${link.href}`}
                    className="block"
                    onClick={(e) => handleLinkClick(e, link.href)}
                >
                    {link.label}
                </Link>
            </li>
        );
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={mobileMenuRef}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="z-[900] fixed inset-0 bg-background pt-24 pb-8 h-screen"
                    style={{ top: "5" }}
                >
                    <Button
                        onClick={closeMenu}
                        className="group top-8 right-4 z-[1000] absolute bg-transparent hover:bg-transparent shadow-none size-10 aspect-square font-bold text-foreground hover:text-white cursor-pointer mobile-menu-button"
                        aria-label="Close menu"
                    >
                        <HamburgerIcon isOpen={isOpen} />
                    </Button>

                    <ul className="flex flex-col items-center gap-14 font-bold text-foreground text-4xl text-center">
                        {menuItems}
                    </ul>

                    <div
                        className={`flex justify-center items-center gap-6 mt-10 transition-all duration-500 ease-in-out ${
                            showItems
                                ? "opacity-100 translate-y-0 blur-none"
                                : "opacity-0 translate-y-4 blur-sm"
                        }`}
                        style={{
                            transitionDelay: showItems
                                ? `${links.length * 150}ms`
                                : "0ms",
                        }}
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
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
