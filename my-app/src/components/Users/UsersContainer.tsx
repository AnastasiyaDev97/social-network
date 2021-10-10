import React from "react"
import axios from "axios";
import {Users} from "./Users";
import Preloader from "../../common/preloader/Preloader";
import {connect} from "react-redux";
import {
    changePage,
    followUser,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unFollowUser
} from "../../redux/reducer/user-reducer";
import {stateType, usersDataType} from "../../redux/store";


class UsersContainer extends React.Component<PropsType> /*(props: UsersPropsType) =>*/ {
    constructor(props: PropsType) {
        super(props);
    }

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,{withCredentials:true})
            .then(responce => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(responce.data.items)
                this.props.setTotalUsersCount(responce.data.totalCount)
            })
    }

    ChangePageHandler = (currentPage: number) => {
        this.props.toggleIsFetching(true)
        this.props.changePage(currentPage);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`,{withCredentials:true})
            .then(responce => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(responce.data.items)
            })
    }

    render() {

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalUserCount={this.props.totalUserCount}
                       pageSize={this.props.pageSize}
                       ChangePageHandler={this.ChangePageHandler}
                       currentPage={this.props.currentPage}
                       items={this.props.items}
                       unFollowUser={this.props.unFollowUser}
                       followUser={this.props.followUser}/>
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
}
type mapStateToPropsType = {
    items: Array<usersDataType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
}
export type PropsType = mapStateToPropsType & mapDispatchToPropsType

let mapStateToProps = (state: stateType) => ({
        items: state.UsersPage.items,
        pageSize: state.UsersPage.pageSize,
        totalUserCount: state.UsersPage.totalUserCount,
        currentPage: state.UsersPage.currentPage,
        isFetching: state.UsersPage.isFetching,
})
export default connect(mapStateToProps, {
    followUser,
    unFollowUser,
    setUsers,
    setTotalUsersCount,
    changePage,
    toggleIsFetching,
})(UsersContainer)