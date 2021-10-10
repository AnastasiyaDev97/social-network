import {actionsType, authDataType, authType} from "../store";

let initialState = {
    data: {
        email: '',
        id: null,
        login: '',
    },
    isAuth: false,
};

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