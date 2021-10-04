import profileReducer, {addPostAC, changeTextAC, setUserProfile} from "./reducer/profile-reducer";
import dialogReducer, {addMessageAC, changeMessageAC} from "./reducer/dialog-reducer";
import {
    changePage,
    followUser,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unFollowUser
} from "./reducer/user-reducer";


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
    photos: {
        large: string
        small: string
    }
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
    profile: profileDataUserType
}
export type profileDataUserType = null | {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}
export type ContactsType={
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
type PhotosType={
    small: string
    large: string
}
export type UsersPageType = {
    items: Array<usersDataType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
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
    | ReturnType<typeof followUser>
    | ReturnType<typeof unFollowUser>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof changePage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>


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

