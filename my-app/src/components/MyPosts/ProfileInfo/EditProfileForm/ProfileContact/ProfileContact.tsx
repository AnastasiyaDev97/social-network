import React, {ChangeEvent, FC, memo, useState} from "react";
import style from "./ProfileContact.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {UpdateContactsType} from "../ProfileForm";



type ProfileContactT = {
    link: string
    icon: IconProp
    updateProfile: (updateContact:UpdateContactsType) => void
    isOwner: boolean
    name:string
}

export const ProfileContact: FC<ProfileContactT> = memo(({link, icon, updateProfile, isOwner,
                                                         name}) => {

        const [edit, setEdit] = useState(false)
        const [linkURL, setLinkURL] = useState(link)



        const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            setLinkURL(e.currentTarget.value)
        }

        const onInputBlur = () => {
            updateProfile({[name]:linkURL})
            setEdit(false)
        }

        const onLinkDblClick = () => {
            if (isOwner) {
                setEdit(true)
            }
        }

        return (
            <>
                <a href={link}
                         className={style.icon} onDoubleClick={onLinkDblClick}>
                    <FontAwesomeIcon icon={icon}/></a>
                {edit && <input value={linkURL} onChange={onInputChange} autoFocus onBlur={onInputBlur}/>}
            </>
        )
    }
)