import React, {Component, ComponentType} from "react"
import {connect} from "react-redux";
import { itemsT} from "../../redux/reducer/users/user-reducer";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import Users from "./Users";
import {Nullable} from "../../types/Nullable";
import {getUsersThunk} from "../../redux/reducer/users/thunk";


class UsersContainer extends Component<PropsType> {

    componentDidMount() {
        this.props.getUsersThunk()
    }
    componentDidUpdate({currentPage,term,itemsType}: Readonly<PropsType>) {
        if((currentPage!==this.props.currentPage)||(term!==this.props.term)||(itemsType!==this.props.itemsType)){
            this.props.getUsersThunk()
        }
    }

    render() {
        return <Users/>
    }
}

type mapDispatchToPropsType = {
    getUsersThunk: () => void
}
type mapStateType={
    currentPage:number
    itemsType: itemsT
    term: Nullable<string>
}

export type PropsType = mapDispatchToPropsType&mapStateType

let mapStateToProps=(state:stateType)=>({
    currentPage: state.UsersPage.currentPage,
    itemsType: state.UsersPage.itemsType,
    term:state.UsersPage.term,
})

export default compose<ComponentType>(
    connect<mapStateType, mapDispatchToPropsType, {}, stateType>
    (mapStateToProps, {getUsersThunk}))(UsersContainer)
