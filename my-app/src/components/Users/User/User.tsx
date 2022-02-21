import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../../../enums/PATH";
import { initialUserAvatar } from "../../../const";
import style from "./User.module.scss";
import FollowUnfollowBtn from "../../FollowUnfollowBtn/FollowUnfollowBtn";
import { ItemsUsersResponseType } from "../../../api/types";

type UserPropsType = {
  item: ItemsUsersResponseType;
  isAuth: boolean;
};

export const User: FC<UserPropsType> = memo(({ item, isAuth }) => {
  return (
    <div className={style.userBlock}>
      <NavLink
        to={PATH.PROFILE + "/" + item.id}
        key={item.id}
        className={style.link}
      >
        <img
          src={item.photos.small || initialUserAvatar}
          className={style.userPhoto}
          alt={"profile avatar"}
        />
      </NavLink>

      <div>
        <p className={style.userName}>{item.name}</p>
        <div className={style.userStatus}>{item.status}</div>
      </div>
      <div className={style.followBtn}>
        {isAuth && <FollowUnfollowBtn item={item} />}
      </div>
    </div>
  );
});
