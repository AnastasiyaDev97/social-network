import s from "./Dialog.module.css"
import React from "react"
import {NavLink} from "react-router-dom";


type DialogItemType = {
    number: string
    user: string
}


export const DialogItem = (props: DialogItemType) => {
    return (
        <div>
            <NavLink to={'/dialogs/' + props.number} className={s.dialog}
                     activeClassName={s.active}>{props.user}</NavLink>
        </div>
    )
}
