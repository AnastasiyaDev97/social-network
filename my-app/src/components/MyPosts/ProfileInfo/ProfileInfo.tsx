import React, {ChangeEvent, FC, memo, useCallback, useRef} from 'react';
import style from './ProfileInfo.module.scss'
import Preloader from "../../../common/preloader/Preloader";
import {profileDataUserType, updateProfileThunkT} from "../../../redux/reducer/profile-reducer";
import {Nullable} from "../../../types/Nullable";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {ProfileForm} from "./EditProfileForm/ProfileForm";
import {initialUserAvatar} from "../../../const";
import {ItemsUsersResponseType} from "../../../api/types";


type ProfileInfoPropsType = {
    profile: profileDataUserType
    updateUserStatus: (status: string) => void
    status: string
    saveProfileAvatar: (newAvatar: File) => void
    userIdAuth: Nullable<number>
    updateProfile: (updateProfile: updateProfileThunkT) => void
    followingUsers: Array<ItemsUsersResponseType>
    toggleUsersType:(usersType: string)=>void
}

export const ProfileInfo: FC<ProfileInfoPropsType> = memo(({
                                                               profile, updateUserStatus, status, saveProfileAvatar,
                                                               userIdAuth, updateProfile, followingUsers,
                                                               toggleUsersType
                                                           }) => {
    const inRef = useRef<HTMLInputElement>(null);

    const isOwner = userIdAuth === profile.userId;
    /*const statusText = status || '----'*/


    const onInputChooseAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            saveProfileAvatar(e.target.files[0])
        }
    }

    const handleEditableSpanClick = useCallback((newTitle: string) => {
        if (newTitle !== profile.fullName) {
            updateProfile({fullName: newTitle})
        }
    }, [profile.fullName, updateProfile])

    if (Object.keys(profile).length === 0) {
        return <Preloader/>
    }

    return (
        <div className={style.profileInfoWrapper}>
            <div className={style.headerBlock}>

                <p className={style.imgWrapper} onClick={() => inRef && inRef.current && inRef.current.click()}>
                    <img className={style.profilePhoto}
                         src={profile.photos.small || initialUserAvatar}
                         alt={'profile avatar'}
                    />
                </p>

                {isOwner && <input type='file' onChange={onInputChooseAvatarChange}
                                   ref={inRef} style={{display: 'none'}}/>}

                <div className={style.nameBlock}>
                    <EditableSpan title={profile.fullName} updateTitle={handleEditableSpanClick}
                                  myStyle={style.name}/>
                    <EditableSpan title={status} updateTitle={updateUserStatus}
                                  myStyle={style.status}/>
                </div>

            </div>
            <ProfileForm contacts={profile.contacts} aboutMe={profile.aboutMe} isOwner={isOwner}
                         updateProfile={updateProfile} followingUsers={followingUsers}
                         toggleUsersType={toggleUsersType}/>
        </div>
    )
})