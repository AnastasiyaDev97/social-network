import {actionsType, stateType} from "../redux-store";

import {getAuthDataThunk} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";


let initialState = {
    isInitialization: false,
};

type initialStateAppType = {
    isInitialization: boolean
}

export const appReducer = (state: initialStateAppType = initialState, action: actionsType) => {

    switch (action.type) {
        case 'SET-INITIALIZATION':
            return {
                ...state,
                isInitialization: true
            }
        default:
            return state
    }
}

export const setInitialization = () => ({
    type: 'SET-INITIALIZATION',

}) as const

type ThunkType = ThunkAction<void, stateType, unknown, actionsType>

export const Initialize = (): ThunkType =>
    (dispatch) => {
        let pr = dispatch(getAuthDataThunk())
        pr.then(() => {
            dispatch(setInitialization())
        })
    }


export default appReducer