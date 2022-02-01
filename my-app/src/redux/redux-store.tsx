import {applyMiddleware, combineReducers, createStore} from "redux";
import dialogReducer, {addMessage} from "./reducer/dialogs/dialog-reducer";
import profileReducer, {

    setAvatar,
    setStatus,
    setUserProfile
} from "./reducer/profile/profile-reducer";
import userReducer, {
    changePage,
    followUser, setTerm,
    setTotalUsersCount,
    setUsers, toggleFollowProgress,
    toggleIsFetching, toggleItemsType,
    unFollowUser
} from "./reducer/users/user-reducer";
import authReducer, {
    setCaptchaSuccess,
    setAuthUserData,
    setMyProfileData,
    toggleIsLoggedIn
} from "./reducer/auth/auth-reducer";
import ThunkMiddleware, {ThunkAction} from 'redux-thunk'
import appReducer, {setAppStatusAC, setInitialization} from "./reducer/app/app-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import postsReducer, {addPost, deletePost, dislikePost, likePost} from "./reducer/posts/posts-reducer";

let rootReducer = combineReducers({
    DialogsPage: dialogReducer,
    ProfilePage: profileReducer,
    UsersPage: userReducer,
    auth: authReducer,
    app: appReducer,
    posts:postsReducer,
})

export type stateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ThunkMiddleware)))

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
    | ReturnType<typeof setAvatar>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setCaptchaSuccess>
    | ReturnType<typeof toggleIsLoggedIn>
    | ReturnType<typeof toggleItemsType>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof likePost>
    | ReturnType<typeof dislikePost>
    | ReturnType<typeof setTerm>


export type ThunkType = ThunkAction<void, stateType, unknown, actionsType>

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