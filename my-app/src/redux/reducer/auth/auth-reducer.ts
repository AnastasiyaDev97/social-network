import {actionsType} from "../../redux-store";
import {profileDataUserType} from "../profile/profile-reducer";
import {Nullable} from "../../../types/Nullable";
import {EMPTY_STRING} from "../../../const";


let initialState = {
    data: {
        email: EMPTY_STRING,
        id: null,
        login: EMPTY_STRING,
    },
    isAuth: false,
    profile: null,
    captchaUrl: EMPTY_STRING,
    isLoggedIn:false
};

export type authType = {
    data: authDataType
    isAuth: boolean
    profile: Nullable<profileDataUserType>
    captchaUrl: string
    isLoggedIn:boolean
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
        case 'AUTH/TOGGLE-IS-LOGGED-IN':

            return {...state, ...action.payload}
        case 'AUTH/SET-MY-PROFILE-DATA':
        case 'AUTH/SET-CAPTCHA':

            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setAuthUserData = (data: authDataType, isAuth: boolean) => {
    return({
        type: 'AUTH/SET-AUTH-USER-DATA',
        data,
        isAuth,
    }) as const
}

export const setMyProfileData = (profile: profileDataUserType) => ({
    type: 'AUTH/SET-MY-PROFILE-DATA',
    payload: {profile},
}) as const

export const setCaptchaSuccess = (captchaUrl: string) => ({
    type: 'AUTH/SET-CAPTCHA',
    payload: {captchaUrl},
}) as const

export const toggleIsLoggedIn = (isLoggedIn: boolean) => ({
    type: 'AUTH/TOGGLE-IS-LOGGED-IN',
    payload: {isLoggedIn},
}) as const


export default authReducer