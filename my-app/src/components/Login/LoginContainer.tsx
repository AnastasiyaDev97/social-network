import {connect} from "react-redux";
import {loginThunk} from "../../redux/reducer/auth-reducer";
import {Login} from "./Login";
import {stateType} from "../../redux/redux-store";
import {loginAPIDataType} from "../../api/types";

type mapDispatchToPropsType = {
    loginThunk: (loginData: loginAPIDataType) => void
}
type mapStateToPropsType = {
    isAuth: boolean
    userId: number | undefined
}

const mapStateToProps = (state: stateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    userId: state.ProfilePage.profile.userId
})

export default connect<mapStateToPropsType, mapDispatchToPropsType, {}, stateType>(mapStateToProps
    , {loginThunk})(Login)