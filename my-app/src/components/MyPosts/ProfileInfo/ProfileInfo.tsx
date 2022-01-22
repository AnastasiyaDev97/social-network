import React, {ChangeEvent, FC, memo} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../../common/preloader/Preloader";
import {profileDataUserType} from "../../../redux/reducer/profile-reducer";
import {ProfileStatusWithHooks} from "./ProfileStatus/ProfileStatusWithHooks";
import {Nullable} from "../../../types/Nullable";

type ProfileInfoPropsType = {
    profile: profileDataUserType
    updateUserStatus: (status: string) => void
    status: string
    saveProfileAvatar: (newAvatar: File) => void
    userIdAuth: Nullable<number>
}

export const ProfileInfo: FC<ProfileInfoPropsType> = memo(({
                                                               profile, updateUserStatus, status, saveProfileAvatar,
                                                               userIdAuth
                                                           }) => {

    const initialUserAvatar = 'http://pm1.narvii.com/7812/ed9961348bc94cd31227151dd9aa1f918c40cff5r1-869-968v2_uhq.jpg'
    const conditionForShowChangePhotoInput=userIdAuth === profile.userId

    const onInputChooseAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            saveProfileAvatar(e.target.files[0])
        }
    }

    if (Object.keys(profile).length === 0) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.container}>
                {profile.fullName}
                <div><img className={s.profilePhoto}
                          src={profile.photos.small || initialUserAvatar}
                          alt={'profile avatar'}/></div>
                {conditionForShowChangePhotoInput && <input type='file' onChange={onInputChooseAvatarChange}/>}

                <div className={s.userForm}><span>About me:{profile.aboutMe}</span>
                    <span>My contacts: {profile.contacts.vk}</span>
                </div>
            </div>

            <div className={s.statusBlock}>
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
})