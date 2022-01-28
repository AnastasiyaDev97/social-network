import { profileDataUserType} from "../../redux/reducer/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import {ComponentType} from "react";
import {addPost, deletePost, dislikePost, likePost, postsDataType} from "../../redux/reducer/posts-reducer";


let mapStateToProps = (state: stateType) => ({
    postsData: state.posts.postsData,
    profile: state.ProfilePage.profile,
    email: state.auth.data.email,

})
type mapStateToPropsT = {
    postsData: Array<postsDataType>
    profile: profileDataUserType
    email: string
}

type mapDispatchToPropsT = {
    addPost: (newPostText: string) => void
    deletePost: (id: string) => void
    likePost: (id: string) => void
    dislikePost : (id: string) =>void
}

export type MyPostsPropsT = mapStateToPropsT & mapDispatchToPropsT

export default compose<ComponentType>(
    connect(mapStateToProps, {addPost, deletePost,likePost,dislikePost}))(MyPosts)