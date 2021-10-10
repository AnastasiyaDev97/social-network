import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Header.module.css'

type HeaderPropsType = {
    login: string
    isAuth: boolean
}
export const Header = (props: HeaderPropsType) => {
    return (

        <header className={s.header}><img src='IMG-317fc6bd3835eddb1eae7ef04c5e395e-V.jpg'/>
            <span className={s.loginBlock}>{props.isAuth ? props.login
                : <NavLink to={'/login'}>login</NavLink>}
               </span>

        </header>

    )
}