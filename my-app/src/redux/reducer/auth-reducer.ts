import {actionsType, stateType} from "../redux-store";
import {profileDataUserType} from "./profile-reducer";
import {Dispatch} from "redux";
import {getAuthUserData, LoginAPI} from "../../api/api";
import {ThunkAction} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {Nullable} from "../../types/Nullable";
import {loginAPIDataType} from "../../api/types";


let initialState = {
    data: {
        email: '',
        id: null,
        login: '',
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
        case "SET-AUTH-USER-DATA":
            return {
                ...state,
                data: {...action.data}, isAuth: action.isAuth
            }
        case "SET-MY-PROFILE-DATA":
            return {...state, ...action.payload}
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
    payload:{profile},
}) as const


type ThunkType = ThunkAction<void, stateType, unknown, actionsType>


export const getAuthDataThunk = () =>
    async (dispatch: Dispatch<actionsType>) => {
        let data = await getAuthUserData()
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(data.data, true))
        }
    }


export const loginThunk = (loginData: loginAPIDataType): ThunkType =>
    async (dispatch) => {
        let data = await LoginAPI.login(loginData)
        if (data.resultCode === 0) {
           await dispatch(getAuthDataThunk())
        } else {
            let textErr = data.messages.length > 0 ? data.messages[0] : 'some err'
            dispatch(stopSubmit('login', {_error: textErr}))
        }
    }


export const logoutThunk = () =>
    async (dispatch: Dispatch<actionsType>) => {
        let data = await LoginAPI.logout()
                if (data.resultCode === 0) {
                    dispatch(setAuthUserData({id: null, login: null, email: null}, false))
                }
    }

export default authReducer