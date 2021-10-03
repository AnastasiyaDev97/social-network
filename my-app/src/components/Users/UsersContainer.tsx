import {connect} from "react-redux";

import {actionsType, stateType, usersDataType} from "../../redux/store";
import {
    changePageAC,
    followUserAC,
    setTotalUsersCountAC,
    setUsersAC, toggleIsFetchingAC,
    unFollowUserAC
} from "../../redux/reducer/user-reducer";
import {UsersAPIContainer} from "./UsersAPIContainer";

type mapDispatchToPropsType = {
    followUser: (id: number) => void
    unFollowUser: (id: number) => void
    setUsers: (users: Array<usersDataType>) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    changePage: (currentPage: number) => void
    toggleIsFetching: (isFetching: boolean) => void
}
type mapStateToPropsType = {
    items: Array<usersDataType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
}
export type PropsType = mapStateToPropsType & mapDispatchToPropsType

let mapStateToProps = (state: stateType) => {

    return {
        items: state.UsersPage.items,
        pageSize: state.UsersPage.pageSize,
        totalUserCount: state.UsersPage.totalUserCount,
        currentPage: state.UsersPage.currentPage,
        isFetching: state.UsersPage.isFetching,
    }
}
let mapDispatchToProps = (dispatch: (action: actionsType) => void) => {

    return {
        followUser: (id: number) => {
            dispatch(followUserAC(id))
        },
        unFollowUser: (id: number) => {
            dispatch(unFollowUserAC(id))
        },
        setUsers: (users: Array<usersDataType>) => {
            dispatch(setUsersAC(users))
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setTotalUsersCountAC(totalUsersCount))
        },
        changePage: (currentPage: number) => {
            dispatch(changePageAC(currentPage))
        },
        toggleIsFetching: (isFetching: boolean) => {
            dispatch(toggleIsFetchingAC(isFetching))
        }
    }
}
export let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer)