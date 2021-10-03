import {actionsType, usersDataType, UsersPageType} from "../store";

let initialState = {

    items: [],
    pageSize: 5,
    totalUserCount: 10,
    currentPage: 1,
    isFetching:true
};

export const userReducer = (state: UsersPageType = initialState, action: actionsType) => {

    switch (action.type) {
        case "FOLLOW-USER":

            return {
                ...state,
                items: state.items.map(m => m.id === action.id ? {...m, followed: true} : m)
            }       //...state у димы
        case "UNFOLLOW-USER":

            return {
                ...state,
                items: state.items.map(m => m.id === action.id ? {...m, followed: false} : m)
            }     //и тут
        case "SET-USERS":
            return {
                ...state,
                items: action.items
            }         //????
        case "CHANGE-PAGE":
            return {
                ...state, currentPage: action.currentPage
            }
        case "SET-TOTAL-USER-COUNT":
            return {
                ...state, totalUserCount:action.totalUsersCount
            }
        case "TOGGLE-IS-FETCHING":
            return {
                ...state, isFetching:action.isFetching
            }
        default:
            return state
    }
}

export const followUserAC = (id: number) => ({
    type: 'FOLLOW-USER',
    id,
}) as const

export const unFollowUserAC = (id: number) => ({
    type: 'UNFOLLOW-USER',
    id,
}) as const

export const setUsersAC = (items: Array<usersDataType>) => (
    {
        type: 'SET-USERS',
        items,
    }
) as const
export const changePageAC = (currentPage: number) => (
    {
        type: 'CHANGE-PAGE',
        currentPage,
    }
) as const
export const setTotalUsersCountAC = (totalUsersCount: number) => (
    {
        type: 'SET-TOTAL-USER-COUNT',
        totalUsersCount,
    }
) as const
export const toggleIsFetchingAC = (isFetching:boolean) => (
    {
        type: 'TOGGLE-IS-FETCHING',
        isFetching,
    }
) as const

export default userReducer