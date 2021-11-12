import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {
    getUserProfile,
     profileDataUserType,
} from "../../redux/reducer/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import { stateType} from "../../redux/redux-store";

type PathParamsType = {
    userId: string
}

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.userIdAuth?.toString()||'19997'
        }
        this.props.getUserProfile(userId)
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
    userIdAuth:number|null
}
type mapDispatchToPropsType = {
    getUserProfile:(userId:string)=>any
}
let mapStateToProps = (state: stateType): mapStateToPropsType => ({
    profile: state.ProfilePage.profile,
    userIdAuth:state.auth.data.id,
})

let WithRoutProfileContainer = withRouter(ProfileContainer)
export default connect(mapStateToProps, {getUserProfile})(WithRoutProfileContainer)