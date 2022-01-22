import s from "./Dialog.module.css"
import React, {FC, memo} from "react"
import {NavLink} from "react-router-dom";
import {PATH} from "../../../enums/PATH";


type DialogItemType = {
    number: string
    user: string
}


export const DialogItem: FC<DialogItemType> = memo(({number, user}) => {
    return (
        <div>
            <NavLink to={PATH.DIALOGS+'/' + number} className={s.dialog}
                     activeClassName={s.active}>{user}</NavLink>
        </div>
    )
})

