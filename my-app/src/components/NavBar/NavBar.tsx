import React from 'react';
import s from './NavBar.module.css'
import {NavLink} from 'react-router-dom'
import {Dialogs} from "../Dialogs/Dialogs";
import {Profile} from "../Profile/Profile";
type NavBarPropsType = {

}
export const NavBar = (props:NavBarPropsType)=>{
    return (

            <nav className={s.navBar}>
                <div className={s.item}><NavLink activeClassName={s.active} to='/profile'>Profile</NavLink></div>
                <div className={s.item}><NavLink activeClassName={s.active} to='/dialogs'>Dialogs</NavLink></div>
                <div className={s.item}><NavLink activeClassName={s.active} to='/users'>Users</NavLink></div>
                <div className={s.item}><NavLink activeClassName={s.active} to='/news'>News</NavLink></div>
                <div className={s.item}><NavLink activeClassName={s.active} to='/music'>Music</NavLink></div>
                <div className={s.item}><NavLink activeClassName={s.active} to='/settings'>Settings</NavLink></div>
            </nav>

    )
}