import React, {Component, ComponentType} from "react"
import {connect} from "react-redux";
import {getUsersThunk, itemsT, toggleItemsType,} from "../../redux/reducer/user-reducer";

import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import Users from "../Users/Users";
import {Nullable} from "../../types/Nullable";


class FriendsContainer extends Component<PropsType> {
    componentDidMount() {
        this.props.toggleItemsType('friends')
        /*this.props.getUsersThunk(1,PAGE_SIZE,true)*/
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
    getUsersThunk: (/*currentPage:number, pageSize: number,friend?:boolean*/) => void
    toggleItemsType : (itemsType:itemsT)=>void
}

export type PropsType =  mapDispatchToPropsType&mapStateType

let mapStateToProps=(state:stateType)=>({
    currentPage: state.UsersPage.currentPage,
    itemsType: state.UsersPage.itemsType,
    term:state.UsersPage.term,
})

type mapStateType={
    currentPage:number
    itemsType: itemsT
    term: Nullable<string>
}

export default compose<ComponentType>(
    connect<mapStateType, mapDispatchToPropsType, {}, stateType>
    (mapStateToProps,{getUsersThunk,toggleItemsType}))(FriendsContainer)
