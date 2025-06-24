import { getUserInvoicesAction } from "@/actions/invoice-actions";
import { getAllUserPurchasedAssetsAction } from "@/actions/payment-actions";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Download, FileText } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

async function UserPurchasesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session === null) return null;

  if (!session.user) redirect("/login");
  if (session?.user?.role === "admin") redirect("/");

  const purchasesResult = await getAllUserPurchasedAssetsAction();
  const invoicesResult = await getUserInvoicesAction();

  const purchases = Array.isArray(purchasesResult) ? purchasesResult : [];
  const invoices =
    invoicesResult.success && invoicesResult.invoices
      ? invoicesResult.invoices
      : [];

  const purchaseToInvoiceMap = new Map();
  invoices.forEach((inv) => purchaseToInvoiceMap.set(inv.purchaseId, inv.id));

  console.log(purchases, "invoices", invoices);

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-6">My Purchases</h1>
      {purchases.length === 0 ? (
        <p>You haven't purchased any asset yet</p>
      ) : (
        <div className="space-y-4">
          {purchases.map(({ purchase, asset }) => (
            <div
              key={purchase.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:shadow-sm"
            >
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={asset.fileUrl}
                  alt={asset.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-medium truncate">{asset?.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Purchased at{" "}
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Button size="sm" asChild className="bg-black text-white">
                  <a href={`/api/download/${asset.id}`} download>
                    <Download className="mr-2 w-4 h-4" />
                    Download
                  </a>
                </Button>
                {purchaseToInvoiceMap.has(purchase.id) && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`/api/invoice/${purchaseToInvoiceMap.get(
                        purchase.id
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="mr-2 w-4 h-4" />
                      Invoice
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPurchasesPage;
