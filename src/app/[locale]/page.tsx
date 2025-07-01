import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Hero from "@/components/hero";
import { AboutMe } from "@/components/aboutme";
import { Projects } from "@/components/projects";
import { Spacer } from "@/components/spacer";
import { TechStack } from "@/components/tech-stack";
import { HeroDivider } from "@/components/hero-divider";
import { Ambient } from "@/components/hero-ambient";

export default function Home() {

    return (
        <>
            <Ambient />
            <Header />
            <Hero />
            <HeroDivider />
            <AboutMe />
            <Spacer />
            <Projects />
            <Spacer />
            <TechStack />
            <Spacer />
            <Footer />
        </>
    );
}

