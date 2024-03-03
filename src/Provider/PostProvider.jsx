/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { initialState, postReducer } from "../reducers/PostReducer";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const { state, dispatch } = useReducer(postReducer, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
