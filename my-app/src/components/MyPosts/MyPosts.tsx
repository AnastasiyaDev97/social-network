import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {actionsType, postsDataType} from "../../redux/store";
import {addPostAC, changeTextAC} from "../../redux/reducer/profile-reducer";

type MyPostsPropsType = {
    posts: Array<postsDataType>
    newPostText: string
    addPost: (newPostText: string) => void
    changePost: (text: string) => void
}


export const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map(m => <Post message={m.message} likesCount={m.likes}/>)
    let addPostHandler = () => {
        props.addPost(props.newPostText)
    }
    let onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        console.log(e.currentTarget.value)
        props.changePost(e.currentTarget.value)
    }
    return (
        <div className={s.myPosts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onChangeHandler} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={addPostHandler}>Add post</button>
                </div>
            </div>
            {postsElements}
        </div>

    )
}