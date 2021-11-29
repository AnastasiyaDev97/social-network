import React from 'react';

import {ProfileInfo} from "../MyPosts/ProfileInfo/ProfileInfo";
import {profileDataUserType} from "../../redux/reducer/profile-reducer";
import MyPostsContainer from "../MyPosts/MyPostsContainer";


type ProfilePropsType = {
    profile:profileDataUserType|null
    updateUserStatus:(status: string) => any
    status:string
}

export const Profile = (props: ProfilePropsType) => {
    debugger
    return (
        <div>
            <ProfileInfo profile={props.profile} updateUserStatus={props.updateUserStatus} status={props.status}/>
            <MyPostsContainer/>
        </div>

    )
}