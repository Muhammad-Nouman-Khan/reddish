"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Input } from "../ui/input";

const CommentInput = ({
  postId,
  parentCommentId,
}: {
  postId: string;
  parentCommentId?: string;
}) => {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { user } = useUser();
  return (
    <form>
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder={user ? "Add a comment..." : "Sign in to comment"}
        disabled={!user || isPending}
      />
    </form>
  );
};

export default CommentInput;
