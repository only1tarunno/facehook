import { useEffect } from "react";

import useAxios from "../../hooks/useAxios";
import PostList from "../../components/Posts/PostList";
import { actions } from "../../actions";
import usePost from "../../hooks/usePost";
import NewPost from "../../components/Posts/NewPost";

const HomePage = () => {
  const { state, dispatch } = usePost();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const fetchpost = async () => {
      try {
        const res = await api.get(`/posts`);
        if (res?.status) {
          dispatch({ type: actions.post.DATA_FETCHED, data: res.data });
        }
      } catch (error) {
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };

    fetchpost();
  }, []);

  if (state?.loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <NewPost />
      <PostList posts={state?.posts} />
    </>
  );
};

export default HomePage;
