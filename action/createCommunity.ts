"use server";

import { getUser } from "@/sanity/lib/user/getUser";

export type ImageData = {
  base64: string;
  filename: string;
  contentType: string;
} | null;

export async function createCommunity(
  name: string,
  imageBase64: string | null | undefined,
  imageFileName: string | null | undefined,
  imageContentType: string | null | undefined,
  slug?: string,
  description?: string
) {
  try {
    const user = await getUser();
    if ("error" in user) {
      return { error: user.error };
    }

    let imageData: ImageData = null;
    if (imageBase64 && imageFileName && imageContentType) {
      imageData = {
        base64: imageBase64,
        filename: imageFileName,
        contentType: imageContentType,
      };
    }

    const result = await createSubreddit(
      name,
      user._id,
      imageData,
      slug,
      description
    );

    return result;
  } catch (error) {
    console.error("Error creating community:", error);
    return { error: "Failed to create community. Please try again." };
  }
}
