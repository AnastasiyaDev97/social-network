import {v1} from "uuid";
import {actionsType} from "../redux-store";
import {Dispatch} from "redux";
import { ProfileAPI} from "../../api/api";
import {Nullable} from "../../types/Nullable";

let initialState = {
    postsData: [
        {id: v1(), message: 'it is my first post', likes: 30},
        {id: v1(), message: 'it-kamasutra', likes: 10}],
    profile: null /*as profileDataUserType*/,
    status:'',
}
export type postsDataType = {
    id: string
    message: string
    likes: number
}


export type ProfilePageType = {
    postsData: Array<postsDataType>
    profile: profileDataUserType
    status:string
}
export type profileDataUserType = Nullable< {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}>
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

        case "SET-USER-PROFILE":
        case "SET-STATUS":
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}
export const addPost = (postText: string) => ({
    type: 'ADD-POST',
    postText: postText
}) as const



export const setUserProfile = (profile: profileDataUserType) => ({
    type: 'SET-USER-PROFILE',
    payload:{profile},
}) as const
export const setStatus = (status: string) => ({
    type: 'SET-STATUS',
    payload:{status},
}) as const


export const getUserProfile = (userId: string) =>
   async (dispatch: Dispatch<actionsType>) => {
        let data=await ProfileAPI.getUserProfileAPI(userId)
                dispatch(setUserProfile(data))
    }

export const getUserStatus = (userId: string) =>
    async (dispatch: Dispatch<actionsType>) => {
        let data = await ProfileAPI.getStatus(userId)
                dispatch(setStatus(data))
}
export const updateUserStatus = (status: string) =>
    async (dispatch: Dispatch<actionsType>) => {
       let data= await ProfileAPI.updateStatus(status)
                if(data.resultCode===0){
                dispatch(setStatus(status))}
}

export default profileReducer