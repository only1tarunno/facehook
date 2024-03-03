import { useContext } from "react";
import { PostContext } from "../Provider/PostProvider";

const usePost = () => {
  return useContext(PostContext);
};

export default usePost;
