"use client";
import { NextIntlClientProvider } from "next-intl";

export default function LocaleProvider({
    messages,
    locale,
    timeZone,
    children,
}: {
    messages: object;
    locale: string;
    timeZone?: string;
    children: React.ReactNode;
}) {
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone={timeZone}
        >
            {children}
        </NextIntlClientProvider>
    );
}
