import {combineReducers, createStore} from "redux";
import dialogReducer from "./reducer/dialog-reducer";
import profileReducer from "./reducer/profile-reducer";
import sidebarReducer from "./reducer/sidebar-reducer";
import userReducer from "./reducer/user-reducer";
import authReducer from "./reducer/auth-reducer";

let reducers=combineReducers({
    DialogsPage:dialogReducer,
    ProfilePage:profileReducer,
    sidebarPage:sidebarReducer,
    UsersPage:userReducer,
    auth:authReducer,
})

export let store = createStore(reducers)