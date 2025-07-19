"use client";
import {
  GetPostVotesQueryResult,
  GetUserPostVoteStatusQueryResult,
} from "@/sanity.types";
import { useUser } from "@clerk/nextjs";
import { useState, useTransition } from "react";

const PostVoteButtons = ({
  contentId,
  votes,
  vote,
  contentType = "post",
}: {
  contentId: string;
  votes: GetPostVotesQueryResult;
  vote: GetUserPostVoteStatusQueryResult;
  contentType?: "post" | "comment";
}) => {
  const { user, isSignedIn } = useUser();
  const [optimisticVote, setOptimisticVote] =
    useState<GetUserPostVoteStatusQueryResult>(vote);
  const [optimisticScore, setOptimisticScore] = useState<number>(
    votes.netScore
  );
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col items-center bg-gray-50 p-2 rounded-l-md">
      PostVoteButtons
    </div>
  );
};

export default PostVoteButtons;
