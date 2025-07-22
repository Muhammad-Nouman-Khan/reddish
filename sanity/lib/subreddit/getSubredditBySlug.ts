import { defineQuery } from "groq";
import { sanityFetch } from "../live";
export async function getSubredditBySlug(slug: string) {
  const lowerCaseSlug = slug.toLowerCase();
  const getSubredditBySlugQuery = await defineQuery(
    `*[_type == "subreddit" && slug.current == $slug][0] {
        ...,
        "slug": slug.current,
        "moderators": moderator->,
    }`
  );
  const subreddit = await sanityFetch({
    query: getSubredditBySlugQuery,
    params: { slug: lowerCaseSlug },
  });
  return subreddit.data;
}
