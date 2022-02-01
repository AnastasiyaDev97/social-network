import {Dispatch} from "redux";
import {actionsType, stateType} from "../../redux-store";
import {setAppStatusAC} from "../app/app-reducer";
import {UsersAPI} from "../../../api/api";
import {RESULT_CODES} from "../../../enums/ResultCode";
import {
    followUser,
    setTotalUsersCount,
    setUsers,
    toggleFollowProgress,
    toggleIsFetching,
    unFollowUser
} from "./user-reducer";

export const getUsersThunk = () =>
    async (dispatch: Dispatch<actionsType>, getState: () => stateType) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(toggleIsFetching(true))
        const {currentPage, pageSize, itemsType, term} = getState().UsersPage
        const paramsForQuery = {
            count:pageSize,
            page: currentPage,
            term,
            friend: itemsType === 'friends'
        }
        let data = await UsersAPI.getUsers(paramsForQuery)
        if (data) {
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        }
        dispatch(toggleIsFetching(false))
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
