import { NextRequest, NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") || "/";

  if (secret !== process.env.SANITY_API_TOKEN) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(slug, req.url));
}

export async function POST() {
  const draft = await draftMode();
  draft.disable();
  return NextResponse.json({ disabled: true });
}
