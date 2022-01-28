import {actionsType} from "../redux-store";
import {UsersAPI} from "../../api/api";
import {Dispatch} from "redux";
import {ItemsUsersResponseType} from "../../api/types";
import {setAppStatusAC} from "./app-reducer";
import {RESULT_CODES} from "../../enums/ResultCode";
import {PAGE_SIZE} from "../../const";

export type itemsT='users'|'friends'

let initialState = {
    items: [
        /*  {name: string
  id: number
  uniqueUrlName: null
  photos: {
      small: Nullable<string>
      large: Nullable<string>
  }
  status: Nullable<string>
  followed: boolean}*/
    ],
    pageSize: PAGE_SIZE,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    itemsType:'friends' as itemsT
};
export type UsersPageType = {
    items: Array<ItemsUsersResponseType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    itemsType:itemsT
}


export const userReducer = (state: UsersPageType = initialState, action: actionsType) => {
    switch (action.type) {

        case "USER/FOLLOW-USER":
            return {
                ...state,
                items: state.items.map(m => m.id === action.id ? {...m, followed: true} : m)
            }
        case "USER/UNFOLLOW-USER":
            return {
                ...state,
                items: state.items.map(m => m.id === action.id ? {...m, followed: false} : m)
            }     //и тут
        case "USER/SET-USERS":
        case "USER/CHANGE-PAGE":
        case "USER/SET-TOTAL-USER-COUNT":
        case "USER/TOGGLE-IS-FETCHING":
        case 'USER/TOGGLE-ITEMS-TYPE':
            return {
                ...state, ...action.payload
            }
        case "USER/TOGGLE-FOLLOW-PROGRESS":
            return action.isFollowInProgress ? {
                ...state, followingInProgress: [...state.followingInProgress, action.userId]
            } : {...state, followingInProgress: state.followingInProgress.filter(f => f !== action.userId)}
        default:
            return state
    }
}

export const followUser = (id: number) => ({
    type: 'USER/FOLLOW-USER',
    id,
}) as const

export const unFollowUser = (id: number) => ({
    type: 'USER/UNFOLLOW-USER',
    id,
}) as const

export const setUsers = (items: Array<ItemsUsersResponseType>) => ({
    type: 'USER/SET-USERS',
    payload: {items},
} as const)

export const changePage = (currentPage: number) => (
    {
        type: 'USER/CHANGE-PAGE',
        payload: {currentPage},
    }
) as const

export const setTotalUsersCount = (totalUserCount: number) => ({
        type: 'USER/SET-TOTAL-USER-COUNT',
        payload: {totalUserCount},
    }
) as const


export const toggleIsFetching = (isFetching: boolean) => ({
        type: 'USER/TOGGLE-IS-FETCHING',
        payload: {isFetching},
    }
) as const

export const toggleFollowProgress = (isFollowInProgress: boolean, userId: number) => ({
        type: 'USER/TOGGLE-FOLLOW-PROGRESS',
        isFollowInProgress,
        userId,
    }
) as const

export const toggleItemsType = (itemsType:itemsT) => ({
        type: 'USER/TOGGLE-ITEMS-TYPE',
        payload:{itemsType}
    }
) as const

export const getUsersThunk = (currentPage:number=1, pageSize: number=PAGE_SIZE,friend?:boolean) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(toggleIsFetching(true))
        let data = await UsersAPI.getUsers(currentPage, pageSize,friend)
        if (data) {
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        }
        dispatch(toggleIsFetching(false))
        dispatch(setAppStatusAC('succeeded'))
    }




export const changePageThunk = (currentPage: number, pageSize: number,friends?:boolean) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changePage(currentPage))
        let data = await UsersAPI.getUsers(currentPage, pageSize,friends)
        if (data) {
            dispatch(setUsers(data.items))
        }
        dispatch(setAppStatusAC('succeeded'))
    }

export const followThunk = (id: number) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(toggleFollowProgress(true, id))
        let data = await UsersAPI.followUserAPI(id)
        if (data.resultCode === RESULT_CODES.SUCCESS) {
            dispatch(toggleFollowProgress(false, id))
            dispatch(followUser(id))
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export const unfollowThunk = (id: number) =>
    async (dispatch: Dispatch<actionsType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(toggleFollowProgress(true, id))
        let data = await UsersAPI.unfollowUserAPI(id)
        if (data.resultCode === RESULT_CODES.SUCCESS) {
            dispatch(toggleFollowProgress(false, id))
            dispatch(unFollowUser(id))
            dispatch(setAppStatusAC('succeeded'))
        }
    }

export default userReducer