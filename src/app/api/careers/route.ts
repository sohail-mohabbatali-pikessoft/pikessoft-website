import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const expertise = formData.get("expertise") as string;
    const resume = formData.get("resume") as File | null;

    if (!fullName || !email || !expertise) {
      return NextResponse.json(
        { error: "Name, email, and expertise are required." },
        { status: 400 }
      );
    }

    const resumeName = resume && resume.size > 0 ? resume.name : null;

    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      await resend.emails.send({
        from: "PikesSoft Careers <noreply@pikessoft.com>",
        to: process.env.CONTACT_EMAIL,
        subject: `New Career Application from ${fullName}`,
        html: `
          <h2>New Career Application</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Expertise:</strong> ${expertise}</p>
          ${resumeName ? `<p><strong>Resume file:</strong> ${resumeName}</p>` : ""}
          <hr>
          <p style="color: #888; font-size: 12px;">Submitted from pikessoft.com careers form</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
