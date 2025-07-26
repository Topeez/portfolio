"use client";

import { Braces, CodeXml, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { useState, useMemo, useCallback, memo, useEffect } from "react";
import React from "react";
import GlareHover from "@/src/blocks/Animations/GlareHover/GlareHover";

// Custom typing animation component with underscore cursor
type TypingAnimationProps = {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
};

const TypingAnimation = ({
    text,
    speed = 100,
    delay = 0,
    className = "",
    onComplete,
}: TypingAnimationProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText("");
        setCurrentIndex(0);
        setIsComplete(false);
    }, [text]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(
                () => {
                    setDisplayedText((prev) => prev + text[currentIndex]);
                    setCurrentIndex((prev) => prev + 1);

                    // Check if animation is complete
                    if (currentIndex + 1 === text.length) {
                        setIsComplete(true);
                        onComplete?.();
                    }
                },
                currentIndex === 0 ? delay : speed
            );

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed, delay, onComplete]);

    // Cursor blinking effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <span className={className}>
            {displayedText}
            {!isComplete && (
                <span
                    className={`inline-block ml-1 transition-opacity duration-200 ${
                        showCursor ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <svg
                        width="0.8em"
                        height="0.2em"
                        viewBox="0 0 16 4"
                        fill="currentColor"
                        className="inline-block rotate-90"
                    >
                        <rect x="0" y="0" width="16" height="3" />
                    </svg>
                </span>
            )}
        </span>
    );
};

// Sequential typing animation component that handles multiple text segments
type SequentialTypingProps = {
    segments: Array<{
        text: string;
        className?: string;
        speed?: number;
        delay?: number;
    }>;
    className?: string;
};

const SequentialTyping = ({
    segments,
    className = "",
}: SequentialTypingProps) => {
    const [currentSegment, setCurrentSegment] = useState(0);
    const [completedSegments, setCompletedSegments] = useState<string[]>([]);
    const [showFinalCursor, setShowFinalCursor] = useState(true);
    const [allComplete, setAllComplete] = useState(false);

    useEffect(() => {
        // Reset when segments change
        setCurrentSegment(0);
        setCompletedSegments([]);
        setAllComplete(false);
    }, [segments]);

    // Final cursor blinking effect
    useEffect(() => {
        if (allComplete) {
            const cursorInterval = setInterval(() => {
                setShowFinalCursor((prev) => !prev);
            }, 530);
            return () => clearInterval(cursorInterval);
        }
    }, [allComplete]);

    const handleSegmentComplete = useCallback(
        (segmentText: string) => {
            setCompletedSegments((prev) => [...prev, segmentText]);
            const nextSegment = currentSegment + 1;
            setCurrentSegment(nextSegment);

            // Check if all segments are complete
            if (nextSegment >= segments.length) {
                setAllComplete(true);
                // Hide cursor after 2 seconds
                setTimeout(() => {
                    setShowFinalCursor(false);
                }, 2000);
            }
        },
        [currentSegment, segments.length]
    );

    return (
        <span className={className}>
            {/* Render completed segments */}
            {completedSegments.map((text, index) => {
                const segment = segments[index];
                return (
                    <span key={index} className={segment?.className || ""}>
                        {text}
                    </span>
                );
            })}

            {/* Render current typing segment */}
            {currentSegment < segments.length && (
                <TypingAnimation
                    text={segments[currentSegment].text}
                    speed={segments[currentSegment].speed || 100}
                    delay={segments[currentSegment].delay || 0}
                    className={segments[currentSegment].className || ""}
                    onComplete={() =>
                        handleSegmentComplete(segments[currentSegment].text)
                    }
                />
            )}

            {/* Show final cursor after all segments complete */}
            {allComplete && showFinalCursor && (
                <span
                    className="inline-block ml-1 transition-opacity duration-200"
                    style={{ verticalAlign: "baseline" }}
                >
                    <svg
                        width="0.8em"
                        height="0.2em"
                        viewBox="0 0 16 4"
                        fill="currentColor"
                        className="inline-block rotate-90"
                    >
                        <rect x="0" y="0" width="16" height="3" />
                    </svg>
                </span>
            )}
        </span>
    );
};

const Hero = memo(function Hero() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const t = useTranslations("HomePage");

    const handleImageLoad = useCallback(() => setImageLoaded(true), []);
    const handleImageError = useCallback(() => setImageLoaded(true), []);

    const availabilityPill = useMemo(
        () => (
            <div className="flex items-center gap-2 p-1 border border-muted rounded-4xl max-w-fit">
                <Button
                    variant="ghost"
                    className="flex items-center gap-4 bg-gradient-to-r from-blue-600 to-sky-400 p-2 rounded-4xl text-white hover:text-white text-xs"
                >
                    <div className="relative flex justify-center items-center rounded-full w-3 h-3">
                        <span className="bg-green-400 rounded-full w-3 h-3"></span>
                        <span className="absolute bg-green-400 rounded-full w-4 h-4 animate-ping"></span>
                        <span className="absolute bg-green-400 rounded-full w-full h-full animate-ping"></span>
                    </div>
                    <p>{t("available")}</p>
                </Button>
                <Link href={"/#contact"}>
                    <Button
                        variant="ghost"
                        className="p-1.5 rounded-4xl text-muted-foreground text-xs cursor-pointer"
                    >
                        {t("getintouch")}
                    </Button>
                </Link>
            </div>
        ),
        [t]
    );

    // Define the typing segments
    const titleSegments = useMemo(
        () => [
            {
                text: t("title"),
                speed: 80,
                delay: 500,
            },
            {
                text: t("name"),
                className:
                    "bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent",
                speed: 120,
                delay: 300,
            },
        ],
        [t]
    );

    const mainTitle = useMemo(
        () => (
            <h1 className="font-bold md:text-[65px] text-6xl lg:text-left text-center slide-in">
                <SequentialTyping segments={titleSegments} />
            </h1>
        ),
        [titleSegments]
    );

    const ctaButton = useMemo(
        () => (
            <div className="flex justify-start items-center mx-auto lg:mx-0 mt-16 lg:mt-20 animate-slide-up">
                <GlareHover
                    glareColor="#ffffff"
                    glareOpacity={0.5}
                    glareAngle={-45}
                    glareSize={300}
                    transitionDuration={600}
                    playOnce={false}
                    className="rounded-2xl"
                >
                    <Link href="/#about">
                        <Button className="hover:bg-gradient-to-r from-blue-600 to-sky-400 px-16 py-8 rounded-2xl hover:text-white text-2xl transition-all ease-in-out cursor-pointer">
                            <UserRound className="mr-1" />
                            {t("ctabutton")}
                        </Button>
                    </Link>
                </GlareHover>
            </div>
        ),
        [t]
    );

    const floatingIcons = useMemo(
        () => (
            <>
                <div className="hidden lg:block top-52 left-32 z-10 absolute animate-pulse duration-4000">
                    <CodeXml className="blur-[1px] size-12 text-sky-400/50" />
                </div>
                <div className="hidden lg:block bottom-28 left-14 z-10 absolute animate-blink duration-1000">
                    <CodeXml className="blur-[1px] size-10 text-blue-600/70" />
                </div>
                <div className="hidden lg:block top-44 right-14 z-10 absolute animate-pulse duration-2456">
                    <Braces className="blur-[1px] size-12 text-sky-400/50" />
                </div>
            </>
        ),
        []
    );

    const imageClassName = useMemo(
        () =>
            `sm:size-3/4 lg:size-full select-none ${imageLoaded ? "opacity-100" : "opacity-0"}`,
        [imageLoaded]
    );

    return (
        <>
            <section
                id="home"
                className="relative flex flex-col content-center lg:grid grid-cols-12 pt-32 h-full cs-container"
            >
                <div className="flex flex-col justify-center items-center lg:items-start space-y-6 lg:space-y-3 col-span-6 h-full">
                    {availabilityPill}
                    {mainTitle}
                    <h2 className="text-3xl slide-in">{t("subtitle")}</h2>
                    <div className="text-muted-foreground text-lg md:text-xl lg:text-left text-center slide-in">
                        {t("description")}
                    </div>
                    {ctaButton}
                </div>
                <div className="relative flex justify-center lg:justify-end items-center col-span-6 fade-in">
                    {/* Skeleton shown only while image is loading */}
                    {!imageLoaded && (
                        <Skeleton className="absolute inset-0 w-full h-full" />
                    )}
                    <div className="z-auto absolute inset-0 bg-gradient-to-t from-10% from-background to-30% to-transparent" />
                    <Image
                        src="/assets/img/me_transparent.png"
                        alt="me"
                        width={1800}
                        height={2400}
                        className={imageClassName}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                    {floatingIcons}
                </div>
            </section>
        </>
    );
});

export default Hero;
