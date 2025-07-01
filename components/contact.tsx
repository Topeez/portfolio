import { ContactForm } from "./contact-form";
import { useTranslations } from "next-intl";

export function Contact() {
    const t = useTranslations("Contact");

    return (
        <section id="contact" className="py-16 w-full">
            <div className="flex flex-col justify-center items-center space-y-8 md:text-left text-center cs-container">
                <h2 className="bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 font-bold text-transparent text-5xl slide-up">{t("title")}</h2>
                <h3 className="font-bold text-3xl">{t("subtitle")}</h3>

                <ContactForm />
            </div>
        </section>
    );
}