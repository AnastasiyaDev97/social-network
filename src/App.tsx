import { PureComponent } from "react";
import "./App.module.scss";

import { Redirect, Route, Switch } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginContainer from "./components/Login/LoginContainer";
import { connect } from "react-redux";
import { stateType } from "./redux/redux-store";
import { RequestStatusType } from "./redux/reducer/app/app-reducer";
import Preloader from "./common/preloader/Preloader";
import NavBar from "./components/NavBar/NavBar";
import { PATH } from "./enums/PATH";
import { NotFound } from "./components/NotFound/NotFound";
import style from "./App.module.scss";
import { Initialize } from "./redux/reducer/app/thunk";

type AppPropsType = mapStateToPropsType & mapDispatchToPropsType;

class App extends PureComponent<AppPropsType> {
  componentDidMount() {
    this.props.Initialize();
  }

  render() {
    if (!this.props.isInitialization) {
      return <Preloader />;
    }

    return (
      <div className={style.appContainer}>
        <div className={style.appWrapperAuth}>
          <NavBar />
          <div className={style.appWrapperContent}>
            {this.props.RequestStatus === "loading" && <Preloader />}
            <Switch>
              <Route
                exact
                path={PATH.START}
                render={() => <ProfileContainer />}
              />
              <Route
                path={PATH.PROFILE + "/:userId?"}
                render={() => <ProfileContainer />}
              />
              <Route path={PATH.DIALOGS} render={() => <DialogsContainer />} />
              <Route path={PATH.USERS} render={() => <UsersContainer />} />
              <Route path={PATH.LOGIN} render={() => <LoginContainer />} />
              <Route path={PATH.NOT_FOUND} render={() => <NotFound />} />
              <Redirect from={"*"} to={PATH.NOT_FOUND} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state: stateType) => {
  return {
    isInitialization: state.app.isInitialization,
    RequestStatus: state.app.RequestStatus,
    isAuth: state.auth.isAuth,
  };
};
type mapStateToPropsType = {
  isInitialization: boolean;
  RequestStatus: RequestStatusType;
  isAuth: boolean;
};
type mapDispatchToPropsType = {
  Initialize: () => void;
};

export default connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  stateType
>(mapStateToProps, { Initialize })(App);
