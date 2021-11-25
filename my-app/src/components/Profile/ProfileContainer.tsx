import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {
    getUserProfile, getUserStatus,
    profileDataUserType, updateUserStatus,
} from "../../redux/reducer/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";

type PathParamsType = {
    userId: string
}

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
debugger
        let userId = this.props.match.params.userId
        if (!userId && this.props.isAuth) {
            debugger
            // @ts-ignore
            userId= this.props.userIdAuth.toString()}
            if(!userId){
                debugger
                this.props.history.push('/login')
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

    profile: profileDataUserType | null
    userIdAuth: number| null
    status: string
    isAuth:boolean
}
type mapDispatchToPropsType = {
    getUserProfile: (userId: string) => any
    getUserStatus: (userId: string) => any
    updateUserStatus: (status: string) => any
}
let mapStateToProps = (state: stateType): mapStateToPropsType => ({
    profile: state.ProfilePage.profile,
    userIdAuth: state.auth.data.id,
    status: state.ProfilePage.status,
    isAuth:state.auth.isAuth,

})
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus,updateUserStatus}),
    withRouter)(ProfileContainer)


