import { EMPTY_STRING } from './../../../const/index';
import {actionsType} from "../../redux-store";
import {ItemsUsersResponseType} from "../../../api/types";
import {PAGE_SIZE} from "../../../const";

export type itemsT = 'users' | 'friends' | null

let initialState = {
    items: [ ],
    pageSize: PAGE_SIZE,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    itemsType: 'users' as itemsT,
    term: EMPTY_STRING
};
export type UsersPageType = {
    items: Array<ItemsUsersResponseType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    itemsType: itemsT
    term: string
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
            }     
        case "USER/SET-USERS":
        case "USER/CHANGE-PAGE":
        case "USER/SET-TOTAL-USER-COUNT":
        case "USER/TOGGLE-IS-FETCHING":
        case 'USER/TOGGLE-ITEMS-TYPE':
        case 'USER/SET-TERM':
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

export const changePage = (currentPage: number) => ({
        type: 'USER/CHANGE-PAGE',
        payload: {currentPage},
    } as const
)

export const setTotalUsersCount = (totalUserCount: number) => ({
        type: 'USER/SET-TOTAL-USER-COUNT',
        payload: {totalUserCount},
    } as const
)


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

export const toggleItemsType = (itemsType: itemsT) => ({
        type: 'USER/TOGGLE-ITEMS-TYPE',
        payload: {itemsType}
    }
) as const

export const setTerm = (term: string) => ({
        type: 'USER/SET-TERM',
        payload: {term}
    }
) as const


export default userReducer