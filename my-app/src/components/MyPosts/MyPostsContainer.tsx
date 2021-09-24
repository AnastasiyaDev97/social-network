import React from 'react';
import {addPostAC, changeTextAC} from "../../redux/reducer/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {actionsType, stateType} from "../../redux/store";



let mapStateToProps = (state: stateType) => {
    return {
        posts: state.ProfilePage.postsData,
        newPostText: state.ProfilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: (action: actionsType) => void) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        },
        changePost: (text: string) => {
            dispatch(changeTextAC(text))
        }
    }
}

export let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)