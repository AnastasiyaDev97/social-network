import {actionsType} from "../redux-store";
import {followUserAPI, ItemsUsersResponseType, unfollowUserAPI, UsersAPI} from "../../api/api";
import {Dispatch} from "redux";


let initialState = {
    items: [],
    pageSize: 10,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};
export type UsersPageType = {
    items: Array<ItemsUsersResponseType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

/*export type ItemsUsersResponseType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: {
        small: null | string
        large: null | string
    }
    status: null | string
    followed: boolean
}*/

export const userReducer = (state: UsersPageType = initialState, action: actionsType) => {
    switch (action.type) {
        case "FOLLOW-USER":
            return {
                ...state,
                items: state.items.map(m => m.id === action.id ? {...m, followed: true} : m)
            }
        case "UNFOLLOW-USER":
            return {
                ...state,
                items: state.items.map(m => m.id === action.id ? {...m, followed: false} : m)
            }     //и тут
        case "SET-USERS":
        case "CHANGE-PAGE":
        case "SET-TOTAL-USER-COUNT":
        case "TOGGLE-IS-FETCHING":
            return {
                ...state, ...action.payload
            }
        case "TOGGLE-FOLLOW-PROGRESS":
            return action.isFollowInProgress ? {
                ...state, followingInProgress: [...state.followingInProgress, action.userId]
            } : {...state, followingInProgress: state.followingInProgress.filter(f => f !== action.userId)}
        default:
            return state
    }
}

export const followUser = (id: number) => ({
    type: 'FOLLOW-USER',
    id,
}) as const

export const unFollowUser = (id: number) => ({
    type: 'UNFOLLOW-USER',
    id,
}) as const

export const setUsers = (items: Array<ItemsUsersResponseType>) => {
    return(
        {
            type: 'SET-USERS',
            payload:{items},
        } as const)

}
export const changePage = (currentPage: number) => (
    {
        type: 'CHANGE-PAGE',
        payload:{currentPage},
    }
) as const

export const setTotalUsersCount = (totalUserCount: number) =>{
    return(
    {
        type: 'SET-TOTAL-USER-COUNT',
        payload:{totalUserCount},
    }
) as const}
export const toggleIsFetching = (isFetching: boolean) => (
    {
        type: 'TOGGLE-IS-FETCHING',
        payload:{isFetching},
    }
) as const
export const toggleFollowProgress = (isFollowInProgress: boolean, userId: number) => (
    {
        type: 'TOGGLE-FOLLOW-PROGRESS',
        isFollowInProgress,
        userId,
    }
) as const

export const getUsersThunk = (currentPage: number, pageSize: number) =>
    async (dispatch: Dispatch<actionsType>) => {
    debugger
        dispatch(toggleIsFetching(true))
        let data = await UsersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }

export const changePageThunk = (currentPage: number, pageSize: number) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(toggleIsFetching(true))
        dispatch(changePage(currentPage))
        let data = await UsersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
    }

export const followThunk = (id: number) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(toggleFollowProgress(true, id))
        let data = await followUserAPI(id)
        if (data.resultCode === 0) {
            dispatch(toggleFollowProgress(false, id))
            dispatch(followUser(id))
        }
    }


export const unfollowThunk = (id: number) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(toggleFollowProgress(true, id))
        let data = await unfollowUserAPI(id)
        if (data.resultCode === 0) {
            dispatch(toggleFollowProgress(false, id))
            dispatch(unFollowUser(id))
        }
    }

export default userReducer