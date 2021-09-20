import React, {ChangeEvent} from "react"
import {storeType} from "../../redux/store";
import {addMessageAC, changeMessageAC} from "../../redux/reducer/dialog-reducer";
import {Dialogs} from "./Dialogs";

type DialogsContainerPropsType = {
    store: storeType
}

export const DialogsContainer = (props: DialogsContainerPropsType) => {
    let state = props.store.getState()

    const addMessageHandler = (newMessageText: string) => {
        props.store.dispatch(addMessageAC(newMessageText))
    }

    const onChangeHandler = (text: string) => {
        let Curaction = changeMessageAC(text)
        props.store.dispatch(Curaction)
    }

    return (
        <Dialogs dialogs={state.DialogsPage.dialogsData} addMessage={addMessageHandler}
                 changeMessage={onChangeHandler} newMessageText={state.DialogsPage.newMessageText}
                 messages={state.DialogsPage.messageData}/>
    )
}