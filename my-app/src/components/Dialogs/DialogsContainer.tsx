import {addMessage, changeMessage, dialogsDataType, messageDataType} from "../../redux/reducer/dialog-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {withRedirect} from "../../hoc/withRedirect";
import {compose} from "redux";

type mapStateToPropsType = {
    dialogs: Array<dialogsDataType>
    messages: Array<messageDataType>
    newMessageText: string
}
let mapStateToProps = (state: stateType): mapStateToPropsType => ({
    dialogs: state.DialogsPage.dialogsData,
    messages: state.DialogsPage.messageData,
    newMessageText: state.DialogsPage.newMessageText,

})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {addMessage, changeMessage}),
    withRedirect)(Dialogs)

