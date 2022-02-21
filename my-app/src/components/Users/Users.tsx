import style from "./Users.module.scss";
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import Paginator from "../../common/paginator/Paginator";
import { ItemsUsersResponseType } from "../../api/types";
import { stateType } from "../../redux/redux-store";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  changePage,
  itemsT,
  setTerm,
  toggleItemsType,
} from "../../redux/reducer/users/user-reducer";
import Preloader from "../../common/preloader/Preloader";
import { User } from "./User/User";
import SuperInputText from "../SuperInput/SuperInputText";
import { EMPTY_STRING } from "../../const";
import { UsersNav } from "./UserNav/UserNav";

const Users: FC<UsersPropsType> = memo(
  ({
    items,
    pageSize,
    totalUserCount,
    isFetching,
    isAuth,
    currentPage,
    itemsType,
    changePage,
    toggleItemsType,
    setTerm,
    term,
    isLoggedIn,
  }) => {
    const [searchValue, setSearchValue] = useState<string>(term);

    const portionSize = 10;
    
    const titleText =
      itemsType === "friends" ? "Your friends" : "People you can follow";
    

    useEffect(() => {
      let idOfTimeout = setTimeout(() => {
        setTerm(searchValue);
      }, 1000);

      return () => {
        clearTimeout(idOfTimeout);
      };
    }, [searchValue, setTerm]);

    const handleChangePageClick = useCallback(
      (currentPage: number) => {
        changePage(currentPage);
      },
      [pageSize, itemsType, changePage]
    );

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.currentTarget.value);
    };

    const onSearchInputEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (searchValue) {
        if (e.key === "Enter" && searchValue.trim() !== EMPTY_STRING) {
        }
      }
    };

    

    if (isFetching) {
      return <Preloader />;
    }
    return (
      <div className={style.userContainer}>
       <UsersNav isLoggedIn={isLoggedIn} itemsType={itemsType} toggleItemsType={toggleItemsType}/>

        <div className={style.usersBlock}>
          <div className={style.titleWithSearchInput}>
            <h6 className={style.usersBlockTitle}>{titleText}</h6>
            <SuperInputText
              value={searchValue}
              onChange={onSearchInputChange}
              onKeyPress={onSearchInputEnterPress}
              className={style.inputSearch}
            />
          </div>

          <div className={style.users}>
            {items.map((item) => (
              <User item={item} isAuth={isAuth} />
            ))}
          </div>
        </div>

        <Paginator
          totalUserCount={totalUserCount}
          pageSize={pageSize}
          onChangePageClick={handleChangePageClick}
          portionSize={portionSize}
          currentPage={currentPage}
        />
      </div>
    );
  }
);

type MapStatePropsType = {
  isAuth: boolean;
  items: Array<ItemsUsersResponseType>;
  pageSize: number;
  totalUserCount: number;
  currentPage: number;
  isFetching: boolean;
  itemsType: itemsT;
  term: string;
  isLoggedIn: boolean;
};

type MapDispatchPropsType = {
  changePage: (currentPage: number) => void;
  toggleItemsType: (itemsType: itemsT) => void;
  setTerm: (term: string) => void;
};

type UsersPropsType = MapDispatchPropsType & MapStatePropsType;

let mapStateToProps = (state: stateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  items: state.UsersPage.items,
  pageSize: state.UsersPage.pageSize,
  totalUserCount: state.UsersPage.totalUserCount,
  currentPage: state.UsersPage.currentPage,
  isFetching: state.UsersPage.isFetching,
  itemsType: state.UsersPage.itemsType,
  term: state.UsersPage.term,
  isLoggedIn: state.auth.isLoggedIn,
});

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, {}, stateType>(
    mapStateToProps,
    { changePage, toggleItemsType, setTerm }
  )
)(Users);
