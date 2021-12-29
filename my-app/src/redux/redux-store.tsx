import {applyMiddleware, combineReducers, createStore} from "redux";
import dialogReducer, {addMessage} from "./reducer/dialog-reducer";
import {reducer as formReducer} from 'redux-form'
import profileReducer, {addPost, setStatus, setUserProfile} from "./reducer/profile-reducer";
import sidebarReducer from "./reducer/sidebar-reducer";
import userReducer, {
    changePage,
    followUser,
    setTotalUsersCount,
    setUsers, toggleFollowProgress,
    toggleIsFetching,
    unFollowUser
} from "./reducer/user-reducer";
import authReducer, {setAuthUserData, setMyProfileData} from "./reducer/auth-reducer";
import ThunkMiddleware from 'redux-thunk'
import appReducer, {setInitialization} from "./reducer/app-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';

let reducers = combineReducers({
    DialogsPage: dialogReducer,
    ProfilePage: profileReducer,
    sidebarPage: sidebarReducer,
    UsersPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

export type stateType = ReturnType<typeof reducers>

export let store = createStore(reducers, composeWithDevTools(applyMiddleware(ThunkMiddleware)))

export type actionsType =
    ReturnType<typeof addPost>
    | ReturnType<typeof addMessage>
    | ReturnType<typeof followUser>
    | ReturnType<typeof unFollowUser>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof changePage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof toggleFollowProgress>
    | ReturnType<typeof setMyProfileData>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setInitialization>


/*
export type storeType = {
    _state: stateType
    subscribe: (observer: () => void) => void
    _callSubscriber: () => void
    getState: () => stateType
    dispatch: (action: actionsType) => void
}*/

// @ts-ignore
window.store = store