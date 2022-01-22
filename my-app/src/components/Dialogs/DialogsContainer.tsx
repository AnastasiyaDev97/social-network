import {addMessage,  dialogsDataType, messageDataType} from "../../redux/reducer/dialog-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {withRedirect} from "../../hoc/withRedirect";
import {compose} from "redux";
import {ComponentType} from "react";

type mapStateToPropsType = {
    dialogs: Array<dialogsDataType>
    messages: Array<messageDataType>
}

let mapStateToProps = (state: stateType): mapStateToPropsType => ({
    dialogs: state.DialogsPage.dialogsData,
    messages: state.DialogsPage.messageData,

})

export default compose<ComponentType>(
    connect(mapStateToProps, {addMessage}),
    withRedirect)(Dialogs)

