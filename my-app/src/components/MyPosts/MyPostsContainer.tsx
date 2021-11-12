import {addPost, changePost} from "../../redux/reducer/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import { stateType} from "../../redux/redux-store";



let mapStateToProps = (state: stateType) => {
    return {
        posts: state.ProfilePage.postsData,
        newPostText: state.ProfilePage.newPostText,
        isAuth:state.auth.isAuth,
    }
}

export let MyPostsContainer = connect(mapStateToProps, {addPost,changePost})(MyPosts)