import React, {FC, memo} from 'react';
import {NavLink} from 'react-router-dom';
import style from './Header.module.css'
import {Nullable} from "../../types/Nullable";
import {PATH} from "../../enums/PATH";


type HeaderPropsType = {
    login: Nullable<string>
    isAuth: boolean
    logoutThunk: () => void
}
export const Header: FC<HeaderPropsType> = memo(({login, isAuth, logoutThunk}) => {

    return (

        <header className={style.header}>
            <div className={style.loginBlock}>

                {isAuth
                    ? <div>{login}
                        <button onClick={logoutThunk}>logout</button>
                    </div>

                    : <NavLink to={PATH.LOGIN}>login</NavLink>
                }

            </div>
        </header>

    )
})