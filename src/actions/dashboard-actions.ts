"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { asset, category, user } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

const AssetSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  categoryId: z.number().positive("Please select a category"),
  fileUrl: z.string().url("Invalid file url"),
  thumbnailUrl: z.string().url("Invalid file url").optional(),
});

export async function getCategoriesAction() {
  try {
    return db.select().from(category);
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function uploadAssetAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("You must be logged in to upload asset");
  }

  try {
    const validateFields = AssetSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      categoryId: Number(formData.get("categoryId")),
      fileUrl: formData.get("fileUrl"),
      thumbnailUrl: formData.get("thumbnailUrl") || formData.get("fileUrl"),
    });

    await db.insert(asset).values({
      title: validateFields.title,
      description: validateFields.description,
      fileUrl: validateFields.fileUrl,
      thumbnailUrl: validateFields.thumbnailUrl,
      isApproved: "pending",
      userId: session.user.id,
      categoryId: validateFields.categoryId,
    });

    revalidatePath("/dashboard/assets");
    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      success: true,
      error: "Failed to upload asset !",
    };
  }
}

export async function getUserAssetsAction(userId: string) {
  try {
    return await db
      .select()
      .from(asset)
      .where(eq(asset.userId, userId))
      .orderBy(asset.createdAt);
  } catch (e) {
    return [];
  }
}

export async function getPublicAssetsAction(categoryId?: number) {
  try {
    //add multiple base conditions
    let conditions = and(eq(asset.isApproved, "approved"));

    if (categoryId) {
      conditions = and(conditions, eq(asset.categoryId, categoryId));
    }

    const query = await db
      .select({
        asset: asset,
        categoryName: category.name,
        userName: user.name,
      })
      .from(asset)
      .leftJoin(category, eq(asset.categoryId, category.id))
      .leftJoin(user, eq(asset.userId, user.id))
      .where(conditions);

    return query;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getAssetByIdAction(assetId: string) {
  try {
    const [result] = await db
      .select({
        asset: asset,
        categoryName: category.name,
        userName: user.name,
        userImage: user.image,
        userId: user.id,
      })
      .from(asset)
      .leftJoin(category, eq(asset.categoryId, category.id))
      .leftJoin(user, eq(asset.userId, user.id))
      .where(eq(asset.id, assetId));

    return result;
  } catch (e) {
    return null;
  }
}
