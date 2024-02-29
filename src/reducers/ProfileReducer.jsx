import { action } from "../actions";

const initialState = {
  user: null,
  posts: [],
  loading: false,
  error: null,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case action.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case action.profile.DATA_FECTHED: {
      return {
        ...state,
        loading: false,
        user: action.data.user,
        posts: action.data.posts,
      };
    }

    case action.profile.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
};

export { profileReducer, initialState };
