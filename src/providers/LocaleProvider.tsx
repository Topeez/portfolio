"use client";
import { NextIntlClientProvider } from "next-intl";

export default function LocaleProvider({
    messages,
    locale,
    children,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: any;
    locale: string;
    children: React.ReactNode;
}) {
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}