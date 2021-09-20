import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {actionsType, postsDataType, storeType} from "../../redux/store";
import {addPostAC, changeTextAC} from "../../redux/reducer/profile-reducer";
import {MyPosts} from "./MyPosts";

type MyPostsContainerPropsType = {
    store: storeType
}

export const MyPostsContainer = (props: MyPostsContainerPropsType) => {
    let state = props.store.getState()

    let addPostHandler = (newPostText: string) => {
        props.store.dispatch(addPostAC(newPostText))
    }
    let onChangeHandler = (text: string) => {
        props.store.dispatch(changeTextAC(text))
    }
    return (
        <MyPosts posts={state.ProfilePage.postsData} newPostText={state.ProfilePage.newPostText}
                 addPost={addPostHandler} changePost={onChangeHandler}/>
    )
}