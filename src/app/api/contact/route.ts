import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY!);

const contactFormSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
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

        const { name, email, message } = parsed.data;

        await resend.emails.send({
            from: "info@topeeez.cz",
            to: "topetopinka7@seznam.cz",
            subject: "Nová zpráva z webu",
                html: `
                    <h2>Nová zpráva</h2>
                    <p><strong>Jméno:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Zpráva:</strong><br />${message}</p>
                `,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Nastala chyba" }), {
            status: 500,
        });
    }
}
