import { ImageData } from "@/action/createCommunity";
import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { adminClient } from "../adminClient";
import { Subreddit } from "@/sanity.types";

export async function createSubreddit(
  name: string,
  moderatorId: string,
  imageData: ImageData | null,
  customSlug?: string,
  customDescription?: string
) {
  console.log(`Creating subreddit: ${name} with moderator: ${moderatorId}`);

  try {
    const checkExistingQuery = defineQuery(
      `*[_type == "subreddit" && title == $name][0]{  
        _id
      }`
    );

    const existingSubreddit = await sanityFetch({
      query: checkExistingQuery,
      params: { name },
    });

    if (existingSubreddit.data) {
      console.log(`Subreddit already exists: ${name}`);
      return { error: "Subreddit already exists" };
    }
    if (customSlug) {
      const checkSlugQuery = defineQuery(
        `*[_type == "subreddit" && slug.current == $slug][0]{
            _id
        }`
      );

      const existingSlug = await sanityFetch({
        query: checkSlugQuery,
        params: { slug: customSlug },
      });
      if (existingSlug.data) {
        console.log(`Subreddit with slug ${customSlug} already exists`);
        return { error: "A subreddit with this URL already exists" };
      }
    }

    const slug = customSlug || name.toLowerCase().replace(/\s+/g, "-");

    let imageAsset;
    if (imageData) {
      try {
        // extract base64 data (remove data:image/png;base64, part)
        const base64Data = imageData.base64.split(",")[1];

        // convert base64 to buffer because sanity needs it
        const buffer = Buffer.from(base64Data, "base64");

        // upload image to sanity
        imageAsset = await adminClient.assets.upload("image", buffer, {
          filename: imageData.filename,
          contentType: imageData.contentType,
        });
        console.log("Image asset:", imageAsset);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    //create subreddit document
    const subredditDoc: Partial<Subreddit> = {
      _type: "subreddit",
      title: name,
      description: customDescription || `Welcome to r/${name}!`,
      slug: {
        current: slug,
        _type: "slug",
      },
      moderator: {
        _type: "reference",
        _ref: moderatorId,
      },
      createdAt: new Date().toISOString(),
    };
    if (imageAsset) {
      subredditDoc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      };
    }
    const subreddit = await adminClient.create(subredditDoc as Subreddit);
    console.log(`Subreddit created successfully with ID : ${subreddit._id}`);
    return { success: true, subreddit };
  } catch (error) {
    console.error("Error creating subreddit:", error);
    return { error: "Failed to create subreddit" };
  }
}
