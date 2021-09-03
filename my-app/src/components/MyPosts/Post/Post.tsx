import React from 'react';
import s from './Post.module.css'

type PostPropsType = {
    message: string
    likesCount:number
}

export const Post = (props: PostPropsType) => {
    return (
        <div>
            <div className={s.postItem}>
                <img src=''/>
                {props.message}
            </div>
            <div>
                <span>like {props.likesCount}</span>
            </div>

        </div>
    )
}
