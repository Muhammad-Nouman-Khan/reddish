import {
  GetPostVotesQueryResult,
  GetUserPostVoteStatusQueryResult,
} from "@/sanity.types";

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
  return <div>PostVoteButtons</div>;
};

export default PostVoteButtons;
