"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function Ambient() {
    const { theme } = useTheme();

    const stars = Array.from({ length: 100 }).map((_, i) => ({
        id: i,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        size: Math.random() * 2 + 1,
        delay: Math.random() * 1.5,
        duration: 1.5 + Math.random() * 2,
    }));

    const bokeh = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 40,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
    }));

    return (
        <>
            <div className="hidden md:block z-[-1] absolute inset-0 size-full">
                <div className="top-12 -left-10 absolute bg-blue-600 opacity-45 blur-2xl w-65 h-6 -rotate-[55deg] animate-slide-in-ambient-1"></div>
                <div className="top-12 -left-82 absolute bg-sky-400 opacity-75 blur-3xl w-[1400px] h-8 -rotate-[55deg] animate-slide-in-ambient-2 delay-200"></div>
                <div className="top-[200px] left-32 absolute bg-blue-600 opacity-15 blur-2xl w-[1400px] h-32 -rotate-[55deg] animate-slide-in-ambient-3 delay-500"></div>
                <div className="top-[325px] right-[400px] absolute bg-blue-600 opacity-50 blur-3xl w-[200px] h-[400px] animate-fade-in-ambient4"></div>
            </div>

            {/* Mobile-only background */}
            <div className="md:hidden block -z-[1] absolute inset-0 size-full overflow-hidden">
                {theme === "dark" ? (
                    <>
                        {stars.map((star) => (
                            <motion.div
                                suppressHydrationWarning={true}
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
                                    boxShadow:
                                        "0 0 4px 1px rgba(255, 255, 255, 0.8)",
                                }}
                            />
                        ))}

                        {/* Shooting stars */}
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
                ) : (
                    <>
                        {bokeh.map((circle) => (
                            <motion.div
                                suppressHydrationWarning={true}
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
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
