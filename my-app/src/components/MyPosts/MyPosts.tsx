import React, {FC, memo} from 'react';
import style from './MyPosts.module.scss'
import {Post} from "./Post/Post";
import {postsDataType, profileDataUserType} from "../../redux/reducer/profile-reducer";
import {useFormik} from "formik";
import {EMPTY_STRING, initialUserAvatar} from "../../const";

import {PATH} from "../../enums/PATH";
import { NavLink } from 'react-router-dom';



type MyPostsPropsType = {
    posts: Array<postsDataType>
    addPost: (newPostText: string) => void
    profile: profileDataUserType
    name:string
    photo:string
}

export const MyPosts:FC<MyPostsPropsType> = memo(({posts,addPost,profile}) => {

    let postsElements = posts.map(({message,likes}) => <Post message={message} likesCount={likes}/>)
    const srcForAvatar=profile.photos.small||initialUserAvatar



    const formik = useFormik({
        initialValues: {
            newPost: EMPTY_STRING
        },

        onSubmit: values => {
            addPost(values.newPost)
            formik.resetForm()
        },
    })

    return (
        <div className={style.myPosts}>
            <NavLink to={PATH.PROFILE}>
            <img src={srcForAvatar} alt='avatar' className={style.avatar} />
            </NavLink>
            <div className={style.postBlock}></div>
            <h3>My posts</h3>

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <textarea placeholder={'add post'} {...formik.getFieldProps('newPost')}/>
                </div>
                <div>
                    <button >Add post</button>
                </div>
            </form>

            {postsElements}
        </div>
    )
})

