"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const STARS = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    size: Math.random() * 2 + 1,
    delay: Math.random() * 1.5,
    duration: 1.5 + Math.random() * 2,
}));

const BOKEH = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 40,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
}));

export default function ClientOnlyAnimations() {
    const { theme } = useTheme();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    if (theme === "dark") {
        return (
            <>
                {STARS.map((star) => (
                    <span
                        key={star.id}
                        className="absolute bg-white rounded-full animate-twinkle"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            boxShadow: "0 0 4px 1px rgba(255,255,255,0.8)",
                            animationDuration: `${star.duration}s`,
                            animationDelay: `${star.delay}s`,
                        }}
                    />
                ))}
            </>
        );
    }

    return (
        <>
            {BOKEH.map((circle) => (
                <span
                    key={circle.id}
                    className="absolute rounded-full animate-bokeh pointer-events-none mix-blend-overlay"
                    style={{
                        left: `${circle.x}%`,
                        top: `${circle.y}%`,
                        width: `${circle.size}px`,
                        height: `${circle.size}px`,
                        background:
                            "linear-gradient(to right, #2563eb, #38bdf8)",
                        filter: "blur(8px)",
                        animationDuration: `${circle.duration}s`,
                        animationDelay: `${circle.delay}s`,
                    }}
                />
            ))}
        </>
    );
}
