import s from "./Dialogs.module.css"
import React from "react"
import {DialogItem} from "./Dialog/DialogItem";
import {MessageItem} from "./Message/Message";
import {dialogsDataType, messageDataType} from "../../redux/reducer/dialog-reducer";
import  {Field,InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../common/utils/validators";
import { Textarea} from "../FormsControl/FormsControl";


type DialogsPropsType = {
    dialogs: Array<dialogsDataType>
    messages: Array<messageDataType>
    addMessage: (newMessage: string) => void
    isAuth: boolean
}

export const Dialogs = (props: DialogsPropsType) => {

    let dialogsElements = props.dialogs.map(m => <DialogItem key={m.id} number={m.id} user={m.user}/>)
    let messagesElements = props.messages.map(m => <MessageItem key={m.id} textMessage={m.textMessage}/>)


    const onSubmit=(formData:FormDataType)=>{
        props.addMessage(formData.message)
        formData.message=''
    }
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
                <DialogReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

type FormDataType={
    message:string
}
const maxLength100=maxLengthCreator(100)
export const DialogForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} type={'textarea'} name={'message'} placeholder={'add message'} validate={[required,maxLength100]}/>
            <button>Send message</button>
        </form>
    )
}
const DialogReduxForm=reduxForm<FormDataType>({form:'dialogs'})(DialogForm)