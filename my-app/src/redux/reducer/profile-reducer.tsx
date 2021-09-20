import { v1 } from "uuid";
import {actionsType, messageDataType, postsDataType, ProfilePageType} from "../store";

let initialState={
    postsData: [
        {id: v1(), message: 'it is my first post', likes: 30},
        {id: v1(), message: 'it-kamasutra', likes: 10}],
    newPostText: ''
}

export const profileReducer = (state: ProfilePageType=initialState, action: actionsType) => {

    switch (action.type) {

        case 'ADD-POST':
            console.log('reducer-add')
            let newPost: postsDataType = {id: v1(), message: action.postText, likes: 0}
            state.postsData.push(newPost)
            state.newPostText=''
            return state
        case 'CHANGE-NEW-TEXT':
            console.log('reducer-change')
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}
export const addPostAC = (postText: string) => ({
    type: 'ADD-POST',
    postText: postText
}) as const

export const changeTextAC = (newText: string) => ({
    type: 'CHANGE-NEW-TEXT',
    newText: newText
}) as const

export default profileReducer