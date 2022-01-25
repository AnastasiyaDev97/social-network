import {actionsType, ThunkType} from "../redux-store";
import {profileDataUserType} from "./profile-reducer";
import {Dispatch} from "redux";
import {LoginAPI, securityAPI} from "../../api/api";
import {Nullable} from "../../types/Nullable";
import {loginAPIDataType} from "../../api/types";
import {setAppStatusAC} from "./app-reducer";
import {EMPTY_STRING} from "../../const";
import {handleServerNetworkError} from "../../utils/errorHandler";
import {RESULT_CODES} from "../../enums/ResultCode";


let initialState = {
    data: {
        email: EMPTY_STRING,
        id: null,
        login: EMPTY_STRING,
    },
    isAuth: false,
    profile: null,
    captchaUrl: EMPTY_STRING
};

export type authType = {
    data: authDataType
    isAuth: boolean
    profile: Nullable<profileDataUserType>
    captchaUrl: string
}

export type authDataType = {
    id: Nullable<number>
    login: Nullable<string>
    email: Nullable<string>
}

export const authReducer = (state: authType = initialState, action: actionsType) => {

    switch (action.type) {
        case 'AUTH/SET-AUTH-USER-DATA':
            return {
                ...state,
                data: {...action.data}, isAuth: action.isAuth
            }
        case 'AUTH/SET-MY-PROFILE-DATA':
        case 'AUTH/SET-CAPTCHA':
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

export const setCaptchaSuccess = (captchaUrl: string) => ({
    type: 'AUTH/SET-CAPTCHA',
    payload: {captchaUrl},
}) as const


export const getAuthDataThunk = () =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await LoginAPI.getAuthUserData()
        if (data.resultCode === RESULT_CODES.SUCCESS) {
            dispatch(setAuthUserData(data.data, true))
            dispatch(setAppStatusAC('succeeded'))
        }
    }


export const loginThunk = (loginData: loginAPIDataType): ThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))

        let data = await LoginAPI.login(loginData)
        if (data.resultCode === RESULT_CODES.SUCCESS) {
            await dispatch(getAuthDataThunk())
            dispatch(setAppStatusAC('succeeded'))
        }
        if (data.resultCode === RESULT_CODES.CAPTCHA) {
            await dispatch(getCaptcha())
        } else {
            handleServerNetworkError(data, dispatch)
        }
    }


export const logoutThunk = () =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await LoginAPI.logout()
        if (data.resultCode === RESULT_CODES.SUCCESS) {
            dispatch(setAuthUserData({id: null, login: null, email: null}, false))
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export const getCaptcha = () =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await securityAPI()
        dispatch(setCaptchaSuccess(data.url))
        dispatch(setAppStatusAC('succeeded'))

    }

export default authReducer