import {FC, memo} from "react";
import {initialUserAvatar} from "../../../../../const";
import style from "../ProfileForm.module.scss";
import {ItemsUsersResponseType} from "../../../../../api/types";
import {NavLink,  useHistory} from "react-router-dom";
import {PATH} from "../../../../../enums/PATH";



type FriendsIconsT = {
    followingUsers: Array<ItemsUsersResponseType>
    totalUserCount:number
}

export const FriendsIcons: FC<FriendsIconsT> = memo(({followingUsers,totalUserCount}) => {

    let history = useHistory();

    const maxCountFollowingIcons = 5
    const followingCount=totalUserCount

    const onFriendBlockClick=()=>{
               history.push(PATH.USERS)
    }

    return (
        <div className={style.following}>
            <div>
                <p className={style.followingTitle}>{followingCount} Following</p>
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