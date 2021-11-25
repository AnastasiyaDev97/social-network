import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import { logoutThunk} from "../../redux/reducer/auth-reducer";
import {stateType} from "../../redux/redux-store";


type HeaderPropsType = mapStateToPropsType & mapDispatchToPropsType
type mapStateToPropsType = {
    login: string |null
    isAuth: boolean
}
type mapDispatchToPropsType = {
    logoutThunk:()=>any
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