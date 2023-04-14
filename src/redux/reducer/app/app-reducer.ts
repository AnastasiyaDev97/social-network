import { actionsType } from "../../redux-store";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

let initialState = {
  isInitialization: false,
  RequestStatus: "idle" as RequestStatusType,
};

type initialStateAppType = {
  isInitialization: boolean;
  RequestStatus: RequestStatusType;
};

export const appReducer = (
  state: initialStateAppType = initialState,
  action: actionsType
) => {
  switch (action.type) {
    case "APP/SET-INITIALIZATION":
      return {
        ...state,
        isInitialization: true,
      };
    case "APP/SET-STATUS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const setInitialization = () =>
  ({
    type: "APP/SET-INITIALIZATION",
  } as const);

export const setAppStatusAC = (RequestStatus: RequestStatusType) =>
  ({
    type: "APP/SET-STATUS",
    payload: {
      RequestStatus,
    },
  } as const);

export default appReducer;
