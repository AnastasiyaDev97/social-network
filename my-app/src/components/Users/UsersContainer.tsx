import React from "react"
import {Users} from "./Users";
import Preloader from "../../common/preloader/Preloader";
import {connect} from "react-redux";
import {
    changePageThunk, followThunk,
    getUsersThunk,
    unfollowThunk,

} from "../../redux/reducer/user-reducer";

import {stateType} from "../../redux/redux-store";
import {ItemsUsersResponseType} from "../../api/api";
import {compose} from "redux";


class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
    }

    ChangePageHandler = (currentPage: number) => {
        this.props.changePageThunk(currentPage, this.props.pageSize)
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
    getUsersThunk: (currentPage: number, pageSize: number) => any
    changePageThunk: (currentPage: number, pageSize: number) => any
    followThunk: (id: number) => any
    unfollowThunk: (id: number) => any

}
type mapStateToPropsType = {
    items: Array<ItemsUsersResponseType>
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
    followingInProgress: state.UsersPage.followingInProgress,
})
export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        changePageThunk,
        getUsersThunk,
        followThunk,
        unfollowThunk,
    }))(UsersContainer)
