import {actionsType} from "../../redux-store";
import {EMPTY_STRING} from "../../../const";


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


export default profileReducer