import {addPost} from "../../redux/reducer/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import {ComponentType} from "react";

let mapStateToProps = (state: stateType) => ({
        posts: state.ProfilePage.postsData,
})

export default compose<ComponentType>(
    connect(mapStateToProps, {addPost}))(MyPosts)