import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {Nullable} from "../../types/Nullable";
import {logoutThunk} from "../../redux/reducer/auth/thunk";


type HeaderPropsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    login: Nullable<string>
    isAuth: boolean
}

type mapDispatchToPropsType = {
    logoutThunk: () => void
}

let mapStateToProps = (state: stateType): mapStateToPropsType => ({
    login: state.auth.data.login,
    isAuth: state.auth.isAuth
})

class HeaderContainer extends React.Component<HeaderPropsType> {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

export default connect(mapStateToProps, {logoutThunk})(HeaderContainer)