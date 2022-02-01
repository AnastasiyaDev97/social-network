import {Dispatch} from "redux";
import {actionsType, stateType, ThunkType} from "../../redux-store";
import {setAppStatusAC} from "../app/app-reducer";
import {ProfileAPI} from "../../../api/api";
import {RESULT_CODES} from "../../../enums/ResultCode";
import {ContactsType, setAvatar, setStatus, setUserProfile} from "./profile-reducer";

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