import React, {FC, memo, useMemo} from 'react';
import {ProfileInfo} from "../MyPosts/ProfileInfo/ProfileInfo";
import {profileDataUserType, updateProfileThunkT} from "../../redux/reducer/profile-reducer";
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import {Nullable} from "../../types/Nullable";
import style from './Profile.module.scss'
import {ItemsUsersResponseType} from "../../api/types";


type ProfilePropsType = {
    profile:profileDataUserType
    updateUserStatus:(status: string) => void
    status:string
    saveProfileAvatar:(newAvatar:File)=>void
    userIdAuth: Nullable<number>
    updateProfile: (updateProfile: updateProfileThunkT) => void
    users:Array<ItemsUsersResponseType>

}

export const Profile:FC<ProfilePropsType> = memo(({profile,updateUserStatus,status,
                                                      saveProfileAvatar,userIdAuth,updateProfile,users
                                                      }) => {

const followingUsers= useMemo(()=>{return users.filter(user=>user.followed)},[users])

    return (
        <div className={style.profileWrapper}>
            <ProfileInfo profile={profile} updateUserStatus={updateUserStatus} status={status}
                         saveProfileAvatar={saveProfileAvatar} userIdAuth={userIdAuth}
                         updateProfile={updateProfile} followingUsers={followingUsers}/>
            <MyPostsContainer /*photo={profile.photos.small} name={profile.fullName}*//>
        </div>

    )
})