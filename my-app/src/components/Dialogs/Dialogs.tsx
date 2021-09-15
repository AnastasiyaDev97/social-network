import s from "./Dialogs.module.css"
import React, {ChangeEvent} from "react"
import {NavLink} from "react-router-dom";
import {DialogItem} from "./Dialog/Dialog";
import {MessageItem} from "./Message/Message";
import {actionsType, changeMessageAC, dialogsDataType, messageDataType} from "../../redux/state";

type DialogsPropsType = {
    dialogs: Array<dialogsDataType>
    messages: Array<messageDataType>
    newMessageText:string
    dispatch:(action:actionsType)=>void
}


export const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements = props.dialogs.map(m => <DialogItem number={m.id} user={m.user}/>)
    let messagesElements = props.messages.map(m => <MessageItem textMessage={m.textMessage}/>)



    const addMessageHandler = () => {
            props.dispatch({type:'ADD-MESSAGE',messageText:props.newMessageText})
        }

    const onChangeHandler=(e:ChangeEvent<HTMLTextAreaElement>)=> {
        let Curaction=changeMessageAC(e.currentTarget.value)

        props.dispatch(Curaction)}

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