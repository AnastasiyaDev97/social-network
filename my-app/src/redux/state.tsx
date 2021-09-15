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
    newMessageText: string

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
export type storeType = {
    _state: stateType
    subscriber: (observer: () => void) => void
    _rerender: () => void
    getState: () => stateType
    dispatch:(action:actionsType)=>void
}
/*export type actionAddPostType= ReturnType<typeof addPostAC>
export type actionAddMessageType=ReturnType<typeof addMessageAC>
export type actionChangeTextType=ReturnType<typeof changeTextAC>
export type actionChangeMessageType=ReturnType<typeof changeMessageAC>*/
export type actionsType =ReturnType<typeof addPostAC>|ReturnType<typeof addMessageAC>|ReturnType<typeof changeTextAC>|ReturnType<typeof changeMessageAC>


export const addPostAC=(postText:string)=>({
    type:'ADD-POST',
    postText:postText
}) as const


export const addMessageAC=(messageText:string)=>({
    type:'ADD-MESSAGE',
    messageText:messageText
}) as const

export const changeTextAC=(newText:string)=>({
    type:'CHANGE-NEW-TEXT',
    newText:newText
}) as const
export const changeMessageAC=(newMessage:string)=>({
    type:'CHANGE-NEW-MESSAGE',
    newMessage:newMessage
}) as const

export let store = {
    _state: {
        DialogsPage: {
            dialogsData: [{id: 1, user: 'Nastya'},
                {id: 2, user: 'Dima'},
                {id: 3, user: 'Victor'}],
            messageData: [{id: 1, textMessage: 'yo'},
                {id: 2, textMessage: 'konichiwa'}],
            newMessageText: ''
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
    },
                       //меняют state

    dispatch(action:actionsType){
      if(action.type==='ADD-POST'){
          let newPost: postsDataType = {id: 1, message: action.postText, likes: 0}
          this._state.ProfilePage.postsData.push(newPost)
          this._rerender()
      } else if(action.type==='ADD-MESSAGE'){
          let newMessage: messageDataType = {id: 4, textMessage: action.messageText}
          this._state.DialogsPage.messageData.push(newMessage)
          this._rerender()
      } else if(action.type==='CHANGE-NEW-TEXT'){
          this._state.ProfilePage.newPostText = action.newText
          this._rerender()
      }else if(action.type==='CHANGE-NEW-MESSAGE'){
          this._state.DialogsPage.newMessageText = action.newMessage
          this._rerender()
      }
    },

                //не меняют state
    getState() {
        return this._state
    },
    subscriber(observer: () => void) {
        this._rerender = observer
    },


    _rerender() {
        console.log('state changed')
    }
}

