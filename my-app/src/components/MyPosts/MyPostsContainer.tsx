import {addPost, postsDataType, profileDataUserType} from "../../redux/reducer/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import React, {ComponentType} from "react";


/*class MyPostsContainer extends PureComponent<MyPostsPropsT> {
    constructor(props: MyPostsPropsT) {
        super(props);
        /!*this.props= props;*!/
    }

    render() {
        return (
            <MyPosts {...this.props}/>
        );
    }
}*/

let mapStateToProps = (state: stateType) => ({
    posts: state.ProfilePage.postsData,
    /*profile: state.ProfilePage.profile,*/

})
type mapStateToPropsT = {
    posts: postsDataType
    profile: profileDataUserType

}
type mapDispatchToPropsT = {
    addPost: (newPostText: string) => void
}
type ownPropsT = {
    photo: string
    name: string
}
type MyPostsPropsT = mapStateToPropsT & mapDispatchToPropsT & ownPropsT

export default compose<ComponentType>(
    connect(mapStateToProps, {addPost}))(MyPosts)