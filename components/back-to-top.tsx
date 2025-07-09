"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Button
            variant={"ghost"}
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full aspect-square size-12 bg-gradient-to-r from-blue-600 to-sky-400 text-background cursor-pointer border border-background hover:border-foreground ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
            <ArrowUp size={20} />
        </Button>
    );
}
