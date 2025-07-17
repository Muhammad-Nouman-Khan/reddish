import { GetPostCommentsQueryResult } from "@/sanity.types";
import React from "react";

const Comment = ({
  postId,
  comment,
  userId,
}: {
  postId: string;
  comment: GetPostCommentsQueryResult[number];
  userId: string | null;
}) => {
  return <div>Comment</div>;
};

export default Comment;
