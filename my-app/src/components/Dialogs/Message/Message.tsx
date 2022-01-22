import style from "./Message.module.css"
import React, {FC, memo} from "react"


type MessageItemType = {
    textMessage: string
}


export const MessageItem: FC<MessageItemType> = memo(({textMessage}) => {
        return (
            <div className={style.message}>{textMessage}</div>
        )
    }
)
