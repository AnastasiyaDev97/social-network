import {actionsType, usersDataType, UsersPageType} from "../store";

let initialState = {
    usersData: []
};

export const userReducer = (state: UsersPageType = initialState, action: actionsType) => {

    switch (action.type) {
        case "FOLLOW-USER":

            return {...state,
                usersData:state.usersData.map(m => m.id === action.id ? {...m, followed: true} : m)}       //...state у димы
        case "UNFOLLOW-USER":

            return {...state,
                usersData:state.usersData.map(m => m.id === action.id ? {...m, followed: false} : m)}     //и тут
        case "SET-USERS":
            return {
                ...state,
                usersData: [...state.usersData,...action.users]
            }         //????
        default:
            return state
    }
}

export const followUserAC = (id: number) => ({
    type: 'FOLLOW-USER',
    id
}) as const

export const unFollowUserAC = (id: number) => ({
    type: 'UNFOLLOW-USER',
    id
}) as const

export const setUsersAC = (users:Array<usersDataType>) => (
    {
        type: 'SET-USERS',
        users
    }
) as const

export default userReducer