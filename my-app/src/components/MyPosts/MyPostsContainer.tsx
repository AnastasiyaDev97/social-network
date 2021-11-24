import {addPost} from "../../redux/reducer/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {withRedirect} from "../../hoc/withRedirect";
import {compose} from "redux";

let mapStateToProps = (state: stateType) => {
    return {
        posts: state.ProfilePage.postsData,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {addPost}),
    withRedirect)(MyPosts)