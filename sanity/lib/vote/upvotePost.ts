import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { adminClient } from "../adminClient";

export async function upvotePost(postId: string, userId: string) {
  const existingVoteUpvoteQuery = defineQuery(`
    *[_type == "vote" && post._ref == $postId && user._ref == $userId][0]
  `);

  const existingVote = await sanityFetch({
    query: existingVoteUpvoteQuery,
    params: { postId, userId },
  });

  if (existingVote.data) {
    const vote = existingVote.data;

    // if there is an existing upvote, delete it
    if (vote.voteType === "upvote") {
      return await adminClient.delete(vote._id);
    }

    // if there is an existing downvote, change it to an upvote
    if (vote.voteType === "downvote") {
      return await adminClient
        .patch(vote._id)
        .set({ voteType: "upvote" })
        .commit();
    }
  }

  //Create new vote
  return await adminClient.create({
    _type: "vote",
    post: {
      _type: "reference",
      _ref: postId,
    },
    user: {
      _type: "reference",
      _ref: userId,
    },
    voteType: "upvote",
    createdAt: new Date().toISOString(),
  });
}
