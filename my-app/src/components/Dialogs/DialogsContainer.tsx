import React, {ChangeEvent} from "react"
import {storeType} from "../../redux/store";
import {addMessageAC, changeMessageAC} from "../../redux/reducer/dialog-reducer";
import {Dialogs} from "./Dialogs";
import {StoreContext} from "../../StoreContext";

type DialogsContainerPropsType = {}

export const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState()

                const addMessageHandler = (newMessageText: string) => {
                    store.dispatch(addMessageAC(newMessageText))
                }

                const onChangeHandler = (text: string) => {
                    let Curaction = changeMessageAC(text)
                    store.dispatch(Curaction)
                }
                return (
                    <Dialogs dialogs={state.DialogsPage.dialogsData} addMessage={addMessageHandler}
                             changeMessage={onChangeHandler} newMessageText={state.DialogsPage.newMessageText}
                             messages={state.DialogsPage.messageData}/>
                )
            }}</StoreContext.Consumer>
    )
}

