import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";
import { z } from "zod";

const EmailSchema = z.object({
    name: z.string().min(1, "Name is required."),
    email: z.string().email("Invalid email address."),
    subject: z.string().min(1, "Subject is required."),
    message: z.string().min(1, "Message is required."),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validated = EmailSchema.parse(body);

        const response = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            {
                ...validated,
            },
            {
                publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
            }
        );


        return NextResponse.json({ success: true, message: "Email sent successfully." });

    } catch (error) {
        console.error("Email sending error:", error);

        let errorMessage = "Failed to send email.";
        let statusCode = 500;

        if (error instanceof z.ZodError) {
            errorMessage = error.issues.map((err: z.ZodIssue) => err.message).join(", ");
            statusCode = 400;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }
}