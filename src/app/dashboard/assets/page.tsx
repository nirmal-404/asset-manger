import {
  getCategoriesAction,
  getUserAssetsAction,
} from "@/actions/dashboard-actions";
import AssetGrid from "@/components/dashboard/asset-grid";
import UploadAsset from "@/components/dashboard/upload-asset";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function UserdAssetsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session === null) return null;

  const [categories, assets] = await Promise.all([
    getCategoriesAction(),
    getUserAssetsAction(session?.user?.id),
  ]);

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">My Assets</h1>
        <UploadAsset categories={categories || []} />
      </div>
      <AssetGrid assets={assets} />
    </div>
  );
}

export default UserdAssetsPage;
