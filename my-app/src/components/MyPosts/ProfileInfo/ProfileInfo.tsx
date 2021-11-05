import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../../common/preloader/Preloader";
import {profileDataUserType} from "../../../redux/reducer/profile-reducer";
type ProfileInfoPropsType = {
    profile:profileDataUserType|null

}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    if(!props.profile){
        return <Preloader />
    }
        return (
        <div className={s.container}>
            {props.profile.fullName}
            <div><img src={props.profile.photos.large} alt={'profile avatar'}/></div>
            <div className={s.userForm}><span>About me:{props.profile.aboutMe}</span>
                <span>My contacts: {props.profile.contacts.vk}</span>
            </div>
        </div>
    )
}