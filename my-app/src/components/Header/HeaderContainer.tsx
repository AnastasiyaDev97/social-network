import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {getAuthDataThunk} from "../../redux/reducer/auth-reducer";
import {stateType} from "../../redux/redux-store";


type HeaderPropsType = mapStateToPropsType & mapDispatchToPropsType
type mapStateToPropsType = {
    login: string
    isAuth: boolean
}
type mapDispatchToPropsType = {
    getAuthDataThunk: () => any
}

let mapStateToProps = (state: stateType): mapStateToPropsType => ({
    login: state.auth.data.login,
    isAuth: state.auth.isAuth
})

class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        this.props.getAuthDataThunk()
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

export default connect(mapStateToProps, {getAuthDataThunk})(HeaderContainer)