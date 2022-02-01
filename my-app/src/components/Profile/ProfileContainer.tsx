import React, {ComponentType, PureComponent} from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {
    profileDataUserType,

} from "../../redux/reducer/profile/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import {Nullable} from "../../types/Nullable";
import {PATH} from "../../enums/PATH";
import {itemsT, toggleItemsType} from "../../redux/reducer/users/user-reducer";
import {
    getUserProfile,
    getUserStatus,
    saveProfileAvatar,
    updateProfile,
    updateUserStatus
} from "../../redux/reducer/profile/thunk";
import {getUsersThunk} from "../../redux/reducer/users/thunk";

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
            this.props.toggleItemsType('friends')
            this.props.getUsersThunk(/*1,PAGE_SIZE,true*/)
        }
        if (!userId && !this.props.isAuth) {
            this.props.history.push(PATH.LOGIN)
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)

    }

    render() {
        return (
            <Profile  profile={this.props.profile} userId={this.props.match.params.userId}/>
        );
    }
}

type ProfilePropsType = OwnProfilePropsType & RouteComponentProps<PathParamsType>
type OwnProfilePropsType = mapStateToPropsType & mapDispatchToPropsType
type mapStateToPropsType = {
    isAuth: boolean
    userIdAuth: Nullable<number>
    profile: profileDataUserType
}
type mapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    getUsersThunk: (/*currentPage:number, pageSize: number,friend?:boolean*/) => void
    toggleItemsType : (itemsType: itemsT)=>void

}
let mapStateToProps = (state: stateType): mapStateToPropsType => ({
    userIdAuth: state.auth.data.id,
    isAuth: state.auth.isAuth,
    profile: state.ProfilePage.profile,
})

export default compose<ComponentType>(
    connect(mapStateToProps, {
        getUserProfile, getUserStatus, updateUserStatus, saveProfileAvatar,
        updateProfile, getUsersThunk,toggleItemsType
    }),
    withRouter)(ProfileContainer)


