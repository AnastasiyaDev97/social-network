import React, {FC, memo, useCallback} from "react";
import {ContactsType, updateProfileThunkT} from "../../../../redux/reducer/profile-reducer";
import style from './ProfileForm.module.scss'
import {faVk} from "@fortawesome/free-brands-svg-icons/faVk";
import {ProfileContact} from "./ProfileContact/ProfileContact";
import {faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faYoutube} from "@fortawesome/free-brands-svg-icons/faYoutube";
import {faInstagram} from "@fortawesome/free-brands-svg-icons/faInstagram";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {faFacebook} from "@fortawesome/free-brands-svg-icons/faFacebook";
import {ItemsUsersResponseType} from "../../../../api/types";
import {FriendsIcons} from "./FriendsIcons/FriendsIcons";

export type UpdateContactsType = {
    facebook?: string
    website?: string
    vk?: string
    twitter?: string
    instagram?: string
    youtube?: string
    github?: string
    mainLink?: string
}

type ProfileFormT = {
    contacts: ContactsType
    isOwner: boolean
    aboutMe: string
    updateProfile: (updateProfile: updateProfileThunkT) => void
    followingUsers: Array<ItemsUsersResponseType>
    toggleUsersType:(usersType: string)=>void
}

export const ProfileForm: FC<ProfileFormT> = memo(({
                                                       contacts, isOwner, aboutMe, updateProfile,
                                                       followingUsers,toggleUsersType
                                                   }) => {

    const contactsArr = [
        {name: 'vk', link: contacts.vk, icon: faVk},
        {name: 'facebook', link: contacts.facebook, icon: faFacebook},
        {name: 'twitter', link: contacts.twitter, icon: faTwitter},
        {name: 'instagram', link: contacts.instagram, icon: faInstagram},
        {name: 'youtube', link: contacts.youtube, icon: faYoutube},
        {name: 'github', link: contacts.github, icon: faGithub},
        {name: 'website', link: contacts.website, icon: faLinkedinIn},
    ]


    const handleIconUpdateLinkClick = useCallback((updateContact: UpdateContactsType) => {
        updateProfile({contacts: {...contacts, ...updateContact}})
    },[contacts])

    return (
        <div className={style.userForm}>
            <p className={style.aboutMe}>{aboutMe}</p>
            <p className={style.contacts}>
                {contactsArr.map((contact, i) =>
                    contact.link &&
                    <ProfileContact key={i} link={contact.link} icon={contact.icon}
                                    updateProfile={handleIconUpdateLinkClick} isOwner={isOwner}
                                    name={contact.name}/>)}
            </p>
            <FriendsIcons followingUsers={followingUsers} toggleUsersType={toggleUsersType}/>
        </div>
    )
})