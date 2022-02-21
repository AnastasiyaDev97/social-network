import React, {FC, memo, useCallback, useState} from "react";
import {ContactsType} from "../../../../redux/reducer/profile/profile-reducer";
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
import {itemsT} from "../../../../redux/reducer/users/user-reducer";
import {updateProfileThunkT} from "../../../../redux/reducer/profile/thunk";
import {faTelegramPlane} from "@fortawesome/free-brands-svg-icons/faTelegramPlane";
import {Modal} from "../../../Modal/Modal";

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
    totalUserCount: number
}

export const ProfileForm: FC<ProfileFormT> = memo(({
                                                       contacts, isOwner, aboutMe, updateProfile,
                                                       followingUsers, totalUserCount
                                                   }) => {

    const [isContactEditFormShown, setIsContactEditFormShown] = useState(false)

    const contactsArr = [
        {initialValueTitle: 'vk', initialValue: contacts.vk, icon: faVk},
        {initialValueTitle: 'facebook', initialValue: contacts.facebook, icon: faFacebook},
        {initialValueTitle: 'twitter', initialValue: contacts.twitter, icon: faTwitter},
        {initialValueTitle: 'instagram', initialValue: contacts.instagram, icon: faInstagram},
        {initialValueTitle: 'youtube', initialValue: contacts.youtube, icon: faYoutube},
        {initialValueTitle: 'github', initialValue: contacts.github, icon: faGithub},
        {initialValueTitle: 'website', initialValue: contacts.website, icon: faLinkedinIn},
        {initialValueTitle: 'mainLink', initialValue: contacts.mainLink, icon: faTelegramPlane},
    ]


    const handleIconUpdateLinkClick = useCallback((updateContact: updateProfileThunkT) => {
        updateProfile({contacts: {...contacts, ...updateContact}})
    }, [contacts, updateProfile])

    const onActivateModalIconClick = () => {
        setIsContactEditFormShown(true)
    }

    return (
        <div className={style.userForm}>
            <p className={style.aboutMe}>{aboutMe}</p>
            <p className={style.contacts}>
                {isContactEditFormShown ?
                    <Modal itemsForForm={contactsArr}
                           onSubmitBtnClick={handleIconUpdateLinkClick}
                           setIsModalShown={setIsContactEditFormShown}/>
                    : contactsArr.map((contact, i) =>
                        <ProfileContact key={i} link={contact.initialValue} icon={contact.icon}
                                        updateProfile={handleIconUpdateLinkClick} isOwner={isOwner}
                                        name={contact.initialValueTitle}/>)}

                {isOwner && <span className={style.btnEditLinks} onClick={onActivateModalIconClick}/>}
            </p>

            {isOwner && <FriendsIcons followingUsers={followingUsers}
                                      totalUserCount={totalUserCount}/>}
        </div>
    )
})