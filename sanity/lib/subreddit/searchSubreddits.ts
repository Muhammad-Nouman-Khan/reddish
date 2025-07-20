import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function searchSubreddits(searchTerm: string) {
  if (!searchTerm || searchTerm.trim() === "") return [];

  // searchTerm + "*" is a wildcard query means search for all subreddits that start with the searchTerm. Without "*" it would be an exact match. With "*" it will match all subreddits that contain the searchTerm.
  const searchSubredditsQuery = defineQuery(`
    *[_type == "subreddit" && title match $searchTerm + "*"] {
      _id,
      title,
      "slug": slug.current,
      description,
      image,
      "moderator": moderator->,
      createdAt,
    } | order(createdAt desc)
  `);

  const results = await sanityFetch({
    query: searchSubredditsQuery,
    params: { searchTerm: searchTerm.toLowerCase() },
  });

  return results.data;
}
