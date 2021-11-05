import {addMessage, changeMessage} from "../../redux/reducer/dialog-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";


let mapStateToProps=(state:stateType)=>{
    return{
        dialogs:state.DialogsPage.dialogsData,
        messages:state.DialogsPage.messageData,
        newMessageText:state.DialogsPage.newMessageText
    }
}
export let DialogsContainer=connect(mapStateToProps, {addMessage,changeMessage})(Dialogs)

