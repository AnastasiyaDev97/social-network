import React, {ChangeEvent, FC, memo, useCallback, useRef} from 'react';
import style from './ProfileInfo.module.scss'
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {ProfileForm} from "./EditProfileForm/ProfileForm";
import {initialUserAvatar} from "../../../const";
import {ProfileInfoPropsType} from "./ProfileInfoContainer";
import FollowUnfollowBtn from "../../FollowUnfollowBtn/FollowUnfollowBtn";


export const ProfileInfo: FC<ProfileInfoPropsType> = memo(({
                                                               profile, updateUserStatus, status, saveProfileAvatar,
                                                               userIdAuth, updateProfile,
                                                               totalUserCount, users,toggleItemsType
                                                           }) => {

    const inRef = useRef<HTMLInputElement>(null);

    const isOwner = userIdAuth === profile.userId;

    const currentUser = users.find(user => user.id === profile.userId)

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

    const onImgClick=()=>{
        inRef && inRef.current && inRef.current.click()
    }


    return (
        <div className={style.profileInfoWrapper}>
            <div className={style.headerBlock}>

                <p className={isOwner?style.imgWrappOwner:style.imgWrapp}
                   onClick={onImgClick}>
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
                {(!isOwner && currentUser) && <div className={style.followBtnWrapper}>
                    <FollowUnfollowBtn item={currentUser}/>
                </div>
                }
            </div>
            <ProfileForm contacts={profile.contacts} aboutMe={profile.aboutMe} isOwner={isOwner}
                         updateProfile={updateProfile} followingUsers={users}
                         totalUserCount={totalUserCount} toggleItemsType={toggleItemsType}/>
        </div>
    )
})


