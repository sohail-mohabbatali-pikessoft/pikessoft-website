import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, companyName, email, phone, message } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email, and phone are required." },
        { status: 400 }
      );
    }

    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      await resend.emails.send({
        from: "PikesSoft Website <noreply@pikessoft.com>",
        to: process.env.CONTACT_EMAIL,
        subject: `New Contact Form Submission from ${fullName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Company:</strong> ${companyName || "N/A"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
          <hr>
          <p style="color: #888; font-size: 12px;">Submitted from pikessoft.com contact form</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
