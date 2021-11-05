import {v1} from "uuid";
import {actionsType} from "../redux-store";


let initialState = {
    dialogsData: [{id: v1(), user: 'Nastya'},
        {id: v1(), user: 'Dima'},
        {id: v1(), user: 'Victor'}],
    messageData: [{id: v1(), textMessage: 'yo'},
        {id: v1(), textMessage: 'konichiwa'}],
    newMessageText: ''
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
    newMessageText: string

}

const dialogReducer = (state: DialogsPageType = initialState, action: actionsType) => {

    switch (action.type) {
        case 'ADD-MESSAGE':
            let newMessage: messageDataType = {id: v1(), textMessage: action.messageText}
            return {
                ...state,
                messageData: [...state.messageData, newMessage],
                newMessageText: ''
            }
        case "CHANGE-NEW-MESSAGE":
            return {
                ...state,
                newMessageText: action.newMessage
            }
        default:
            return state
    }
}

export const addMessage = (messageText: string) => ({
    type: 'ADD-MESSAGE',
    messageText: messageText
}) as const


export const changeMessage = (newMessage: string) => ({
    type: 'CHANGE-NEW-MESSAGE',
    newMessage: newMessage
}) as const


export default dialogReducer