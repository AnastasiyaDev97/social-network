let rerender=()=>{
    console.log('state changed')
}


export type dialogsDataType = {
    id: number
    user: string
}
export type messageDataType = {
    id: number
    textMessage: string
}

export type postsDataType = {
    id: number
    message: string
    likes: number
}
export type DialogsPageType = {
    dialogsData: Array<dialogsDataType>
    messageData: Array<messageDataType>
    newMessageText:string

}
export type ProfilePageType = {
    postsData: Array<postsDataType>
    newPostText: string

}
export type sidebarPageType = {}
export type stateType = {
    DialogsPage: DialogsPageType
    ProfilePage: ProfilePageType
    sidebarPage: sidebarPageType
}
export type sidebarDataType = {}

export let state: stateType = {
    DialogsPage: {
        dialogsData: [{id: 1, user: 'Nastya'},
            {id: 2, user: 'Dima'},
            {id: 3, user: 'Victor'}],
        messageData: [{id: 1, textMessage: 'yo'},
            {id: 2, textMessage: 'konichiwa'}],
        newMessageText:''
    },
    ProfilePage: {
        postsData: [
            {id: 1, message: 'it is my first post', likes: 30},
            {id: 2, message: 'it-kamasutra', likes: 10}],
        newPostText: ''

    },
    sidebarPage: {
        sidebarData: []
    }
}
export let addPost = (postText: string) => {
    let newPost: postsDataType = {id: 1, message: postText, likes: 0}
    state.ProfilePage.postsData.push(newPost)
    rerender()
}

export let addMessage = (messageText: string) => {
    let newMessage: messageDataType = {id: 4, textMessage: messageText}
    state.DialogsPage.messageData.push(newMessage)
    rerender()
}

export let changeNewText = (newText: string) => {
    state.ProfilePage.newPostText = newText
    rerender()
}

export let changeNewMessage = (newMessage: string) => {
    state.DialogsPage.newMessageText = newMessage
    rerender()
}

export const subscriber= (observer:()=>void)=>{
    rerender=observer
}