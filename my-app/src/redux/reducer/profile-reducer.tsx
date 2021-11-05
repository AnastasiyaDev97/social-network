import {v1} from "uuid";
import {actionsType} from "../redux-store";

let initialState = {
    postsData: [
        {id: v1(), message: 'it is my first post', likes: 30},
        {id: v1(), message: 'it-kamasutra', likes: 10}],
    newPostText: '',
    profile: null
}
export type postsDataType = {
    id: string
    message: string
    likes: number
}


export type ProfilePageType = {
    postsData: Array<postsDataType>
    newPostText: string
    profile: profileDataUserType
}
export type profileDataUserType = null | {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}
export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
type PhotosType = {
    small: string
    large: string
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
export const addPost = (postText: string) => ({
    type: 'ADD-POST',
    postText: postText
}) as const

export const changePost = (newText: string) => ({
    type: 'CHANGE-NEW-TEXT',
    newText: newText
}) as const

export const setUserProfile=(profile:profileDataUserType)=>({
    type:'SET-USER-PROFILE',
    profile,
}) as const


export default profileReducer