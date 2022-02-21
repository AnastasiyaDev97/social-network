import style from "./DialogItem.module.scss"
import {FC, memo} from "react"
import {NavLink} from "react-router-dom";
import {PATH} from "../../../enums/PATH";


type DialogItemType = {
    number: string
    user: string
}


export const DialogItem: FC<DialogItemType> = memo(({number, user}) => {
    return (
        <div className={style.dialogsWrapper}>
            <NavLink to={PATH.DIALOGS+'/' + number} className={style.dialog}
                     activeClassName={style.active}>{user}</NavLink>
        </div>
    )
})

