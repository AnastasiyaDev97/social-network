import React, {FC, memo} from 'react';
import s from './Post.module.css'

type PostPropsType = {
    message: string
    likesCount: number
}

export const Post: FC<PostPropsType> = memo(({message,likesCount}) => {
        return (
            <div>
                <div className={s.postItem}>
                    <img src=''/>
                    {message}
                </div>
                <div>
                    <span>like {likesCount}</span>
                </div>

            </div>
        )
    }
)