import {addPost, changePost} from "../../redux/reducer/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {withRedirect} from "../../hoc/withRedirect";

let mapStateToProps = (state: stateType) => {
    return {
        posts: state.ProfilePage.postsData,
        newPostText: state.ProfilePage.newPostText,
    }
}

export default  withRedirect( connect(mapStateToProps, {addPost, changePost})(MyPosts))