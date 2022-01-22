import {actionsType,  ThunkType} from "../redux-store";
import {profileDataUserType} from "./profile-reducer";
import {Dispatch} from "redux";
import {getAuthUserData, LoginAPI} from "../../api/api";
import {stopSubmit} from "redux-form";
import {Nullable} from "../../types/Nullable";
import {loginAPIDataType} from "../../api/types";
import {setAppStatusAC} from "./app-reducer";
import {EMPTY_STRING} from "../../const";


let initialState = {
    data: {
        email: EMPTY_STRING,
        id: null,
        login: EMPTY_STRING,
    },
    isAuth: false,
    profile: null
};

export type authType = {
    data: authDataType
    isAuth: boolean
    profile: Nullable<profileDataUserType>
}

export type authDataType = {
    id: Nullable<number>
    login: Nullable<string>
    email: Nullable<string>
}

export const authReducer = (state: authType = initialState, action: actionsType) => {

    switch (action.type) {
        case "AUTH/SET-AUTH-USER-DATA":
            return {
                ...state,
                data: {...action.data}, isAuth: action.isAuth
            }
        case "AUTH/SET-MY-PROFILE-DATA":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setAuthUserData = (data: authDataType, isAuth: boolean) => ({
    type: 'AUTH/SET-AUTH-USER-DATA',
    data,
    isAuth,
}) as const

export const setMyProfileData = (profile: profileDataUserType) => ({
    type: 'AUTH/SET-MY-PROFILE-DATA',
    payload: {profile},
}) as const


export const getAuthDataThunk = () =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await getAuthUserData()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(data.data, true))
            dispatch(setAppStatusAC('succeeded'))
        }
    }


export const loginThunk = (loginData: loginAPIDataType): ThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        let data = await LoginAPI.login(loginData)
        if (data.resultCode === 0) {
            await dispatch(getAuthDataThunk())
            dispatch(setAppStatusAC('succeeded'))
        } else {
            let textErr = data.messages.length > 0 ? data.messages[0] : 'some err'
            dispatch(stopSubmit('login', {_error: textErr}))
        }
    }


export const logoutThunk = () =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await LoginAPI.logout()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData({id: null, login: null, email: null}, false))
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export default authReducer