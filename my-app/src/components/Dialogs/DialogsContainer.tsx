import React from "react"
import {actionsType, stateType} from "../../redux/store";
import {addMessageAC, changeMessageAC} from "../../redux/reducer/dialog-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";


let mapStateToProps=(state:stateType)=>{
    return{
        dialogs:state.DialogsPage.dialogsData,
        messages:state.DialogsPage.messageData,
        newMessageText:state.DialogsPage.newMessageText
    }
}
let mapDispatchToProps=(dispatch:(action: actionsType) => void)=>{
    return{
        addMessage:(newMessageText: string)=>{dispatch(addMessageAC(newMessageText))},
        changeMessage:(text: string)=>{dispatch(changeMessageAC(text))}
    }
}
export let DialogsContainer=connect(mapStateToProps,mapDispatchToProps)(Dialogs)

