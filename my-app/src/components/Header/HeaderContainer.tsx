import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {getAuthDataThunk, logoutThunk} from "../../redux/reducer/auth-reducer";
import {stateType} from "../../redux/redux-store";


type HeaderPropsType = mapStateToPropsType & mapDispatchToPropsType
type mapStateToPropsType = {
    login: string |null
    isAuth: boolean
}
type mapDispatchToPropsType = {
    getAuthDataThunk: (isAuth:boolean) => any
    logoutThunk:()=>any
}

let mapStateToProps = (state: stateType): mapStateToPropsType => ({

    login: state.auth.data.login,
    isAuth: state.auth.isAuth
})

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        this.props.getAuthDataThunk(true)
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

export default connect(mapStateToProps, {getAuthDataThunk,logoutThunk})(HeaderContainer)