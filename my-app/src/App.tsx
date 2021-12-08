import React from 'react';
import './App.css';

import {News} from "./components/News/News";
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {Route} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UsersContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {stateType} from "./redux/redux-store";

import {Initialize} from "./redux/reducer/app-reducer";
import Preloader from "./common/preloader/Preloader";
import NavBar from "./components/NavBar/NavBar";

type AppPropsType = mapStateToPropsType & mapDispatchToPropsType

class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.Initialize()
    }

    render() {
        if (!this.props.isInitialization) {
            return <Preloader/>
        }
        return (
            <div className='appWrapper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='appWrapperContent'>
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                </div>
            </div>
        );

    }
}

let mapStateToProps = (state: stateType) => ({
    isInitialization: state.app.isInitialization
})
type mapStateToPropsType = {
    isInitialization: boolean
}
type mapDispatchToPropsType = {
    Initialize: () => void
}

export default connect<mapStateToPropsType, mapDispatchToPropsType, {}, stateType>
(mapStateToProps, {Initialize})(App);
