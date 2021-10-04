import {v1} from "uuid";
import {actionsType, postsDataType, profileDataUserType, ProfilePageType} from "../store";

let initialState = {
    postsData: [
        {id: v1(), message: 'it is my first post', likes: 30},
        {id: v1(), message: 'it-kamasutra', likes: 10}],
    newPostText: '',
    profile: null
}

export const profileReducer = (state: ProfilePageType = initialState, action: actionsType) => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost: postsDataType = {id: v1(), message: action.postText, likes: 0}
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            }
        case 'CHANGE-NEW-TEXT':
            return {
                ...state,
                newPostText: action.newText
            }
        case "SET-USER-PROFILE":
            return {
                ...state, profile:action.profile
            }
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

export const setUserProfile=(profile:profileDataUserType)=>({
    type:'SET-USER-PROFILE',
    profile,
}) as const


export default profileReducer