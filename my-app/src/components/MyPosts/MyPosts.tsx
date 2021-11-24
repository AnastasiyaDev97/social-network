import React from 'react';
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postsDataType} from "../../redux/reducer/profile-reducer";

import  {Field,InjectedFormProps, reduxForm} from "redux-form";



type MyPostsPropsType = {
    posts: Array<postsDataType>
    newPostText: string
    addPost: (newPostText: string) => void
    changePost: (text: string) => void
}

export const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map(m => <Post message={m.message} likesCount={m.likes}/>)
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
        props.addPost(formData.newPost)
    }
    return (
        <div className={s.myPosts}>
            <h3>My posts</h3>
            <MyPostReduxForm onSubmit={onSubmit} />
            {postsElements}
        </div>

    )
}


type FormDataType = {
    newPost: string
}


export const MyPostForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  component={'textarea'} name={'newPost'}/>
            </div>
            <div>
                <button >Add post</button>
            </div>
        </form>
        )}

const MyPostReduxForm=reduxForm<FormDataType>({form: 'newPost'})(MyPostForm)
