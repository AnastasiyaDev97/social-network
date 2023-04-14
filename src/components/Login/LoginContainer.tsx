import { connect } from "react-redux";
import { Login } from "./Login";
import { stateType } from "redux/redux-store";
import { loginAPIDataType } from "api/types";
import { loginThunk } from "redux/reducer/auth/thunk";

type mapDispatchToPropsType = {
  loginThunk: (loginData: loginAPIDataType) => void;
};
type mapStateToPropsType = {
  isAuth: boolean;
  userId: number | undefined;
  captchaUrl: string;
};

const mapStateToProps = (state: stateType): mapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    userId: state.ProfilePage.profile.userId,
    captchaUrl: state.auth.captchaUrl,
  };
};

export default connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  stateType
>(mapStateToProps, { loginThunk })(Login);
