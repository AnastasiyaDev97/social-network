import style from "./Users.module.scss";
import React, {ChangeEvent,KeyboardEvent, FC, memo, useCallback, useState} from "react";
import Paginator from "../../common/paginator/Paginator";
import {ItemsUsersResponseType} from "../../api/types";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";
import {changePage,  itemsT} from "../../redux/reducer/user-reducer";
import Preloader from "../../common/preloader/Preloader";
import {User} from "./User/User";
import {PATH} from "../../enums/PATH";
import {NavLink} from "react-router-dom";
import SuperInputText from "../SuperInput/SuperInputText";


const Users: FC<UsersPropsType> = memo(({
                                            items, pageSize, totalUserCount, isFetching/*, changePageThunk*/,
                                            isAuth, currentPage, itemsType,changePage
                                        }) => {

        const [searchValue, setSearchValue] = useState<string>('')

        const portionSize = 10
        const titleText = itemsType === 'friends' ? 'Your friends' : 'People you can follow'

        const handleChangePageClick = useCallback((currentPage: number) => {
            /*let friend = itemsType === 'friends'*/
            changePage(currentPage)
            /*changePageThunk(currentPage, pageSize, friend)*/
        }, [pageSize, itemsType,changePage])

        const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.currentTarget.value)
        }

        const onSearchInputEnterPress=(e: KeyboardEvent<HTMLInputElement>)=>{
            if ((e.key === 'Enter')&&(searchValue.trim() !== '')){

            }
        }

        if (isFetching) {
            return <Preloader/>
        }
        return (
            <div className={style.userContainer}>
                <ul className={style.navBar}>
                    <li><NavLink to={PATH.USERS}
                                 activeClassName={style.activeLink}>PEOPLE</NavLink></li>
                    <li><NavLink to={PATH.FRIENDS} activeClassName={style.activeLink}>
                        FRIENDS</NavLink></li>
                </ul>

                <div className={style.usersBlock}>
                    <div className={style.titleWithSearchInput}>
                        <h6 className={style.usersBlockTitle}>
                            {titleText}
                        </h6>
                        <SuperInputText value={searchValue} onChange={onSearchInputChange}
                                        onKeyPress={onSearchInputEnterPress}/>
                    </div>
                    <div className={style.users}>
                        {
                            items.map(item => <User item={item} isAuth={isAuth}/>)
                        }
                    </div>

                </div>


                <Paginator totalUserCount={totalUserCount} pageSize={pageSize}
                           onChangePageClick={handleChangePageClick} portionSize={portionSize}
                           currentPage={currentPage}/>
            </div>
        )

    }
)


type MapStatePropsType = {
    isAuth: boolean
    items: Array<ItemsUsersResponseType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    itemsType: itemsT
}

type MapDispatchPropsType = {
   /* changePageThunk: (currentPage: number, pageSize: number, friends?: boolean) => void*/
    changePage : (currentPage: number)=>void
}

type UsersPropsType = MapDispatchPropsType & MapStatePropsType


let mapStateToProps = (state: stateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    items: state.UsersPage.items,
    pageSize: state.UsersPage.pageSize,
    totalUserCount: state.UsersPage.totalUserCount,
    currentPage: state.UsersPage.currentPage,
    isFetching: state.UsersPage.isFetching,
    itemsType: state.UsersPage.itemsType,
})


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, stateType>
    (mapStateToProps, {changePage}))(Users)