import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {authDataType, setAuthUserData} from "../../redux/reducer/auth-reducer";
import {stateType} from "../../redux/redux-store";
import {getAuthUserData} from "../../api/api";

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
        getAuthUserData()
            .then(data => {
                if (data.resultCode === 0) {
                    this.props.setAuthUserData(data.data)
                }
            })
    }

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)