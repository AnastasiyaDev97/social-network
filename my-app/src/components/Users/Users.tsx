import s from "./User.module.css";
import React, {FC, memo, useCallback} from "react";
import {NavLink} from "react-router-dom";
import Paginator from "../../common/paginator/Paginator";
import {ItemsUsersResponseType} from "../../api/types";
import {PATH} from "../../enums/PATH";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";
import {changePageThunk, followThunk, itemsT, unfollowThunk} from "../../redux/reducer/user-reducer";
import {initialUserAvatar} from "../../const";
import Preloader from "../../common/preloader/Preloader";


const Users: FC<UsersPropsType> = memo(({
                                            items, pageSize, totalUserCount,isFetching,
                                            followingInProgress, followThunk, unfollowThunk, changePageThunk,
                                            isAuth,currentPage,itemsType,
                                        }) => {

    const portionSize = 10

    const handleChangePageClick = useCallback((currentPage: number) => {
        let friend
        if(itemsType==='friends'){
            friend=true
        }
        changePageThunk(currentPage, pageSize,friend)
    },[pageSize,itemsType,changePageThunk])

        if (isFetching) {
            return <Preloader/>
        }
    return (
        <div>

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
                        {isAuth &&
                        <button disabled={conditionForDisabledButton}
                                onClick={item.followed ? onUnfollowButtonClick : onFollowButtonClick}>
                            {item.followed ? 'Unfollow' : 'Follow'}</button>
                        }
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
                        </div>
                    )
                }
            )
            }
            <Paginator totalUserCount={totalUserCount} pageSize={pageSize}
                       onChangePageClick={handleChangePageClick} portionSize={portionSize}
                       currentPage={currentPage}/>
        </div>
    )

}
)


type MapStatePropsType = {
    isAuth:boolean
    items: Array<ItemsUsersResponseType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    followingInProgress: number[]
    isFetching: boolean
    itemsType:itemsT
}

type MapDispatchPropsType = {
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
    changePageThunk: (currentPage: number, pageSize: number,friends?:boolean) => void
}

type UsersPropsType = MapDispatchPropsType & MapStatePropsType


let mapStateToProps = (state: stateType): MapStatePropsType => ({
    isAuth:state.auth.isAuth,
    items: state.UsersPage.items,
    pageSize: state.UsersPage.pageSize,
    totalUserCount: state.UsersPage.totalUserCount,
    currentPage: state.UsersPage.currentPage,
    isFetching: state.UsersPage.isFetching,
    followingInProgress: state.UsersPage.followingInProgress,
    itemsType:state.UsersPage.itemsType,
})


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType,{} , stateType>
    (mapStateToProps, {followThunk, unfollowThunk, changePageThunk}))(Users)