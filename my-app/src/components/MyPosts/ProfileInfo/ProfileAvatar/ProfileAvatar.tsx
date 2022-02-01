import style from "./ProfileAvatar.module.scss";
import {initialUserAvatar} from "../../../../const";
import React, {ChangeEvent, FC, memo, useRef} from "react";

type ProfileAvatarType = {
    isOwner: boolean
    photo:string
    saveProfileAvatar: (newAvatar: File) => void
}

export const ProfileAvatar: FC<ProfileAvatarType> = memo(({isOwner,photo,saveProfileAvatar}) => {

    const inRef = useRef<HTMLInputElement>(null);

    const onImgClick=()=>{
        inRef && inRef.current && inRef.current.click()
    }

    const onInputChooseAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            saveProfileAvatar(e.target.files[0])
        }
    }

    return (
        <p className={isOwner ? style.imgWrappOwner : style.imgWrapp}
           onClick={onImgClick}>
            <img className={style.profilePhoto}
                 src={photo || initialUserAvatar}
                 alt={'profile avatar'}
            />
            {isOwner && <input type='file' onChange={onInputChooseAvatarChange}
                               ref={inRef} style={{display: 'none'}}/>}
        </p>
    )
})