import React from 'react';

import {ProfileInfo} from "../MyPosts/ProfileInfo/ProfileInfo";
import {storeType} from "../../redux/store";
import {MyPostsContainer} from "../MyPosts/MyPostsContainer";

type ProfilePropsType = {
    store:storeType


}


export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>

    )
}