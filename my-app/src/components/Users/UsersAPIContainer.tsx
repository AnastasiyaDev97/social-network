import React from "react"
import axios from "axios";
import {PropsType} from "./UsersContainer";
import {Users} from "./Users";

import {Preloader} from "../../common/preloader/Preloader";


export class UsersAPIContainer extends React.Component<PropsType> /*(props: UsersPropsType) =>*/ {
    constructor(props: PropsType) {
        super(props);
    }

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(responce => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(responce.data.items)
                this.props.setTotalUsersCount(responce.data.totalCount)
            })
    }

    ChangePageHandler = (currentPage: number) => {
        this.props.toggleIsFetching(true)
        this.props.changePage(currentPage);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
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