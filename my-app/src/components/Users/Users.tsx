import s from "./User.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import Paginator from "../../common/paginator/Paginator";
import {ItemsUsersResponseType} from "../../api/types";


type UsersPropsType = {
    totalUserCount: number
    pageSize: number
    changePage: (currentPage: number) => void
    currentPage: number
    items: Array<ItemsUsersResponseType>
    followingInProgress: number[]
    followThunk: any
    unfollowThunk: any
}

export const Users = (props: UsersPropsType) => {
    return (
        <div>
            <Paginator totalUserCount={props.totalUserCount} pageSize={props.pageSize} currentPage={props.currentPage}
                       changePageHandler={props.changePage} portionSize={10}/>

            {props.items.map(m => <div key={m.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + m.id}><img
                            src={m.photos.small || 'https://cdn.iconscout.com/icon/free/png-256/laptop-user-1-1179329.png'}
                            className={s.userPhoto} alt={'profile avatar'}/></NavLink></div>

                    <div>{m.followed ?
                        <button disabled={props.followingInProgress.some(id => id === m.id)} onClick={() => {
                            props.unfollowThunk(m.id)
                        }
                        }>Unfollow</button>

                        : <button disabled={props.followingInProgress.some(id => id === m.id)} onClick={() => {
                            props.followThunk(m.id)
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