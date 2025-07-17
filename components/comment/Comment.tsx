import { GetPostCommentsQueryResult } from "@/sanity.types";
import { getCommentReplies } from "@/sanity/lib/comment/getCommentReplies";
import React from "react";

const Comment = async ({
  postId,
  comment,
  userId,
}: {
  postId: string;
  comment: GetPostCommentsQueryResult[number];
  userId: string | null;
}) => {
  const replies = await getCommentReplies(comment._id, userId);
  const userVoteStatus = comment.votes.voteStatus;
  return (
    <article>
      <div></div>
    </article>
  );
};

export default Comment;
