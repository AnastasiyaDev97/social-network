import {Dispatch} from "redux";
import {actionsType} from "../redux/redux-store";
import {stopSubmit} from "redux-form";
import {ResponseType} from "../api/types";
import {setAppStatusAC} from "../redux/reducer/app/app-reducer";

export const handleServerNetworkError = <T>(data:ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    let textErr = data.messages.length > 0 ? data.messages[0] : 'some err'
    dispatch(stopSubmit('login', {_error: textErr}))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<actionsType>