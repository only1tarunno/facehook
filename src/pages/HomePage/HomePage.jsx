import { useEffect, useReducer } from "react";
import { initialState, postReducer } from "../../reducers/PostReducer";
import useAxios from "../../hooks/useAxios";
import PostList from "../../components/Posts/PostList";
import { actions } from "../../actions";

const HomePage = () => {
  const [state, dispatch] = useReducer(postReducer, initialState);
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
      <PostList posts={state?.posts} />
    </>
  );
};

export default HomePage;
