import React from 'react';
import style from './NavBar.module.css'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {PATH} from "../../enums/PATH";
import {Nullable} from "../../types/Nullable";


type NavBarPropsType = mapStateToPropsType
const NavBar = (props: NavBarPropsType) => {
    if (props.authId) {

    }
    return (

        <nav className={style.navBar}>
            <div className={style.item}>
                <NavLink activeClassName={style.active} to={PATH.PROFILE}>Profile</NavLink></div>
            <div className={style.item}>
                <NavLink activeClassName={style.active} to={PATH.DIALOGS}>Dialogs</NavLink></div>
            <div className={style.item}>
                <NavLink activeClassName={style.active} to={PATH.USERS}>Users</NavLink></div>
            <div className={style.item}>
                <NavLink activeClassName={style.active} to={PATH.NEWS}>News</NavLink></div>
            <div className={style.item}>
                <NavLink activeClassName={style.active} to={PATH.MUSIC}>Music</NavLink></div>
            <div className={style.item}>
                <NavLink activeClassName={style.active} to={PATH.SETTINGS}>Settings</NavLink></div>
        </nav>

    )
}
type mapStateToPropsType = {
    authId: Nullable<number>
}
let mapStateToProps = (state: stateType) => ({
    authId: state.auth.data.id
})

export default connect(mapStateToProps, {})(NavBar)