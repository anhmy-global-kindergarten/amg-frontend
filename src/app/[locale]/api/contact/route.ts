import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        const { data, error } = await resend.emails.send({
            from: 'Contact Form AMG Kindergarten <onboarding@resend.dev>',
            to: ['anhmykindergarten@gmail.com'],
            subject: `New Message from ${name} via Contact Form for AMG Kindergarten`,
            replyTo: email,
            html: `
        <h1>New Contact Form Submission from AMG Kindergarten</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Email sent successfully!', data });

    } catch (e) {
        console.error("API error:", e);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}