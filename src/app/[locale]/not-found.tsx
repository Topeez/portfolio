"use client";

import { AnimatePresence, LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/ui/cosmic-404";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { StarsBackground } from "@/components/utils/stars-background";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

const globeVariants: Variants = {
  hidden: { scale: 0.85, opacity: 0, y: 10 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" as const },
  },
  floating: {
    y: [-4, 4],
    transition: {
      duration: 5,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

export interface NotFoundProps {
  title?: string;
  description?: string;
  backText?: string;
}

export default function NotFound({
  title,
  description,
  backText,
}: NotFoundProps) {

  const t = useTranslations("404");
  const router = useRouter();

  const resolvedTitle = title ?? t("title");
  const resolvedDescription = description ?? t("description");
  const resolvedBackText = backText ?? t("backText");


  return (
    <div className="relative flex flex-col justify-center items-center bg-background px-4 h-[88vh]">
      <StarsBackground />
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          <m.div
            className="text-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeUp}
          >
            <div className="flex justify-center items-center gap-6 mb-10">
              <m.span
                className="font-bold text-sky-400/80 text-7xl md:text-8xl select-none"
                variants={fadeUp}
              >
                4
              </m.span>

              <m.div
                className="relative w-24 md:w-32 h-24 md:h-32"
                variants={globeVariants}
                animate={["visible", "floating"]}
              >
                <Globe />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08)_0%,transparent_70%)] pointer-events-none" />
              </m.div>

              <m.span
                className="font-bold text-sky-400/80 text-7xl md:text-8xl select-none"
                variants={fadeUp}
              >
                4
              </m.span>
            </div>

            <m.h1
              className="mb-4 font-semibold text-foreground text-3xl md:text-5xl tracking-tight"
              variants={fadeUp}
            >
              {resolvedTitle}
            </m.h1>

            <m.p
              className="mx-auto mb-10 max-w-md text-muted-foreground/70 text-base md:text-lg"
              variants={fadeUp}
            >
              {resolvedDescription}
            </m.p>

            <m.div variants={fadeUp}>
              <Button className="gap-2 hover:scale-105 transition-all duration-500 cursor-pointer" onClick={() => router.back()}>
                <ArrowLeftIcon className="size-5" />
                {resolvedBackText}
              </Button>
            </m.div>
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}
