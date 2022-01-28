import React, {Component, ComponentType} from "react"
import {connect} from "react-redux";
import {getUsersThunk, itemsT, toggleItemsType,} from "../../redux/reducer/user-reducer";

import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import Users from "../Users/Users";
import {PAGE_SIZE} from "../../const";


class FriendsContainer extends Component<PropsType> {
    componentDidMount() {
        this.props.toggleItemsType('friends')
        this.props.getUsersThunk(1,PAGE_SIZE,true)
    }

    render() {
        return <Users/>
    }
}

type mapDispatchToPropsType = {
    getUsersThunk: (currentPage:number, pageSize: number,friend?:boolean) => void
    toggleItemsType : (itemsType:itemsT)=>void
}

export type PropsType =  mapDispatchToPropsType

let mapStateToProps;

export default compose<ComponentType>(
    connect<{}, mapDispatchToPropsType, {}, stateType>
    (mapStateToProps,{getUsersThunk,toggleItemsType}))(FriendsContainer)
