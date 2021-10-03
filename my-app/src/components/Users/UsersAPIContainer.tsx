import {usersDataType, UsersPageType} from "../../redux/store";
import React from "react"
import s from './User.module.css'
import axios from "axios";
import {PropsType} from "./UsersContainer";
import {Users} from "./Users";


export class UsersAPIContainer extends React.Component<PropsType> /*(props: UsersPropsType) =>*/ {
    constructor(props: PropsType) {
        super(props);
    }

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(responce => {
            this.props.setUsers(responce.data.items)
            this.props.setTotalUsersCount(responce.data.totalCount)
        })
    }

    ChangePageHandler = (currentPage: number) => {
        this.props.changePage(currentPage);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`).then(responce => {
            this.props.setUsers(responce.data.items)
        })
    }

    render() {


        return (
            <Users totalUserCount={this.props.totalUserCount}
                   pageSize={this.props.pageSize}
                   ChangePageHandler={this.ChangePageHandler}
                   currentPage={this.props.currentPage}
                   items={this.props.items}
                   unFollowUser={this.props.unFollowUser}
                   followUser={this.props.followUser}/>
        )
    }
}