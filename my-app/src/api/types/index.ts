import {Nullable} from "../../types/Nullable";

export type getUsersResponse = {
    items: Array<ItemsUsersResponseType>
    totalCount: number
    error: Nullable<string>
}
export type ItemsUsersResponseType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: {
        small: Nullable<string>
        large: Nullable<string>
    }
    status: Nullable<string>
    followed: boolean
}


export type ResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors: []
    resultCode: number
}
export type ResponseLoginType<D = {}> = {
    data: D
    messages: string[]
    resultCode: number
}
export type UpdateStatusResponseType = {
    resultCode: number
    messages: string[]
    data: {}
    fieldsErrors: []
}

export type loginAPIDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}