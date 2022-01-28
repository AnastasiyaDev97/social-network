import React, {FC, memo} from 'react';
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import style from './Profile.module.scss'
import ProfileInfoContainer from '../MyPosts/ProfileInfo/ProfileInfoContainer';
import Preloader from "../../common/preloader/Preloader";
import {profileDataUserType} from "../../redux/reducer/profile-reducer";


type ProfilePropsType = {

    profile: profileDataUserType
    userId:string
}

export const Profile: FC<ProfilePropsType> = memo(({ profile,userId}) => {

    if (Object.keys(profile).length === 0) {
        return <Preloader/>
    }

    return (
        <div className={style.profileWrapper}>
            <ProfileInfoContainer/>
            {/*isAuth*/ !userId && <MyPostsContainer /*photo={profile.photos.small} name={profile.fullName}*//>}
        </div>

    )
})