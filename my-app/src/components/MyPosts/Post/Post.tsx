import React, {FC, memo} from 'react';
import style from './Post.module.scss'
import {NavLink} from "react-router-dom";
import {PATH} from "../../../enums/PATH";
import {initialUserAvatar} from "../../../const";
import like from './../../../assets/like.svg'


type PostPropsType = {
    message: string
    likesCount: number
    date: string | number
    fullName: string
    id: string
    email: string
    photo: string
    deletePost: (id: string) => void
    likePost: (id: string) => void
    isLiked:boolean
    dislikePost: (id: string) => void
}

export const Post: FC<PostPropsType> = memo(({
                                                 message, likesCount, date, fullName,
                                                 email, photo, id, deletePost,likePost,isLiked,dislikePost
                                             }) => {

        /*const [isSettingsShow, setIsSettingsShow] = useState(false)*/

        const srcForAvatar = photo || initialUserAvatar

       /* const onSettingsBtnClick = () => {
            setIsSettingsShow(true)
        }

        const onSettingsMouseLeave = () => setIsSettingsShow(false)*/

        const onDeleteLiClick = () => {
            deletePost(id)
        }

        const onLikeIconClick=()=>{
            if(isLiked)
            dislikePost(id)
            else likePost(id)
        }

        return (
            <div className={style.postWrapper}>
                <div className={style.myPosts}>
                    <div className={style.leftBlock}>
                        <NavLink to={PATH.PROFILE}>
                            <img src={srcForAvatar} alt='avatar' className={style.avatar}/>
                        </NavLink>

                        <NavLink to={PATH.PROFILE} className={style.nameLink}>
                            <h6 className={style.name}>{fullName}</h6>
                            <small className={style.email}>{email}</small>
                        </NavLink>
                    </div>

                    <div className={style.dateSettingsBlock}>
                        <p className={style.date}>{date}</p>
                        <div className={style.settingsBtn} onClick={onDeleteLiClick}>
                           {/* {isSettingsShow && <ul className={style.settingsBlock}
                                                   onMouseLeave={onSettingsMouseLeave}>
                                  <li onClick={onEditLiClick}>Edit Post</li>
                                <li onClick={onDeleteLiClick}>Delete Post</li>
                            </ul>
                            }*/}
                        </div>
                    </div>
                </div>

                <div className={style.postBlock}>
                    <div className={style.postText}>
                        {message}
                    </div>
                    <div className={style.likeBlock}>
                        {likesCount}<img src={like} className={style.likeIcon} alt='like' onClick={onLikeIconClick}/>
                    </div>
                </div>
            </div>
        )
    }
)