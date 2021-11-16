import React from 'react';

import {ProfileInfo} from "../MyPosts/ProfileInfo/ProfileInfo";
import {profileDataUserType} from "../../redux/reducer/profile-reducer";
import MyPostsContainer from "../MyPosts/MyPostsContainer";


type ProfilePropsType = {
    profile:profileDataUserType|null
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>

    )
}