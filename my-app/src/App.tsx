import React, {PureComponent} from 'react';
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
import {PATH} from "./enums/PATH";

type AppPropsType = mapStateToPropsType & mapDispatchToPropsType

class App extends PureComponent<AppPropsType> {

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
                    <Route path={PATH.DIALOGS} render={() => <DialogsContainer/>}/>
                    <Route path={PATH.NEWS} render={() => <News/>}/>
                    <Route path={PATH.USERS} render={() => <UsersContainer/>}/>
                    <Route path={PATH.MUSIC} render={() => <Music/>}/>
                    <Route path={PATH.SETTINGS} render={() => <Settings/>}/>
                    <Route path={PATH.LOGIN} render={() => <LoginContainer/>}/>
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
