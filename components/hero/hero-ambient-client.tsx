"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

// 1. Remove 'memo' wrapper. The Compiler auto-memoizes the component.
export default function ClientOnlyAnimations() {
    const { theme } = useTheme();

    // 2. Use Lazy State for random data.
    const [stars] = useState(() =>
        Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            x: Math.floor(Math.random() * 100),
            y: Math.floor(Math.random() * 100),
            size: Math.random() * 2 + 1,
            delay: Math.random() * 1.5,
            duration: 1.5 + Math.random() * 2,
        })),
    );

    const [bokeh] = useState(() =>
        Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 20 + Math.random() * 40,
            delay: Math.random() * 5,
            duration: 10 + Math.random() * 10,
        })),
    );

    const starElements = stars.map((star) => (
        <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: [0, 1, 0.3, 1, 0],
                scale: [0.5, 1.2, 0.8, 1.1, 0.5],
            }}
            transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            }}
            style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.8)",
            }}
        />
    ));

    const bokehElements = bokeh.map((circle) => (
        <motion.div
            key={circle.id}
            className="absolute bg-gradient-to-r from-blue-600 to-sky-400 rounded-full pointer-events-none mix-blend-overlay"
            initial={{ opacity: 0.1, scale: 0.8, y: 0 }}
            animate={{
                opacity: 0.2,
                scale: 1.2,
                y: -20,
            }}
            transition={{
                duration: circle.duration,
                delay: circle.delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            }}
            style={{
                left: `${circle.x}%`,
                top: `${circle.y}%`,
                width: `${circle.size}px`,
                height: `${circle.size}px`,
                filter: "blur(8px)",
            }}
        />
    ));

    const shootingStars = (
        <>
            <motion.div
                className="absolute bg-gradient-to-r from-transparent via-white to-transparent h-[2px]"
                initial={{ left: "-100px", top: "15%" }}
                animate={{ left: "200%" }}
                transition={{
                    duration: 1.5,
                    delay: 3,
                    repeat: Infinity,
                    repeatDelay: 10,
                    ease: "easeOut",
                }}
                style={{ width: "80px" }}
            />
            <motion.div
                className="absolute bg-gradient-to-r from-blue-600 via-sky-400 to-transparent h-[2px]"
                initial={{ left: "-100px", top: "75%" }}
                animate={{ left: "100%" }}
                transition={{
                    duration: 1.2,
                    delay: 7,
                    repeat: Infinity,
                    repeatDelay: 15,
                    ease: "easeOut",
                }}
                style={{ width: "50px" }}
            />
        </>
    );

    if (theme === "dark") {
        return (
            <>
                {starElements}
                {shootingStars}
            </>
        );
    } else {
        return <>{bokehElements}</>;
    }
}
