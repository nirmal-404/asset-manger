import { getAssetByIdAction } from "@/actions/dashboard-actions";
import { hasUserPurchasedAssetAction } from "@/actions/payment-actions";
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

    const hasPurchased = await hasUserPurchasedAssetAction(id);

    if (!hasPurchased) {
      return NextResponse.redirect(new URL(`/gallery/${id}`, request.url));
    }

    const result = await getAssetByIdAction(id);

    if (!result) {
      return NextResponse.redirect(new URL(`/gallery`, request.url));
    }

    return NextResponse.redirect(result?.asset.fileUrl);
  } catch (e) {
    return NextResponse.redirect(new URL(`/gallery`, request.url));
  }
}
