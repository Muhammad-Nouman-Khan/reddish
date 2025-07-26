import { getPosts } from "@/sanity/lib/post/getPosts";
import { currentUser } from "@clerk/nextjs/server";
import Post from "./Post";
import { GetAllPostsQueryResult } from "@/sanity.types";

async function PostsList() {
  const posts = await getPosts();
  const user = await currentUser();
  return (
    <div className="space-y-4">
      {posts.map((post: GetAllPostsQueryResult[number]) => (
        <Post key={post._id} post={post} userId={user?.id || null} />
      ))}
    </div>
  );
}

export default PostsList;
