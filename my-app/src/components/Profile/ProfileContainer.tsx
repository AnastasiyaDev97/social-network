import React, {ComponentType, PureComponent} from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {
    getUserProfile, getUserStatus,
    profileDataUserType, saveProfileAvatar, updateProfile, updateProfileThunkT, updateUserStatus,
} from "../../redux/reducer/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import {Nullable} from "../../types/Nullable";
import {PATH} from "../../enums/PATH";
import {ItemsUsersResponseType} from "../../api/types";
import {getUsersThunk, toggleUsersType} from "../../redux/reducer/user-reducer";

type PathParamsType = {
    userId: string
}

class ProfileContainer extends PureComponent<ProfilePropsType> {

    componentDidMount() {
        this.refresh()
    }

    componentDidUpdate(prevProps: Readonly<ProfilePropsType>, prevState: Readonly<{}>) {
        if ((prevProps.match.params.userId !== this.props.match.params.userId) ||
            (prevProps.isAuth !== this.props.isAuth)) {
            this.refresh()
        }
    }

    refresh = () => {
        let userId = this.props.match.params.userId
        if (!userId && this.props.isAuth && this.props.userIdAuth) {

            userId = this.props.userIdAuth.toString()

        }
        if (!userId && !this.props.isAuth) {
            this.props.history.push(PATH.LOGIN)
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
        this.props.getUsersThunk(5, 1, true)

    }

    render() {
        return (
            <Profile {...this.props}/>
        );
    }
}

type ProfilePropsType = OwnProfilePropsType & RouteComponentProps<PathParamsType>
type OwnProfilePropsType = mapStateToPropsType & mapDispatchToPropsType
type mapStateToPropsType = {

    profile: profileDataUserType
    userIdAuth: Nullable<number>
    status: string
    isAuth: boolean
    users: Array<ItemsUsersResponseType>
}
type mapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
    saveProfileAvatar: (newAvatar: File) => void
    updateProfile: (updateProfile: updateProfileThunkT) => void
    getUsersThunk: (currentPage: number, pageSize: number, friend?: boolean) => void
    toggleUsersType:(usersType: string)=>void

}
let mapStateToProps = (state: stateType): mapStateToPropsType => {
    return ({
        profile: state.ProfilePage.profile,
        userIdAuth: state.auth.data.id,
        status: state.ProfilePage.status,
        isAuth: state.auth.isAuth,
        users: state.UsersPage.items,

    })
}
export default compose<ComponentType>(
    connect(mapStateToProps, {
        getUserProfile, getUserStatus, updateUserStatus, saveProfileAvatar,
        updateProfile, getUsersThunk,toggleUsersType
    }),
    withRouter)(ProfileContainer)


