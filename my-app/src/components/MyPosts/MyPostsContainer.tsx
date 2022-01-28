import {addPost, postsDataType, profileDataUserType} from "../../redux/reducer/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import {ComponentType} from "react";



let mapStateToProps = (state: stateType) => ({
    posts: state.ProfilePage.postsData,
    profile: state.ProfilePage.profile,

})
type mapStateToPropsT = {
    posts: Array<postsDataType>
    profile: profileDataUserType
}

type mapDispatchToPropsT = {
    addPost: (newPostText: string) => void
}

export type MyPostsPropsT = mapStateToPropsT & mapDispatchToPropsT

export default compose<ComponentType>(
    connect(mapStateToProps, {addPost}))(MyPosts)