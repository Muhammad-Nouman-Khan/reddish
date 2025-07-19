import {
  GetCommentRepliesQueryResult,
  GetPostCommentsQueryResult,
} from "@/sanity.types";
import { getCommentReplies } from "@/sanity/lib/comment/getCommentReplies";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const Comment = async ({
  postId,
  comment,
  userId,
}: {
  postId: string;
  comment:
    | GetPostCommentsQueryResult[number]
    | GetCommentRepliesQueryResult[number];
  userId: string | null;
}) => {
  const replies = await getCommentReplies(comment._id, userId);
  const userVoteStatus = comment.votes.voteStatus;
  return (
    <article className="py-5 border-b border-gray-100 last:border-0">
      <div className="flex gap-4">
        {/* PostVoteButtons */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {comment.author?.imageUrl ? (
              <div className="flex-shrink-0">
                <Image src={comment.author.imageUrl} alt={`${comment.author.username}'s profile`} className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              </div>
            ):(
              <div className="flex-shrink-0">
                <UserCircle className="w-10 h-10 text-gray-300" />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Comment;
