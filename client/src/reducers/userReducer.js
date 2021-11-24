export const initialState = null;

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }

  if (action.type === "UPDATEUSER") {
    return {
      ...state,
      user: action.payload,
    };
  }

  if (action.type === "LIKE") {
    return {
      ...state,
      likes: [action.payload, ...state.likes],
    };
  }

  if (action.type === "UNLIKE") {
    return {
      ...state,
      likes: state.likes.filter((like) => like._id !== action.payload),
    };
  }

  if (action.type === "ADDPOST") {
    return {
      ...state,
      posts: [action.payload, ...state.posts],
    };
  }

  if (action.type === "DELETEPOST") {
    return {
      ...state,
      posts: state.posts.filter((post) => post._id !== action.payload),
    };
  }

  if (action.type === "FOLLOW") {
    return {
      ...state,
      user: {
        ...state,
        following: [action.payload, ...state.user.following],
      },
    };
  }

  if (action.type === "UNFOLLOW") {
    return {
      ...state,
      user: {
        ...state,
        following: state.user.following.filter(
          (follow) => follow !== action.payload
        ),
      },
    };
  }

  return state;
};
