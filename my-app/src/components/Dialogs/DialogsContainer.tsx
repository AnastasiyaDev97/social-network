import {addMessage, changeMessage, dialogsDataType, messageDataType} from "../../redux/reducer/dialog-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {withRedirect} from "../../hoc/withRedirect";

type mapStateToPropsType={
    dialogs:Array<dialogsDataType>
    messages:Array<messageDataType>
    newMessageText:string
}
let mapStateToProps=(state:stateType):mapStateToPropsType=>({
        dialogs:state.DialogsPage.dialogsData,
        messages:state.DialogsPage.messageData,
        newMessageText:state.DialogsPage.newMessageText,

    })

export default withRedirect( connect(mapStateToProps, {addMessage,changeMessage})(Dialogs))

