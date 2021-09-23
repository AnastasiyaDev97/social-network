import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {actionsType, postsDataType, storeType} from "../../redux/store";
import {addPostAC, changeTextAC} from "../../redux/reducer/profile-reducer";
import {MyPosts} from "./MyPosts";
import {StoreContext} from "../../StoreContext";

type MyPostsContainerPropsType = {}

export const MyPostsContainer = (props: MyPostsContainerPropsType) => {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState()

                    let addPostHandler = (newPostText: string) => {
                        store.dispatch(addPostAC(newPostText))
                    }
                    let onChangeHandler = (text: string) => {
                        store.dispatch(changeTextAC(text))
                    }
                    return (
                        <MyPosts posts={store.getState().ProfilePage.postsData}
                                 newPostText={state.ProfilePage.newPostText}
                                 addPost={addPostHandler} changePost={onChangeHandler}/>
                    )
                }
            }

        </StoreContext.Consumer>
    )
}