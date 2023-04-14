import { stateType } from "redux/redux-store";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { ComponentType } from "react";
import { PATH } from "enums/PATH";

let mapStateToProps = (state: stateType): mapStateToPropsType => ({
  isAuth: state.auth.isAuth,
});
type mapStateToPropsType = {
  isAuth: boolean;
};

export function withRedirect<T>(Component: ComponentType<T>) {
  let RedirectComponent = (props: mapStateToPropsType) => {
    let { isAuth, ...restProps } = props;
    if (!isAuth) return <Redirect to={PATH.LOGIN} />;
    return <Component {...(restProps as T)} />;
  };
  return connect(mapStateToProps)(RedirectComponent);
}
