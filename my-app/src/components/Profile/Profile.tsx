import React, {FC, memo} from 'react';
import {ProfileInfo} from "../MyPosts/ProfileInfo/ProfileInfo";
import {profileDataUserType} from "../../redux/reducer/profile-reducer";
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import {Nullable} from "../../types/Nullable";


type ProfilePropsType = {
    profile:profileDataUserType
    updateUserStatus:(status: string) => void
    status:string
    saveProfileAvatar:(newAvatar:File)=>void
    userIdAuth: Nullable<number>

}

export const Profile:FC<ProfilePropsType> = memo(({profile,updateUserStatus,status,
                                                      saveProfileAvatar,userIdAuth
                                                      }) => {
    return (
        <div>
            <ProfileInfo profile={profile} updateUserStatus={updateUserStatus} status={status}
                         saveProfileAvatar={saveProfileAvatar} userIdAuth={userIdAuth}/>
            <MyPostsContainer/>
        </div>

    )
})