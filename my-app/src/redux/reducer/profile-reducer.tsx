import {actionsType, stateType, ThunkType} from "../redux-store";
import {Dispatch} from "redux";
import {ProfileAPI} from "../../api/api";
import {EMPTY_STRING} from "../../const";
import {setAppStatusAC} from "./app-reducer";
import {RESULT_CODES} from "../../enums/ResultCode";


let initialState = {
    profile: {} as profileDataUserType,
    status: EMPTY_STRING,
}

export type ProfilePageType = {
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
        case "PROFILE/SET-STATUS":
        case "PROFILE/SET-USER-PROFILE":
            return {
                ...state, ...action.payload
            }
        case 'PROFILE/SET_PHOTOS':
            return {
                ...state, profile: {...state.profile, photos: {...action.payload}}
            }

        default:
            return state
    }
}


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


export const getUserProfile = (userId: number) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await ProfileAPI.getUserProfileAPI(userId)
        dispatch(setUserProfile(data))
        dispatch(setAppStatusAC('succeeded'))
    }

export const getUserStatus = (userId: number) =>
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
        if (data.resultCode === RESULT_CODES.SUCCESS) {
            dispatch(setStatus(status))
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export const saveProfileAvatar = (newAvatar: File) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await ProfileAPI.updateAvatar(newAvatar)
        if (data.resultCode === RESULT_CODES.SUCCESS) {
            dispatch(setAvatar(data.data.photos))
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export const updateProfile = (updateProfile: updateProfileThunkT): ThunkType =>
    async (dispatch
        , getState: () => stateType) => {
        dispatch(setAppStatusAC('loading'))

        let {
            userId, aboutMe, lookingForAJob, lookingForAJobDescription, fullName,
            contacts
        } = getState().ProfilePage.profile

        let profileForUpdate = {
            userId, aboutMe, lookingForAJob, lookingForAJobDescription, fullName,
            contacts, ...updateProfile
        }
        let data = await ProfileAPI.updateProfile(profileForUpdate)
        if (data.resultCode === RESULT_CODES.SUCCESS) {
            await dispatch(getUserProfile(userId))
        }
    }


export type updateProfileThunkT = {
    userId?: number
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    contacts?: ContactsType
    aboutMe?: string
}

export default profileReducer