import { FC, memo } from 'react';
import { EMPTY_STRING } from '../../../const';
import { itemsT } from '../../../redux/reducer/users/user-reducer';
import style from './../Users.module.scss'

type UserNavPropsT={
  isLoggedIn:boolean
  itemsType:itemsT
  toggleItemsType: (itemsType: itemsT) => void
}

export const UsersNav: FC<UserNavPropsT> = memo(({itemsType,isLoggedIn,toggleItemsType}) => {

  const disabledSpanStyle = !isLoggedIn && style.disabled;
  const itemsArr = [
    {
      name: "PEOPLE",
      callback: onPeopleLinkClick,
      styleName: itemsType === "users" ? style.activeLink : EMPTY_STRING,
    },
    {
      name: "FRIENDS",
      callback: onFriendsLinkClick,
      styleName: `${disabledSpanStyle} ${
        itemsType === "friends" ? style.activeLink : EMPTY_STRING
      }`,
    },
  ];

  function onPeopleLinkClick() {
    toggleItemsType("users");
  }

  function onFriendsLinkClick() {
      if(isLoggedIn)
    toggleItemsType("friends");
    
  }

  return (
    <ul className={style.navBar}>
      {itemsArr.map((item, i) => (
        <li key={i}>
          <span className={item.styleName} onClick={item.callback}>
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
});
