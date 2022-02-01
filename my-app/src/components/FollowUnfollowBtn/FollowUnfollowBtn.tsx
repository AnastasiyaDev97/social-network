import SuperButton from "../SuperButton/SuperButton";
import React, {FC, memo} from "react";
import {ItemsUsersResponseType} from "../../api/types";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {followThunk, unfollowThunk} from "../../redux/reducer/users/thunk";


const FollowUnfollowBtn: FC<FollowUnfollowBtnPropsType> = memo(({
                                                                    item, followingInProgress, unfollowThunk,
                                                                    followThunk
                                                                }) => {

    const conditionForDisabledButton = followingInProgress.some(id => id === item.id)


    const onUnfollowButtonClick = () => {
        unfollowThunk(item.id)
    }

    const onFollowButtonClick = () => {
        followThunk(item.id)
    }


    return (
        <SuperButton disabled={conditionForDisabledButton}
                     onClick={item.followed ? onUnfollowButtonClick : onFollowButtonClick}>
            {item.followed ? 'Unfollow' : 'Follow'}</SuperButton>
    )
})


type FollowUnfollowBtnPropsType = MapDispatchPropsType & MapStateToPropsType & OwnPropsT

type MapStateToPropsType = {
    followingInProgress: number[]
}
type OwnPropsT = {
    item: ItemsUsersResponseType
}

let mapStateToProps = (state: stateType, ownProps: OwnPropsT) => ({
    followingInProgress: state.UsersPage.followingInProgress,
    item: ownProps.item
})

type MapDispatchPropsType = {
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
}

export default connect<MapStateToPropsType, MapDispatchPropsType, OwnPropsT, stateType>
(mapStateToProps, {followThunk, unfollowThunk})(FollowUnfollowBtn)