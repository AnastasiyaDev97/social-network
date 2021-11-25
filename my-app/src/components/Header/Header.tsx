import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css'


type HeaderPropsType = {
    login: string|null
    isAuth: boolean
    logoutThunk:()=>any
}
export const Header = (props: HeaderPropsType) => {
    return (

        <header className={s.header}>
            <div className={s.loginBlock}>{props.isAuth ? <div>{props.login}
            <button onClick={props.logoutThunk}>logout</button></div>
                : <NavLink to={'/login'}>login</NavLink>}
               </div>

        </header>

    )
}