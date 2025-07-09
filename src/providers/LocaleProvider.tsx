"use client";
import { NextIntlClientProvider } from "next-intl";

export default function LocaleProvider({
    messages,
    locale,
    timeZone,
    children,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: any;
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
