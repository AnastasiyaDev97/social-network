import React from 'react';

import {ProfileInfo} from "../MyPosts/ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "../MyPosts/MyPostsContainer";

type ProfilePropsType = {



}


export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>

    )
}