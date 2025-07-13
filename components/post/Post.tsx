import { GetAllPostsQueryResult } from "@/sanity.types";

interface PostProps {
  post: GetAllPostsQueryResult[number];
  userId: string | null;
}

const Post = ({ post, userId }: PostProps) => {
  return <div>Post</div>;
};

export default Post;
