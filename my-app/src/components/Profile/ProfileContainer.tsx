import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {
    getUserProfile, getUserStatus,
    profileDataUserType, saveProfileAvatar, updateUserStatus,
} from "../../redux/reducer/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import {Nullable} from "../../types/Nullable";
import {PATH} from "../../enums/PATH";

type PathParamsType = {
    userId: string
}

class ProfileContainer extends PureComponent<ProfilePropsType> {

    componentDidMount() {
        this.refresh()
    }

    componentDidUpdate(prevProps: Readonly<ProfilePropsType>, prevState: Readonly<{}>) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refresh()
        }
    }

    refresh = () => {
        let userId = this.props.match.params.userId
        if (!userId && this.props.isAuth && this.props.userIdAuth) {
            userId = this.props.userIdAuth.toString()
        }
        if (!userId) {
            this.props.history.push(PATH.LOGIN)
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
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
}
type mapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
    saveProfileAvatar: (newAvatar: File) => void
}
let mapStateToProps = (state: stateType): mapStateToPropsType => ({
    profile: state.ProfilePage.profile,
    userIdAuth: state.auth.data.id,
    status: state.ProfilePage.status,
    isAuth: state.auth.isAuth,

})
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, saveProfileAvatar}),
    withRouter)(ProfileContainer)


