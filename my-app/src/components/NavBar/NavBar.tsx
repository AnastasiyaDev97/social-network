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
                <div className={s.item}><NavLink activeClassName={s.activemmm} to='/profile'>Profile</NavLink></div>
                <div className={s.item}><NavLink activeClassName={s.activemmm} to='/dialogs'>Dialogs</NavLink></div>
                <div className={s.item}><NavLink activeClassName={s.activemmm} to='/news'>News</NavLink></div>
                <div className={s.item}><NavLink activeClassName={s.activemmm} to='/music'>Music</NavLink></div>
                <div className={s.item}><NavLink activeClassName={s.activemmm} to='/settings'>Settings</NavLink></div>
            </nav>

    )
}