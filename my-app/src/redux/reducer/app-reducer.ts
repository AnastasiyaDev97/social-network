import {actionsType, ThunkType} from "../redux-store";
import {getAuthDataThunk} from "./auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

let initialState = {
    isInitialization: false,
    RequestStatus: 'idle' as RequestStatusType
};

type initialStateAppType = {
    isInitialization: boolean
    RequestStatus: RequestStatusType
}

export const appReducer = (state: initialStateAppType = initialState, action: actionsType) => {

    switch (action.type) {
        case 'APP/SET-INITIALIZATION':
            return {
                ...state,
                isInitialization: true
            }
        case 'APP/SET-STATUS':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setInitialization = () => ({
    type: 'APP/SET-INITIALIZATION',
}) as const

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    payload: {
        status,
    }
} as const)

export const Initialize = (): ThunkType =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        await dispatch(getAuthDataThunk())
        dispatch(setInitialization())
        dispatch(setAppStatusAC('succeeded'))
    }

export default appReducer