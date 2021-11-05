import React from "react"
import {Users} from "./Users";
import Preloader from "../../common/preloader/Preloader";
import {connect} from "react-redux";
import {
    changePage,
    followUser,
    setTotalUsersCount,
    setUsers, toggleFollowProgress,
    toggleIsFetching,
    unFollowUser, usersDataType
} from "../../redux/reducer/user-reducer";

import {stateType} from "../../redux/redux-store";
import {getUsers} from "../../api/api";


class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }

    ChangePageHandler = (currentPage: number) => {
        this.props.toggleIsFetching(true)
        this.props.changePage(currentPage);
        getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }
    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users {...this.props} changePage={this.ChangePageHandler}
                />
            </>
        )
    }
}

type mapDispatchToPropsType = {
    followUser: (id: number) => void
    unFollowUser: (id: number) => void
    setUsers: (users: Array<usersDataType>) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    changePage: (currentPage: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowProgress: (isFollowInProgress: boolean, userId: number) => void
}
type mapStateToPropsType = {
    items: Array<usersDataType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
export type PropsType = mapStateToPropsType & mapDispatchToPropsType

let mapStateToProps = (state: stateType) => ({
    items: state.UsersPage.items,
    pageSize: state.UsersPage.pageSize,
    totalUserCount: state.UsersPage.totalUserCount,
    currentPage: state.UsersPage.currentPage,
    isFetching: state.UsersPage.isFetching,
    followingInProgress: state.UsersPage.followingInProgress
})
export default connect(mapStateToProps, {
    followUser,
    unFollowUser,
    setUsers,
    setTotalUsersCount,
    changePage,
    toggleIsFetching,
    toggleFollowProgress,
})(UsersContainer)