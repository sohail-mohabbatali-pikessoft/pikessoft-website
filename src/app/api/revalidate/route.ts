import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { _type, slug } = body;

    // Revalidate based on content type
    switch (_type) {
      case "service":
        revalidatePath("/");
        if (slug?.current) revalidatePath(`/services/${slug.current}`);
        break;
      case "project":
        revalidatePath("/portfolio");
        if (slug?.current) revalidatePath(`/portfolio/${slug.current}`);
        break;
      case "job":
        revalidatePath("/careers");
        break;
      case "teamMember":
        revalidatePath("/company");
        break;
      case "testimonial":
        revalidatePath("/");
        revalidatePath("/portfolio");
        break;
      case "siteSettings":
        revalidatePath("/", "layout");
        break;
      default:
        revalidatePath("/");
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
