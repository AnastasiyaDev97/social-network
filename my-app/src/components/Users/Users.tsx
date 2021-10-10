import s from "./User.module.css";
import React from "react";
import {usersDataType} from "../../redux/store";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
    totalUserCount: number
    pageSize: number
    ChangePageHandler: (currentPage: number) => void
    currentPage: number
    items: Array<usersDataType>
    unFollowUser: (id: number) => void
    followUser: (id: number) => void
}

export const Users = (props: UsersPropsType) => {
    let pageNumber = Math.ceil(props.totalUserCount / props.pageSize)
    let pageNumberArr = []
    for (let i = 1; i <= (pageNumber > 10 ? 10 : pageNumber); i++) {
        if (pageNumber > 10) {
            pageNumberArr.push(i)
        }
    }
    return (
        <div>
            {pageNumberArr.map(m => <span onClick={(e) => {
                props.ChangePageHandler(m)
            }
            } className={props.currentPage === m ? s.currentPage : s.pageNum}>{m}</span>)}

            {props.items.map(m => <div key={m.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + m.id}><img
                            src={m.photos.small || 'https://cdn.iconscout.com/icon/free/png-256/laptop-user-1-1179329.png'}
                            className={s.userPhoto}/></NavLink></div>

                    <div>{m.followed ? <button onClick={() => {
                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${m.id}`, {
                                withCredentials: true,
                                headers: {
                                    'API-KEY': "d8da80cf-dec0-48d0-8ed1-f7c13d835be6"
                                }
                            })
                                .then(responce => {
                                    if (responce.data.resultCode === 0) {
                                        props.unFollowUser(m.id)
                                    }
                                })
                        }
                        }>Unfollow</button>

                        : <button onClick={() => {
                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${m.id}`, {}, {
                                withCredentials: true,
                                headers: {
                                    'API-KEY': "d8da80cf-dec0-48d0-8ed1-f7c13d835be6"
                                }
                            })
                                .then(responce => {
                                    if (responce.data.resultCode === 0) {
                                        props.followUser(m.id)
                                    }
                                })
                        }
                        }>Follow</button>}</div>

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