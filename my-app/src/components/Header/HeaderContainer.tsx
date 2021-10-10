import React from 'react';
import s from './Header.module.css'
import {Header} from "./Header";
import {RouteComponentProps} from "react-router-dom";
import {authDataType, profileDataUserType, stateType} from "../../redux/store";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/reducer/auth-reducer";

type HeaderPropsType = mapStateToPropsType & mapDispatchToPropsType
type mapStateToPropsType = {
    login: string
    isAuth: boolean
}
type mapDispatchToPropsType = {
    setAuthUserData: (data: authDataType) => void
}

let mapStateToProps = (state: stateType): mapStateToPropsType => ({
    login: state.auth.data.login,
    isAuth: state.auth.isAuth
})

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0//auth/me`, {withCredentials: true})
            .then(responce => {
                if (responce.data.resultCode === 0) {
                    this.props.setAuthUserData(responce.data.data)
                }
            })
    }

    render() {
        return (
            <Header {...this.props} login={this.props.login} isAuth={this.props.isAuth}/>
        )
    }
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)