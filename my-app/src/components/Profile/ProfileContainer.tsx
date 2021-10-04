import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {postsDataType, profileDataUserType, stateType} from "../../redux/store";
import {Profile} from "./Profile";
import {setUserProfile} from "../../redux/reducer/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userId: string
}

class ProfileContainer extends React.Component<ProfilePropsType> {

    componentDidMount() {
        console.log(this.props)
        let userId=this.props.match.params.userId
        if (!userId){userId='19997'}
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(responce => {
                this.props.setUserProfile(responce.data)
                console.log(responce.data)
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

type ProfilePropsType = OwnProfilePropsType & RouteComponentProps<PathParamsType>
type OwnProfilePropsType = mapStateToPropsType & mapDispatchToPropsType
type mapStateToPropsType = {

    profile: profileDataUserType | null
}
type mapDispatchToPropsType = {
    setUserProfile: (profile: profileDataUserType | null) => void
}
let mapStateToProps = (state: stateType): mapStateToPropsType => ({
    profile: state.ProfilePage.profile,
})

let WithRoutProfileContainer = withRouter(ProfileContainer)
export default connect(mapStateToProps, {setUserProfile})(WithRoutProfileContainer)