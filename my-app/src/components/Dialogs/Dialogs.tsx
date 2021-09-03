import s from "./Dialogs.module.css"
import React, {ChangeEvent} from "react"
import {NavLink} from "react-router-dom";
import {DialogItem} from "./Dialog/Dialog";
import {MessageItem} from "./Message/Message";
import {dialogsDataType, messageDataType} from "../../redux/state";

type DialogsPropsType = {
    dialogs: Array<dialogsDataType>
    messages: Array<messageDataType>
    addMessage: (messageText: string) => void
    newMessageText:string
    changeNewMessage:(newMessage:string)=>void
}


export const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements = props.dialogs.map(m => <DialogItem number={m.id} user={m.user}/>)
    let messagesElements = props.messages.map(m => <MessageItem textMessage={m.textMessage}/>)



    const addMessageHandler = () => {
            props.addMessage(props.newMessageText)
        }

    const onChangeHandler=(e:ChangeEvent<HTMLTextAreaElement>)=> {
        props.changeNewMessage(e.currentTarget.value)}

        return (
            <div>
                <div className={s.dialogs}>
                    <div className={s.dialogsItems}>
                        {dialogsElements}
                    </div>

                    <div className={s.messages}>
                        {messagesElements}
                    </div>
                </div>
                <div className={s.addMessageWrapper}>
                    <textarea value={props.newMessageText} onChange={onChangeHandler}/>
                    <button onClick={addMessageHandler}>Add message</button>
                </div>
            </div>
        )
    }