import s from "./User.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import {followUserAPI, unfollowUserAPI} from "../../api/api";
import {usersDataType} from "../../redux/reducer/user-reducer";

type UsersPropsType = {
    totalUserCount: number
    pageSize: number
    changePage: (currentPage: number) => void
    currentPage: number
    items: Array<usersDataType>
    unFollowUser: (id: number) => void
    followUser: (id: number) => void
    toggleFollowProgress: (isFollowInProgress: boolean, userId: number) => void
    followingInProgress: number[]
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
            {pageNumberArr.map(m => <span onClick={() => {
                props.changePage(m)
            }
            } className={props.currentPage === m ? s.currentPage : s.pageNum}>{m}</span>)}

            {props.items.map(m => <div key={m.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + m.id}><img
                            src={m.photos.small || 'https://cdn.iconscout.com/icon/free/png-256/laptop-user-1-1179329.png'}
                            className={s.userPhoto} alt={'profile avatar'}/></NavLink></div>

                    <div>{m.followed ?
                        <button disabled={props.followingInProgress.some(id => id === m.id)} onClick={() => {
                            props.toggleFollowProgress(true, m.id)
                            unfollowUserAPI(m.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        props.toggleFollowProgress(false, m.id)
                                        props.unFollowUser(m.id)
                                    }

                                })
                        }
                        }>Unfollow</button>

                        : <button disabled={props.followingInProgress.some(id => id === m.id)} onClick={() => {
                            props.toggleFollowProgress(true, m.id)
                            followUserAPI(m.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        props.toggleFollowProgress(false, m.id)
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