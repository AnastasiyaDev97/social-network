import React from 'react';
import s from './NavBar.module.css'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";

type NavBarPropsType = mapStateToPropsType
const NavBar = (props:NavBarPropsType)=>{
    if(props.authId){

    }
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
type mapStateToPropsType={
    authId:number | null
}
let mapStateToProps=(state:stateType)=>({
    authId:state.auth.data.id
})

export default connect (mapStateToProps,{})(NavBar)