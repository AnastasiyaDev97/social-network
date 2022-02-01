import {ThunkType} from "../../redux-store";
import {setAppStatusAC, setInitialization} from "./app-reducer";
import {getAuthDataThunk} from "../auth/thunk";

export const Initialize = (): ThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        await dispatch(getAuthDataThunk())
        dispatch(setInitialization())
        dispatch(setAppStatusAC('succeeded'))
    }