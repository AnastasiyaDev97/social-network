import React from 'react';
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postsDataType} from "../../redux/reducer/profile-reducer";

import  {Field,InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../common/utils/validators";
import { Textarea} from "../FormsControl/FormsControl";



type MyPostsPropsType = {
    posts: Array<postsDataType>
    newPostText: string
    addPost: (newPostText: string) => void
    changePost: (text: string) => void
}

export const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map(m => <Post message={m.message} likesCount={m.likes}/>)
    const onSubmit = (formData: FormDataType) => {
        props.addPost(formData.newPost)
        formData.newPost=''
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

const maxLength70=maxLengthCreator(70)

export const MyPostForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  component={Textarea} name={'newPost'} validate={[required,maxLength70]}
                        type={'textarea'} placeholoder={'add post'}>textarea</Field>
            </div>
            <div>
                <button >Add post</button>
            </div>
        </form>
        )}

const MyPostReduxForm=reduxForm<FormDataType>({form: 'newPost'})(MyPostForm)
