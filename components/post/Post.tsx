import { GetAllPostsQueryResult } from "@/sanity.types";
import { getUserPostVoteStatus } from "@/sanity/lib/post/getUserPostVoteStatus";
import { getPostComments } from "@/sanity/lib/vote/getPostComments";
import { getPostVotes } from "@/sanity/lib/vote/getPostVotes";

interface PostProps {
  post: GetAllPostsQueryResult[number];
  userId: string | null;
}

const Post = async ({ post, userId }: PostProps) => {
  const votes = await getPostVotes(post._id);
  const vote = await getUserPostVoteStatus(post._id, userId);
  const comments = await getPostComments(post._id, userId);
  return <div>Post</div>;
};

export default Post;
