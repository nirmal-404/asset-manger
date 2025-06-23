import { getAssetByIdAction } from "@/actions/dashboard-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import {
  CheckCircle,
  Download,
  Info,
  Loader2,
  ShoppingCart,
  Tag,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

interface GalleryDetailsPageProps {
  params: {
    id: string;
  };
  searchParams: {
    success?: string;
    canceled?: string;
    error?: string;
  };
}

function GalleryDetailsPage({ params, searchParams }: GalleryDetailsPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[65vh]">
          <Loader2 className="h-8 w-8 animate-spin text-black" />
        </div>
      }
    >
      <GalleryContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

export default GalleryDetailsPage;

async function GalleryContent({
  params,
  searchParams,
}: GalleryDetailsPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && session?.user?.role === "admin") {
    redirect("/");
  }

  const success = searchParams?.success;

  const result = await getAssetByIdAction(params?.id);

  if (!result) {
    notFound();
  }

  const { asset, categoryName, userName, userImage, userId } = result;

  const isAuthor = session?.user.id === userId;

  async function handlePurchase() {
    "use server";

    // TODO: implemet the payment + server action + redirect logic

  }

  return (
    <div className="min-h-screen container px-4 bg-white">
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p>Purchase Successfull! You can now download this asset</p>
        </div>
      )}
      <div className="container py-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <div className="rounded-lg overflow-hidden bg-gray-100 border">
              <div className="relative w-full">
                <Image
                  src={asset.fileUrl}
                  alt={asset.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{asset?.title}</h1>
                {categoryName && (
                  <Badge className="mt-2 bg-gray-200 text-gray-700 hover:bg-gray-300">
                    <Tag className="mr-1 h-4 w-4" />
                    {categoryName}
                  </Badge>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-500">Creator</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="sticky top-24">
              <Card className="overflow-hidden border-0 shadow-lg rounded-xl">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Premium Asset</h3>
                  <div>
                    <span className="text-3xl font-bold">LKR 5000.00</span>
                    <span className="ml-2 text-gray-300">
                      One Time Purchase
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {session?.user ? (
                      isAuthor ? (
                        <div className="bg-blue-50 text-blue-700 p-5 rounded-lg flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                          <p className="text-sm">
                            This is your own asset.You can't purchase your own
                            asset
                          </p>
                        </div>
                      ) : false ? (
                        <Button
                          asChild
                          className="w-full bg-green-600 text-white h-12"
                        >
                          <a href={`/api/download/${params.id}`} download>
                            <Download className="mr-2 w-6 h-6" />
                            Download Asset
                          </a>
                        </Button>
                      ) : (
                        <form action={handlePurchase}>
                          <Button
                            type="submit"
                            className="w-full bg-black text-white h-12"
                          >
                            <ShoppingCart className="mr-2 w-6 h-6" />
                            Puchase Now
                          </Button>
                        </form>
                      )
                    ) : (
                      <>
                        <Button
                          asChild
                          className="w-full bg-black text-white h-12"
                        >
                          <Link href="/login">Sign In to Purchase</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
