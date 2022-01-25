import {v1} from "uuid";
import {actionsType} from "../redux-store";
import {EMPTY_STRING} from "../../const";


let initialState = {
    dialogsData: [{id: v1(), user: 'Nastya'},
        {id: v1(), user: 'Dima'},
        {id: v1(), user: 'Victor'}],
    messageData: [{id: v1(), textMessage: 'yo'},
        {id: v1(), textMessage: 'konichiwa'}],
}

export type dialogsDataType = {
    id: string
    user: string
}
export type messageDataType = {
    id: string
    textMessage: string
}

export type DialogsPageType = {
    dialogsData: Array<dialogsDataType>
    messageData: Array<messageDataType>


}

const dialogReducer = (state: DialogsPageType = initialState, action: actionsType) => {

    switch (action.type) {
        case 'DIALOGS/ADD-MESSAGE':
            let newMessage: messageDataType = {id: v1(), textMessage: action.messageText}
            return {
                ...state,
                messageData: [...state.messageData, newMessage],
                newMessageText: EMPTY_STRING
            }
        default:
            return state
    }
}

export const addMessage = (messageText: string) => ({
    type: 'DIALOGS/ADD-MESSAGE',
    messageText: messageText
}) as const





export default dialogReducer