"use client";

import Flag from "react-world-flags";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react"; // Přidáno useState
import { useLocale } from "next-intl";
import HamburgerIcon from "@/components/hamburger-icon";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

interface MobileMenuProps {
    isOpen: boolean;
    closeMenu: () => void;
    toggleLanguage: () => void;
    links: { href: string; label: string }[];
    isActive: (href: string) => boolean;
    handleLinkClick: (e: React.MouseEvent, href: string) => void;
}

export function MobileMenu({
    isOpen,
    closeMenu,
    toggleLanguage,
    links,
    isActive,
    handleLinkClick,
}: MobileMenuProps) {
    const currentLocale = useLocale();
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const [showItems, setShowItems] = useState(false); // Nový stav pro řízení animace položek

    useEffect(() => {
        if (isOpen) {
            // Po otevření menu nastavíme zpoždění pro zobrazení položek
            const timer = setTimeout(() => setShowItems(true), 400);
            return () => clearTimeout(timer);
        } else {
            // Při zavření menu okamžitě skryjeme položky
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

    const listVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            x: 200,
            filter: "blur(8px)",
        },
        visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
        exit: {
            opacity: 0,
            x: 200,
            filter: "blur(8px)",
            transition: {
                duration: 0.2,
            },
        },
    };

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

                    {/* Obalení seznamu AnimatePresence pro správné mizení položek */}
                    <AnimatePresence>
                        {showItems && (
                            <motion.ul
                                variants={listVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex flex-col items-center gap-8 font-bold text-foreground text-4xl text-center"
                            >
                                {links.map((link) => (
                                    <motion.li
                                        key={link.href}
                                        variants={itemVariants}
                                        className={`${
                                            isActive(link.href)
                                                ? "bg-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 text-transparent"
                                                : ""
                                        } hover:bg-transparent hover:text-foreground p-3 rounded-md transition-all ease-fluid cursor-pointer uppercase`}
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
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>

                    <div className="flex justify-center items-center gap-6 mt-10">
                        <ModeToggle />
                        <Button
                            onClick={toggleLanguage}
                            variant="ghost"
                            size="icon"
                            className="relative rounded-full size-10 cursor-pointer"
                            aria-label={
                                currentLocale === "en"
                                    ? "Switch to Czech"
                                    : "Přepnout na angličtinu"
                            }
                        >
                            <Flag
                                code={currentLocale === "en" ? "GB" : "CZ"}
                                style={{
                                    width: "1.5rem",
                                    height: "1rem",
                                    borderRadius: "2px",
                                }}
                                alt={
                                    currentLocale === "en"
                                        ? "British flag"
                                        : "Czech flag"
                                }
                            />
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
