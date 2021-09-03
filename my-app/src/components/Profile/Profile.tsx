import React from 'react';
import s from './Profile.module.css'
import {MyPosts} from "../MyPosts/MyPosts";
import {ProfileInfo} from "../MyPosts/ProfileInfo/ProfileInfo";
import {postsDataType} from "../../redux/state";

type ProfilePropsType = {
    posts: Array<postsDataType>
    addPost: (postText: string) => void
    newPostText: string
    changeNewText: (newText: string) => void

}


export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts} addPost={props.addPost} newPostText={props.newPostText}
                     changeNewText={props.changeNewText}/>
        </div>

    )
}