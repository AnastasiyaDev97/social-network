import {combineReducers, createStore} from "redux";
import dialogReducer from "./reducer/dialog-reducer";
import profileReducer from "./reducer/profile-reducer";
import sidebarReducer from "./reducer/sidebar-reducer";

let reducers=combineReducers({
    DialogsPage:dialogReducer,
    ProfilePage:profileReducer,
    sidebarPage:sidebarReducer
})

export let store = createStore(reducers)