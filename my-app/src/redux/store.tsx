import profileReducer, {addPostAC, changeTextAC} from "./reducer/profile-reducer";
import dialogReducer, {addMessageAC, changeMessageAC} from "./reducer/dialog-reducer";
import sidebarReducer from "./reducer/sidebar-reducer";
import {v1} from "uuid";
import userReducer, {followUserAC, setUsersAC, unFollowUserAC} from "./reducer/user-reducer";

export type dialogsDataType = {
    id: string
    user: string
}
export type messageDataType = {
    id: string
    textMessage: string
}
export type postsDataType = {
    id: string
    message: string
    likes: number
}
export type usersDataType = {
    id: number
    photoUrl:string
    name: string
    followed: boolean
    status: string
    location: {
        city: string
        country: string
    }
}
export type DialogsPageType = {
    dialogsData: Array<dialogsDataType>
    messageData: Array<messageDataType>
    newMessageText: string

}
export type ProfilePageType = {
    postsData: Array<postsDataType>
    newPostText: string
}
export type UsersPageType = {
    usersData: Array<usersDataType>
}
export type sidebarPageType = {
    sidebarData: sidebarDataType
}


export type stateType = {
    DialogsPage: DialogsPageType
    ProfilePage: ProfilePageType
    sidebarPage: sidebarPageType
    UsersPage: UsersPageType
}
export type sidebarDataType = {}
export type storeType = {
    _state: stateType
    subscribe: (observer: () => void) => void
    _callSubscriber: () => void
    getState: () => stateType
    dispatch: (action: actionsType) => void
}

export type actionsType =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof changeTextAC>
    | ReturnType<typeof changeMessageAC>
    | ReturnType<typeof followUserAC>
    | ReturnType<typeof unFollowUserAC>
    | ReturnType<typeof setUsersAC>


/*export let store: storeType = {
    _state: {
        DialogsPage: {
            dialogsData: [{id: v1(), user: 'Nastya'},
                {id: v1(), user: 'Dima'},
                {id: v1(), user: 'Victor'}],
            messageData: [{id: v1(), textMessage: 'yo'},
                {id: v1(), textMessage: 'konichiwa'}],
            newMessageText: ''
        },
        ProfilePage: {
            postsData: [
                {id: v1(), message: 'it is my first post', likes: 30},
                {id: v1(), message: 'it-kamasutra', likes: 10}],
            newPostText: ''
        },
        sidebarPage: {
            sidebarData: []
        },
        UsersPage: {
            usersData: [
                {
                    id: 1, name: 'Nastya', followed: true, status: 'student',
                    location: {city: 'Minsk', country: 'Belarus'},
                },
                {
                    id: 2, name: 'Dima', followed: true, status: 'kitty',
                    location: {city: 'Minsk', country: 'Belarus'},
                },
                {
                    id: 3, name: 'Olya', followed: false, status: 'sister',
                    location: {city: 'Mogilev', country: 'Belarus'},
                },
            ],
        }
    },
    //меняют state

    dispatch(action: actionsType) {
        this._state.ProfilePage = profileReducer(this._state.ProfilePage, action);
        this._state.DialogsPage = dialogReducer(this._state.DialogsPage, action)
        this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action)
       /!* this._state.UsersPage = userReducer(this._state.UsersPage, action)*!/
        this._callSubscriber()
    },

    //не меняют state
    getState() {
        return this._state
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer
    },


    _callSubscriber() {                     //rerender
        console.log('state changed')
    }
}*/

