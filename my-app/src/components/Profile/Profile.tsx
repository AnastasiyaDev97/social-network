import React from 'react';

import {ProfileInfo} from "../MyPosts/ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "../MyPosts/MyPostsContainer";
import {postsDataType, profileDataUserType} from "../../redux/store";

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