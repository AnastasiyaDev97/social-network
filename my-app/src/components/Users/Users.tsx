import s from "./User.module.css";
import React, {FC, memo} from "react";
import {NavLink} from "react-router-dom";
import Paginator from "../../common/paginator/Paginator";
import {ItemsUsersResponseType} from "../../api/types";
import {PATH} from "../../enums/PATH";


type UsersPropsType = {
    totalUserCount: number
    pageSize: number
    changePage: (currentPage: number) => void
    items: Array<ItemsUsersResponseType>
    followingInProgress: number[]
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
}

export const Users: FC<UsersPropsType> = memo(({
                                                   totalUserCount, pageSize, changePage,
                                                   items, followingInProgress, followThunk, unfollowThunk
                                               }) => {
    const portionSize = 10
    const initialUserAvatar = 'https://cdn.iconscout.com/icon/free/png-256/laptop-user-1-1179329.png'


    return (
        <div>
            <Paginator totalUserCount={totalUserCount} pageSize={pageSize}
                       changePageHandler={changePage} portionSize={portionSize}/>

            {items.map(item => {

                    const conditionForDisabledButton = followingInProgress.some(id => id === item.id)

                    const onUnfollowButtonClick = () => {
                        unfollowThunk(item.id)
                    }

                    const onFollowButtonClick = () => {
                        followThunk(item.id)
                    }

                    return (

                        <div key={item.id}>
                <span>
                    <div>
                        <NavLink to={PATH.PROFILE + '/' + item.id}><img
                            src={item.photos.small || initialUserAvatar}
                            className={s.userPhoto} alt={'profile avatar'}/></NavLink></div>

                    <div>
                        <button disabled={conditionForDisabledButton}
                                onClick={item.followed ? onUnfollowButtonClick : onFollowButtonClick}>
                            {item.followed ? 'Unfollow' : 'Follow'}</button>

                       </div>

                </span>
                            <span>
                    <div>{item.name}</div>
                    <div>{item.status}</div>
                </span>
                            <span>
                    <div>item.location.country</div>
                    <div>item.location.city</div>
                </span>
                        </div>)
                }
            )
            }
        </div>
    )
})