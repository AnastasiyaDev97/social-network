import React, {FC, memo} from 'react';
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postsDataType} from "../../redux/reducer/profile-reducer";
import {useFormik} from "formik";
import {EMPTY_STRING} from "../../const";



type MyPostsPropsType = {
    posts: Array<postsDataType>
    addPost: (newPostText: string) => void
}

export const MyPosts:FC<MyPostsPropsType> = memo(({posts,addPost}) => {
    let postsElements = posts.map(({message,likes}) => <Post message={message} likesCount={likes}/>)

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
        <div className={s.myPosts}>
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

