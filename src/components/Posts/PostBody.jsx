/* eslint-disable react/prop-types */

const PostBody = ({ post }) => {
  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
      <p className="mb-4">{post?.content ?? "No Content Available"}</p>

      <div className="flex items-center justify-center overflow-hidden">
        {post?.image && (
          <img
            className="w-1/2"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${post?.image}`}
            alt="poster"
          />
        )}
      </div>
    </div>
  );
};

export default PostBody;
