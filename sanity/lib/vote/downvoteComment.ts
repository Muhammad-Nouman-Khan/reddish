import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { adminClient } from "../adminClient";

export async function downvoteComment(commentId: string, userId: string) {
  // Check if user already voted for this comment
  const existingVoteDownvoteQuery = defineQuery(`
    *[_type == "vote" && comment._ref == $commentId && user._ref == $userId][0]
  `);

  const existingVote = await sanityFetch({
    query: existingVoteDownvoteQuery,
    params: { commentId, userId },
  });

  if (existingVote.data) {
    const vote = existingVote.data;

    if (vote.voteType === "downvote") {
      return await adminClient.delete(vote._id);
    }

    if (vote.voteType === "upvote") {
      return await adminClient
        .patch(vote._id)
        .set({ voteType: "downvote" })
        .commit();
    }
  }

  //Create new vote
  return await adminClient.create({
    _type: "vote",
    comment: {
      _type: "reference",
      _ref: commentId,
    },
    user: {
      _type: "reference",
      _ref: userId,
    },
    voteType: "downvote",
    createdAt: new Date().toISOString(),
  });
}
