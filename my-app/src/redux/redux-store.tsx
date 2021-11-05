import {combineReducers, createStore} from "redux";
import dialogReducer, {addMessage, changeMessage} from "./reducer/dialog-reducer";
import profileReducer, {addPost, changePost, setUserProfile} from "./reducer/profile-reducer";
import sidebarReducer from "./reducer/sidebar-reducer";
import userReducer, {
    changePage,
    followUser,
    setTotalUsersCount,
    setUsers, toggleFollowProgress,
    toggleIsFetching,
    unFollowUser
} from "./reducer/user-reducer";
import authReducer, {setAuthUserData} from "./reducer/auth-reducer";

let reducers=combineReducers({
    DialogsPage:dialogReducer,
    ProfilePage:profileReducer,
    sidebarPage:sidebarReducer,
    UsersPage:userReducer,
    auth:authReducer,
})

export type stateType=ReturnType<typeof reducers>

export let store = createStore(reducers)

export type actionsType =
    ReturnType<typeof addPost>
    | ReturnType<typeof addMessage>
    | ReturnType<typeof changePost>
    | ReturnType<typeof changeMessage>
    | ReturnType<typeof followUser>
    | ReturnType<typeof unFollowUser>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof changePage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof toggleFollowProgress>


/*
export type storeType = {
    _state: stateType
    subscribe: (observer: () => void) => void
    _callSubscriber: () => void
    getState: () => stateType
    dispatch: (action: actionsType) => void
}*/