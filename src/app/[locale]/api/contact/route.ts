import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY!);

const contactFormSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
    locale: z.string().min(2),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = contactFormSchema.safeParse(body);

        if (!parsed.success) {
            return new Response(
                JSON.stringify({ error: parsed.error.format() }),
                { status: 400 }
            );
        }

        const { name, email, message, locale } = parsed.data;

        const emailTemplates = {
            en: {
                subject: "New website message",
                html: `
                    <h2>New message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong><br />${message}</p>
                `,
            },
            cz: {
                subject: "Nová zpráva z webu",
                html: `
                    <h2>Nová zpráva</h2>
                    <p><strong>Jméno:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Zpráva:</strong><br />${message}</p>
                `,
            },
        };

        const template = emailTemplates[locale as keyof typeof emailTemplates] || emailTemplates.cz;

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "topetopinka7@seznam.cz",
            subject: template.subject,
            html: template.html,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Nastala chyba" }), {
            status: 500,
        });
    }
}
