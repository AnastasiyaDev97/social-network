import { v1 } from "uuid";
import { actionsType } from "../../redux-store";
import { currentDate } from "const";

let initialState = {
  postsData: [
    {
      id: v1(),
      message: "it is my first post",
      likes: 30,
      date: "18.12.2020",
      isLiked: false,
    },
    {
      id: v1(),
      message: "it-kamasutra",
      likes: 10,
      date: "20.02.2021",
      isLiked: false,
    },
  ],
} as PostsType;
export type postsDataType = {
  id: string;
  message: string;
  likes: number;
  date: string | number;
  isLiked: boolean;
};

export type PostsType = {
  postsData: Array<postsDataType>;
};

export const postsReducer = (
  state: PostsType = initialState,
  action: actionsType
) => {
  switch (action.type) {
    case "POSTS/DELETE-POST":
      let deletedPost = state.postsData.filter((post) => post.id !== action.id);
      return { ...state, postsData: deletedPost };

    case "POSTS/LIKE-POST":
      return {
        ...state,
        postsData: state.postsData.map((post) =>
          post.id === action.id
            ? { ...post, likes: post.likes + 1, isLiked: true }
            : post
        ),
      };

    case "POSTS/DISLIKE-POST":
      return {
        ...state,
        postsData: state.postsData.map((post) =>
          post.id === action.id
            ? { ...post, likes: post.likes - 1, isLiked: false }
            : post
        ),
      };

    case "POSTS/ADD-POST":
      let newPost: postsDataType = {
        id: v1(),
        message: action.postText,
        likes: 0,
        date: currentDate,
        isLiked: false,
      };

      return {
        ...state,
        postsData: [...state.postsData, newPost],
      };
    default:
      return state;
  }
};

export const addPost = (postText: string) =>
  ({
    type: "POSTS/ADD-POST",
    postText: postText,
  } as const);

export const deletePost = (id: string) =>
  ({
    type: "POSTS/DELETE-POST",
    id,
  } as const);

export const likePost = (id: string) =>
  ({
    type: "POSTS/LIKE-POST",
    id,
  } as const);

export const dislikePost = (id: string) =>
  ({
    type: "POSTS/DISLIKE-POST",
    id,
  } as const);

export default postsReducer;
