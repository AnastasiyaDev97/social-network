import {v1} from "uuid";
import {actionsType} from "../redux-store";
import {Dispatch} from "redux";
import {ProfileAPI} from "../../api/api";
import {EMPTY_STRING} from "../../const";
import {setAppStatusAC} from "./app-reducer";

let initialState = {
    postsData: [
        {id: v1(), message: 'it is my first post', likes: 30},
        {id: v1(), message: 'it-kamasutra', likes: 10}],
    profile: {} as profileDataUserType,
    status: EMPTY_STRING,
}
export type postsDataType = {
    id: string
    message: string
    likes: number
}

export type ProfilePageType = {
    postsData: Array<postsDataType>
    profile: profileDataUserType
    status: string
}

export type profileDataUserType = {
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
        case 'PROFILE/ADD-POST':
            let newPost: postsDataType = {id: v1(), message: action.postText, likes: 0}
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            }
        case "PROFILE/SET-STATUS":
        case "PROFILE/SET-USER-PROFILE":
            return {
                ...state, ...action.payload
            }
        case 'PROFILE/SET_PHOTOS':
            return {
                ...state, profile:{...state.profile,photos:{...action.payload}}
            }

        default:
            return state
    }
}

export const addPost = (postText: string) => ({
    type: 'PROFILE/ADD-POST',
    postText: postText
}) as const

export const setUserProfile = (profile: profileDataUserType) => ({
        type: 'PROFILE/SET-USER-PROFILE',
        payload: {profile},
    }) as const

export const setStatus = (status: string) => ({
    type: 'PROFILE/SET-STATUS',
    payload: {status},
}) as const

export const setAvatar = (photos: PhotosType) => ({
            type: 'PROFILE/SET_PHOTOS',
            payload: photos
        }
    ) as const


export const getUserProfile = (userId: string) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await ProfileAPI.getUserProfileAPI(userId)
        dispatch(setUserProfile(data))
        dispatch(setAppStatusAC('succeeded'))
    }

export const getUserStatus = (userId: string) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await ProfileAPI.getStatus(userId)
        dispatch(setStatus(data))
        dispatch(setAppStatusAC('succeeded'))
    }

export const updateUserStatus = (status: string) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await ProfileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatus(status))
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export const saveProfileAvatar = (newAvatar: File) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await ProfileAPI.updateAvatar(newAvatar)
        if (data.resultCode === 0) {
            dispatch(setAvatar(data.data.photos))
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export default profileReducer