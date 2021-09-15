import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {News} from "./components/News/News";
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';
import { stateType, storeType} from "./redux/state";

type AppPropsType = {
    state: stateType
    store:storeType
}

function App(props: AppPropsType) {
    return (
        <BrowserRouter>
            <div className='appWrapper'>
                <Header/>
                <NavBar/>
                <div className='appWrapperContent'>
                    <Route path='/profile'
                           render={() => <Profile posts={props.state.ProfilePage.postsData}
                                                  dispatch={props.store.dispatch.bind(props.store)}
                                                  newPostText={props.state.ProfilePage.newPostText}/>}/>
                    <Route path='/dialogs' render={() => <Dialogs messages={props.state.DialogsPage.messageData}
                                                                  dialogs={props.state.DialogsPage.dialogsData}
                                                                  dispatch={props.store.dispatch.bind(props.store)}
                                                                  newMessageText={props.state.DialogsPage.newMessageText}/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
