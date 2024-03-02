/* eslint-disable react/prop-types */
import PoastHeader from "./PoastHeader";
import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComments from "./PostComments";

const PostCard = ({ post }) => {
  return (
    <article className="card mt-6 lg:mt-8">
      <PoastHeader post={post} />
      <PostBody post={post} />
      <PostAction post={post} commentCount={post?.comments?.length} />
      <PostComments post={post} />
    </article>
  );
};

export default PostCard;
