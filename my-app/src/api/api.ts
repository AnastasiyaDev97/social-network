import {profileDataUserType} from "../redux/reducer/profile-reducer";
import {authDataType} from "../redux/reducer/auth-reducer";
import {instance} from "./apiConfig";
import {
    getUsersResponse,
    loginAPIDataType,
    ResponseLoginType,
    UpdateStatusResponseType,
    ResponseType,
    photosType
} from "./types";


export const UsersAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get<getUsersResponse>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response =>  response.data)
    }
}

export const ProfileAPI = {
    getUserProfileAPI: (id: string) => {
        return instance.get<profileDataUserType>(`profile/${id}`)
            .then(response => response.data
            )
    },

    getStatus: (id: string) => {
        return instance.get<string>(`/profile/status/${id}`)
            .then(response => response.data)
    },

    updateStatus: (status: string) => {
        return instance.put<UpdateStatusResponseType>(`/profile/status`, {status})
            .then(response =>  response.data)
    },

    updateAvatar: (photoFile: File) => {
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<ResponseType<photosType>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response =>  response.data)
    }
}

export const LoginAPI = {
    login: (loginData: loginAPIDataType) => {
        let {email, password, rememberMe, captcha} = loginData
        return instance.post<ResponseLoginType<{ userId: number }>>('/auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(response =>  response.data)
    },

    logout: () => {
        return instance.delete<ResponseLoginType>('/auth/login')
            .then(response =>  response.data)
    }
}

export const getAuthUserData = () => {
    return instance.get<ResponseType<authDataType>>(`auth/me`)
        .then(response =>  response.data)
}

export const followUserAPI = (id: number) => {
    return instance.post<ResponseType>(`follow/${id}`)
        .then(response => response.data)
}

export const unfollowUserAPI = (id: number) => {
    return instance.delete<ResponseType>(`follow/${id}`)
        .then(response =>  response.data)
}


