import s from "./Dialogs.module.css"
import React, {ChangeEvent} from "react"
import {DialogItem} from "./Dialog/DialogItem";
import {MessageItem} from "./Message/Message";
import {dialogsDataType, messageDataType} from "../../redux/reducer/dialog-reducer";



type DialogsPropsType = {
    dialogs: Array<dialogsDataType>
    messages: Array<messageDataType>
    newMessageText:string
    addMessage:(newMessage:string)=>void
    changeMessage:(text:string)=>void
}


export const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements = props.dialogs.map(m => <DialogItem key={m.id} number={m.id} user={m.user}/>)
    let messagesElements = props.messages.map(m => <MessageItem key={m.id} textMessage={m.textMessage}/>)



    const addMessageHandler = () => {
            props.addMessage(props.newMessageText)
        }

    const onChangeHandler=(e:ChangeEvent<HTMLTextAreaElement>)=> {
        props.changeMessage(e.currentTarget.value)}

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