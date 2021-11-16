import axios from "axios";
import {profileDataUserType} from "../redux/reducer/profile-reducer";
import {authDataType} from "../redux/reducer/auth-reducer";

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "78ba9efb-88a6-4c7f-b505-5ad3ba5a9466"}
})

export const getUsers = (currentPage: number, pageSize: number) => {
    return instance.get<getUsersResponse>(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })
}

export const getAuthUserData = () => {
    return instance.get<ResponseType<authDataType>>(`auth/me`)
        .then(response => {
            return response.data
        })
}

export const followUserAPI = (id: number) => {
    return instance.post<ResponseType>(`follow/${id}`).then(response => {
        console.log(response, 'followUserAPI')
        return response.data
    })
}
export const unfollowUserAPI = (id: number) => {
    return instance.delete<ResponseType>(`follow/${id}`).then(response => {
        console.log(response)
        return response.data
    })
}
export const getUserProfileAPI = (id: string) => {
    return instance.get<profileDataUserType>(`profile/${id}`)
        .then(response => {
            return response.data
        })
}

type getUsersResponse = {
    items: Array<ItemsUsersResponseType>
    totalCount: number
    error: null | string
}
export type ItemsUsersResponseType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: {
        small: null | string
        large: null | string
    }
    status: null | string
    followed: boolean
}


type ResponseType<D = {}> = {
    data: D
    messages: []
    fieldsErrors: []
    resultCode: number
}
