import {usersDataType, UsersPageType} from "../../redux/store";
import React from "react"
import s from './User.module.css'
import axios from "axios";
import {PropsType} from "./UsersContainer";


export class Users extends React.Component<PropsType> /*(props: UsersPropsType) =>*/ {
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
        debugger
        let pageNumber = Math.ceil(this.props.totalUserCount / this.props.pageSize)

        let pageNumberArr = []
        for (let i = 1; i <= (pageNumber>10?10:pageNumber); i++) {
            if(pageNumber>10){
            pageNumberArr.push(i)}
        }

        return (
            <div>
                {pageNumberArr.map(m => <span onClick={(e) => {
                    this.ChangePageHandler(m)
                }}
                                              className={this.props.currentPage === m ? s.currentPage : s.pageNum}>{m}</span>)}

                {this.props.items.map(m => <div key={m.id}>
                <span>
                    <div><img
                        src={m.photos.small || 'https://cdn.iconscout.com/icon/free/png-256/laptop-user-1-1179329.png'}
                        className={s.userPhoto}/></div>
                    <div>{m.followed ? <button onClick={() => {
                            this.props.unFollowUser(m.id)
                        }}>Unfollow</button>
                        : <button onClick={() => {
                            this.props.followUser(m.id)
                        }}>Follow</button>}</div>
                </span>
                        <span>
                    <div>{m.name}</div>
                    <div>{m.status}</div>
                </span>
                        <span>
                    <div>m.location.country</div>
                    <div>m.location.city</div>
                </span>
                    </div>
                )
                }
            </div>
        )
    }
}