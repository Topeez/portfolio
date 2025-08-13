import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!);

// Enhanced validation schema
const contactFormSchema = z.object({
    name: z.string()
        .min(2, "Jméno musí mít alespoň 2 znaky")
        .max(50, "Jméno nesmí překročit 50 znaků")
        .trim(),
    email: z.string()
        .email("Neplatná emailová adresa")
        .max(100, "Email nesmí překročit 100 znaků")
        .toLowerCase()
        .trim(),
    message: z.string()
        .min(10, "Zpráva musí mít alespoň 10 znaků")
        .max(1000, "Zpráva nesmí překročit 1000 znaků")
        .trim(),
    honeypot: z.string().optional(), // Bot detection
});

// Rate limiting with Map (simple in-memory solution)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip);

    if (!userLimit || now > userLimit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
        return true;
    }

    if (userLimit.count >= limit) {
        return false;
    }

    userLimit.count++;
    return true;
}

// Function to get client IP
function getClientIP(req: NextRequest): string {
    // Check various headers for the real IP
    const xForwardedFor = req.headers.get('x-forwarded-for');
    const xRealIp = req.headers.get('x-real-ip');
    const xClientIp = req.headers.get('x-client-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip'); // Cloudflare
    
    if (xForwardedFor) {
        // x-forwarded-for can contain multiple IPs, take the first one
        return xForwardedFor.split(',')[0].trim();
    }
    
    if (xRealIp) {
        return xRealIp;
    }
    
    if (xClientIp) {
        return xClientIp;
    }
    
    if (cfConnectingIp) {
        return cfConnectingIp;
    }
    
    // Fallback to a default value
    return 'unknown';
}

// Input sanitization
function sanitizeInput(input: string): string {
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .trim();
}

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
};

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders,
    });
}

export async function POST(req: NextRequest) {
    try {
        // Get client IP for rate limiting
        const ip = getClientIP(req);
        
        // Rate limiting check
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Příliš mnoho požadavků. Zkuste to prosím později." },
                { status: 429, headers: corsHeaders }
            );
        }

        // Validate Content-Type
        const contentType = req.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return NextResponse.json(
                { error: "Neplatný formát obsahu." },
                { status: 400, headers: corsHeaders }
            );
        }

        // Parse request body
        let body;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json(
                { error: "Neplatný JSON formát." },
                { status: 400, headers: corsHeaders }
            );
        }

        // Validate input
        const parsed = contactFormSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { 
                    error: "Chyba validace",
                    details: parsed.error.format()
                },
                { status: 400, headers: corsHeaders }
            );
        }

        const { name, email, message, honeypot } = parsed.data;

        // Honeypot check (silent failure for bots)
        if (honeypot) {
            return NextResponse.json(
                { success: true, message: "Zpráva byla úspěšně odeslána!" },
                { status: 200, headers: corsHeaders }
            );
        }

        // Sanitize input
        const sanitizedData = {
            name: sanitizeInput(name),
            email: sanitizeInput(email),
            message: sanitizeInput(message.replace(/\n/g, '<br>')), // Convert newlines to HTML
        };

        // Send email using Resend
        await resend.emails.send({
            from: "info@topeeez.cz",
            to: "topetopinka7@seznam.cz",
            subject: `Nová zpráva z webu od ${sanitizedData.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                        Nová zpráva z kontaktního formuláře
                    </h2>
                    <div style="background: transparent; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 10px 0;"><strong>Jméno:</strong> ${sanitizedData.name}</p>
                        <p style="margin: 10px 0;"><strong>Email:</strong> 
                            <a href="mailto:${sanitizedData.email}" style="color: #2563eb;">
                                ${sanitizedData.email}
                            </a>
                        </p>
                        <p style="margin: 10px 0;"><strong>Čas odeslání:</strong> ${new Date().toLocaleString('cs-CZ')}</p>
                    </div>
                    <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                        <h3 style="color: #374151; margin-top: 0;">Zpráva:</h3>
                        <p style="line-height: 1.6; color: #4b5563;">${sanitizedData.message}</p>
                    </div>
                </div>
            `,
        });

        // Log successful submission (without sensitive data)
        console.log(`Contact form submitted successfully from ${ip} at ${new Date().toISOString()}`);

        return NextResponse.json(
            { success: true, message: "Zpráva byla úspěšně odeslána!" },
            { status: 200, headers: corsHeaders }
        );

    } catch (error) {
        console.error("Contact form error:", error);
        
        // Check if it's a Resend-specific error
        if (error && typeof error === 'object' && 'message' in error) {
            console.error("Resend error details:", error);
        }
        
        return NextResponse.json(
            { error: "Nastala chyba při odesílání zprávy. Zkuste to prosím později." },
            { status: 500, headers: corsHeaders }
        );
    }
}