import {actionsType} from "../redux-store";
import {profileDataUserType} from "./profile-reducer";
import {Dispatch} from "redux";
import {getAuthUserData} from "../../api/api";

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
    login: string
    email: string
}

export const authReducer = (state: authType = initialState, action: actionsType) => {

    switch (action.type) {
        case "SET-AUTH-USER-DATA":
            return {
                ...state,
                data: {...action.data}, isAuth: true
            }
        case "SET-MY-PROFILE-DATA":
            return {...state, profile: action.profile}
        default:
            return state
    }
}

export const setAuthUserData = (data: authDataType) => ({
    type: 'SET-AUTH-USER-DATA',
    data,
}) as const
export const setMyProfileData = (profile: profileDataUserType) => ({
    type: 'SET-MY-PROFILE-DATA',
    profile,
}) as const

export const getAuthDataThunk = () => {
    return (dispatch: Dispatch<actionsType>) => {
        getAuthUserData()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUserData(data.data))
                }
            })
    }
}

export default authReducer