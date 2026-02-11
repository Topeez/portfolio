import { z } from "zod";


type TranslationFunction = (key: string) => string;

export const createContactSchema = (t: TranslationFunction) => {
    return z.object({
        name: z.string().min(2, {
            message: t("errors.name.tooShort"),
        }),
        email: z.string().email({
            message: t("errors.email.invalid"),
        }),
        message: z.string().min(10, {
            message: t("errors.message.tooShort"),
        }),
    });
};


export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
