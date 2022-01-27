import React, {FC, memo} from "react";
import {initialUserAvatar} from "../../../../../const";
import style from "../ProfileForm.module.scss";
import {ItemsUsersResponseType} from "../../../../../api/types";
import {NavLink,  useHistory} from "react-router-dom";
import {PATH} from "../../../../../enums/PATH";
import {USERS_TYPE} from "../../../../../enums/UsersType";

type FriendsIconsT = {
    followingUsers: Array<ItemsUsersResponseType>
    toggleUsersType:(usersType: string)=>void
}

export const FriendsIcons: FC<FriendsIconsT> = memo(({followingUsers,toggleUsersType}) => {

    const maxCountFollowingIcons = 5
    let history = useHistory();


    const onFriendBlockClick=()=>{
        toggleUsersType(USERS_TYPE.FRIENDS)
        history.push(PATH.USERS)
    }

    return (
        <div className={style.following}>
            <div>
                <p className={style.followingTitle}>Following</p>
                <div onClick={onFriendBlockClick} className={style.followingIconsBlock}>
                    {followingUsers.map((user, i) => {
                            if (i < maxCountFollowingIcons)
                                return <img key={i} src={user.photos.small || initialUserAvatar}
                                            alt='following' className={style.followingPhoto}/>
                            if (!user)
                                return <NavLink to={PATH.USERS}>add following</NavLink>
                        }
                    )}
                </div>
            </div>
        </div>
    )
})