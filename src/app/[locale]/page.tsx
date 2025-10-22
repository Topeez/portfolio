import { Header } from "@/components/header/header";
import { Footer } from "@/components/sections/footer";
import Hero from "@/components/hero/hero";
import AboutMe from "@/components/sections/aboutme";
import Projects from "@/components/sections/projects";
import { Spacer } from "@/components/utils/spacer";
import { TechStack } from "@/components/sections/tech-stack";
import { HeroDivider } from "@/components/hero/hero-divider";
import { Ambient } from "@/components/hero/hero-ambient";
import { Contact } from "@/components/sections/contact";

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
            <Contact />
            <Footer />
        </>
    );
}
