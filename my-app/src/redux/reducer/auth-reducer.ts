import {actionsType} from "../redux-store";

let initialState = {
    data: {
        email: '',
        id: null,
        login: '',
    },
    isAuth: false,
};

export type authType = {
    data: authDataType
    isAuth: boolean
}

export type authDataType = {
    email: string
    id: number | null
    login: string
}

export const authReducer = (state: authType = initialState, action: actionsType) => {

    switch (action.type) {
        case "SET-AUTH-USER-DATA":
            return {
                ...state,
                data:{...action.data}, isAuth: true
            }

        default:
            return state
    }
}

export const setAuthUserData = (data: authDataType) => ({
    type: 'SET-AUTH-USER-DATA',
    data,
}) as const


export default authReducer