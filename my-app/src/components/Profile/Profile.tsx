import React from 'react';
/*import s from './Profile.module.css'*/
import {MyPosts} from "../MyPosts/MyPosts";
import {ProfileInfo} from "../MyPosts/ProfileInfo/ProfileInfo";
import {actionsType, postsDataType} from "../../redux/state";

type ProfilePropsType = {
    posts: Array<postsDataType>
    newPostText: string
    dispatch:(action:actionsType)=>void

}


export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts} dispatch={props.dispatch} newPostText={props.newPostText}/>
        </div>

    )
}