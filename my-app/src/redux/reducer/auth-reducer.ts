import {actionsType, stateType} from "../redux-store";
import {profileDataUserType} from "./profile-reducer";
import {Dispatch} from "redux";
import {getAuthUserData, LoginAPI, loginAPIDataType} from "../../api/api";
import { ThunkAction } from "redux-thunk";

let initialState = {
    data: {
        email: '',
        id: null,
        login: '',
    },
    isAuth: false,
    profile: null as profileDataUserType
};

export type authType = {
    data: authDataType
    isAuth: boolean
    profile: profileDataUserType
}

export type authDataType = {
    id: number | null
    login: string | null
    email: string | null
}

export const authReducer = (state: authType = initialState, action: actionsType) => {

    switch (action.type) {
        case "SET-AUTH-USER-DATA":
            debugger
            return {
                ...state,
                data: {...action.data}, isAuth: action.isAuth
            }
        case "SET-MY-PROFILE-DATA":
            return {...state, profile: action.profile}
        default:
            return state
    }
}

export const setAuthUserData = (data: authDataType, isAuth: boolean) => ({
    type: 'SET-AUTH-USER-DATA',
    data,
    isAuth,
}) as const
export const setMyProfileData = (profile: profileDataUserType) => ({
    type: 'SET-MY-PROFILE-DATA',
    profile,
}) as const


type ThunkType = ThunkAction<void, stateType, unknown, actionsType>


export const getAuthDataThunk = (isAuth: boolean) => {
    debugger
    return (dispatch: Dispatch<actionsType>) => {
        getAuthUserData()
            .then(data => {
                if (data.resultCode === 0) {

                    dispatch(setAuthUserData(data.data, isAuth))
                }
            })
    }
}
export const loginThunk = (loginData: loginAPIDataType):ThunkType => {

    return (dispatch) => {
        LoginAPI.login(loginData)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(getAuthDataThunk(true))
                }
            })
    }
}

export const logoutThunk = () => {
    return (dispatch: Dispatch<actionsType>) => {
        LoginAPI.logout()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUserData({id:null, login:null, email:null}, false))
                }
            })
    }
}

export default authReducer