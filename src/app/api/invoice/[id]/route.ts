import { getInvoiceHtmlAction } from "@/actions/invoice-actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user.id) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const result = await getInvoiceHtmlAction(id);

    if (!result.success || !result.html) {
      return NextResponse.redirect(
        new URL("/dashboard/purchases", request.url)
      );
    }

    return new NextResponse(result.html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (e) {
    return NextResponse.redirect(new URL("/dashboard/purchases", request.url));
  }
}
