"use client";
import {
  GetPostVotesQueryResult,
  GetUserPostVoteStatusQueryResult,
} from "@/sanity.types";
import { useUser } from "@clerk/nextjs";
import { ArrowDown, ArrowUp } from "lucide-react";
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

  const handleUpVote = () => {};

  const handleDownVote = () => {};

  return (
    <div className="flex flex-col items-center bg-gray-50 p-2 rounded-l-md">
      <button
        disabled={!isSignedIn || isPending || !user}
        onClick={handleUpVote}
        className={`p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed ${optimisticVote === "upvote" ? "bg-orange-100" : "hover:bg-gray-100"}
        ${isPending && "opacity-50 cursor-not-allowed"}`}
      >
        <ArrowUp
          className={`w-5 h-5 ${optimisticVote === "upvote" ? "text-orange-500 font-bold" : "text-gray-400 hover:text-orange-500"}`}
        />
      </button>
      <span className="text-sm font-medium text-gray-900">
        {optimisticScore}
      </span>
      <button
        disabled={!isSignedIn || isPending || !user}
        onClick={handleDownVote}
        className={`p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed ${optimisticVote === "downvote" ? "bg-blue-100" : "hover:bg-gray-100"}
        ${isPending && "opacity-50 cursor-not-allowed"}`}
      >
        <ArrowDown
          className={`w-5 h-5 ${optimisticVote === "downvote" ? "text-blue-500 font-bold" : "text-gray-400 hover:text-blue-500"}`}
        />
      </button>
    </div>
  );
};

export default PostVoteButtons;
