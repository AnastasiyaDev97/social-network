import React, {Component, ComponentType} from "react"
import {connect} from "react-redux";
import {itemsT} from "../../redux/reducer/users/user-reducer";
import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import Users from "./Users";
import {Nullable} from "../../types/Nullable";
import {getUsersThunk} from "../../redux/reducer/users/thunk";
import {RouteComponentProps, withRouter} from "react-router-dom";
/*import * as queryString from "querystring";*/


class UsersContainer extends Component<PropsType> {
    componentDidMount() {
       /* const parsed = queryString.parse(this.props.history.location.search.substr(1))
        let actualPage = this.props.currentPage
        let actualTerm = this.props.term
        let actualFilter = this.props.itemsType
        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualTerm = parsed.term as string

        switch (parsed.friend) {
            case 'null':
                actualFilter = null
                break;
            case 'true':
                actualFilter = 'friends'
                break;
            case 'false':
                actualFilter = 'users'
                break;
        }*/


        this.props.getUsersThunk()
    }

    componentDidUpdate({currentPage, term, itemsType}: Readonly<PropsType>) {
        if ((currentPage !== this.props.currentPage) || (term !== this.props.term) || (itemsType !== this.props.itemsType)) {
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
type mapStateType = {
    currentPage: number
    itemsType: itemsT
    term: Nullable<string>
}

export type PropsType = mapDispatchToPropsType & mapStateType & RouteComponentProps

let mapStateToProps = (state: stateType) => ({
    currentPage: state.UsersPage.currentPage,
    itemsType: state.UsersPage.itemsType,
    term: state.UsersPage.term,
})

export default compose<ComponentType>(
    connect<mapStateType, mapDispatchToPropsType, {}, stateType>
    (mapStateToProps, {getUsersThunk}), withRouter)(UsersContainer)
