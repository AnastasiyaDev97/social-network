import React from 'react';
import './App.css';
import {NavBar} from "./components/NavBar/NavBar";
import {News} from "./components/News/News";
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';
import {stateType, storeType} from "./redux/store";
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {UsersContainer} from "./components/Users/UsersContainer";
import WithRoutProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

type AppPropsType = {
    state: stateType
    store: any
}

function App() {
    return (
        <BrowserRouter>
            <div className='appWrapper'>
                <HeaderContainer/>
                <NavBar/>
                <div className='appWrapperContent'>
                    <Route path='/profile/:userId?'
                           render={() => <WithRoutProfileContainer/>}/>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
