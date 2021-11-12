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
            <div><img className={s.profilePhoto} src={props.profile.photos.small||'http://pm1.narvii.com/7812/ed9961348bc94cd31227151dd9aa1f918c40cff5r1-869-968v2_uhq.jpg'} alt={'profile avatar'}/></div>
            <div className={s.userForm}><span>About me:{props.profile.aboutMe}</span>
                <span>My contacts: {props.profile.contacts.vk}</span>
            </div>
        </div>
    )
}