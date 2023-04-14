import { Nullable } from "types/Nullable";
import { ContactsType } from "redux/reducer/profile/profile-reducer";

export type getUsersResponse = {
  items: Array<ItemsUsersResponseType>;
  totalCount: number;
  error: Nullable<string>;
};
export type ItemsUsersResponseType = {
  name: string;
  id: number;
  uniqueUrlName: null;
  photos: {
    small: Nullable<string>;
    large: Nullable<string>;
  };
  status: Nullable<string>;
  followed: boolean;
};

export type ResponseType<D = {}> = {
  data: D;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
};

export type loginAPIDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export type photosType = {
  photos: {
    large: string;
    small: string;
  };
};

export type securityAPIResponseT = {
  url: string;
};

export type updateProfilePayloadT = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  aboutMe: string;
};

export type getUsersQueryParamsType = {
  page?: number;
  term?: Nullable<string>;
  friend?: boolean;
  count?: number;
};
