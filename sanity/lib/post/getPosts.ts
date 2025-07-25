import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getPosts() {
  const getAllPostsQuery = defineQuery(
    `*[_type == "post" && isDeleted != true]{
        _id,
        title,
        "slug": slug.current,
        body,
        publishedAt,
        "author": author->,
        "subreddit": subreddit->,
        image,
        isDeleted
    } | order(publishedAt desc)`
  );
  const posts = await sanityFetch({ query: getAllPostsQuery });
  return posts.data;
}
