import React, { FC, memo } from "react";
import { Post } from "./Post/Post";
import { useFormik } from "formik";
import { EMPTY_STRING } from "../../const";
import { MyPostsPropsT } from "./MyPostsContainer";
import style from "./MyPosts.module.scss";
import SuperButton from "../SuperButton/SuperButton";
import SuperTextarea from "../SuperTextarea/SuperTextarea";

export const MyPosts: FC<MyPostsPropsT> = memo(
  ({
    postsData,
    addPost,
    profile,
    email,
    deletePost,
    likePost,
    dislikePost,
  }) => {
    let postsElements = postsData.map(
      ({ message, likes, date, id, isLiked }) => (
        <Post
          key={id}
          message={message}
          likesCount={likes}
          date={date}
          fullName={profile.fullName}
          email={email}
          photo={profile.photos.small}
          id={id}
          deletePost={deletePost}
          likePost={likePost}
          isLiked={isLiked}
          dislikePost={dislikePost}
        />
      )
    );

    const formik = useFormik({
      initialValues: {
        newPost: EMPTY_STRING,
      },

      onSubmit: (values) => {
        addPost(values.newPost);
        formik.resetForm();
      },
    });

    return (
      <div className={style.myPostsContainer}>
        {postsElements}
        <form className={style.addPostForm} onSubmit={formik.handleSubmit}>
          <SuperTextarea
            placeholder={"add post"}
            {...formik.getFieldProps("newPost")}
            className={style.fieldAddPost}
          />
          <SuperButton>Add post</SuperButton>
        </form>
      </div>
    );
  }
);
