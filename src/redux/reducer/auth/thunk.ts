import {Dispatch} from "redux";
import {actionsType, ThunkType} from "../../redux-store";
import {setAppStatusAC} from "../app/app-reducer";
import {LoginAPI, securityAPI} from "../../../api/api";
import {RESULT_CODES} from "../../../enums/ResultCode";
import {loginAPIDataType} from "../../../api/types";
import {handleServerNetworkError} from "../../../utils/errorHandler";
import {setAuthUserData, setCaptchaSuccess, toggleIsLoggedIn} from "./auth-reducer";

export const getAuthDataThunk = () =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        let data = await LoginAPI.getAuthUserData()
        if (data.resultCode === RESULT_CODES.SUCCESS) {
            dispatch(setAuthUserData(data.data, true))
            dispatch(toggleIsLoggedIn(true))
            dispatch(setAppStatusAC('succeeded'))
        }
    }


export const loginThunk = (loginData: loginAPIDataType): ThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))

        let data = await LoginAPI.login(loginData)
        if (data.resultCode === RESULT_CODES.SUCCESS) {
            await dispatch(getAuthDataThunk())
            dispatch(toggleIsLoggedIn(true))
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
            dispatch(toggleIsLoggedIn(false))
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