import {profileDataUserType} from "../redux/reducer/profile-reducer";
import {authDataType} from "../redux/reducer/auth-reducer";
import {instance} from "./apiConfig";
import {
    getUsersResponse,
    loginAPIDataType,
    ResponseType,
    photosType, securityAPIResponseT, updateProfilePayloadT
} from "./types";


export const UsersAPI = {
    getUsers: (currentPage?: number, pageSize?: number,friend?:boolean) => {
        if(friend){
            return instance.get<getUsersResponse>(`users?friend=${friend}`)
                .then(response => response.data)
        }
        return instance.get<getUsersResponse>(`users?page=${currentPage}&count=${pageSize}&friend=${friend}`)
            .then(response => response.data)
    },

    followUserAPI: (id: number) => {
        return instance.post<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    },

    unfollowUserAPI: (id: number) => {
        return instance.delete<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    }
}

export const ProfileAPI = {
    getUserProfileAPI: (id: number) => {
        return instance.get<profileDataUserType>(`profile/${id}`)
            .then(response => response.data
            )
    },

    getStatus: (id: number) => {
        return instance.get<string>(`/profile/status/${id}`)
            .then(response => response.data)
    },

    updateStatus: (status: string) => {
        return instance.put<ResponseType>(`/profile/status`, {status})
            .then(response => response.data)
    },

    updateAvatar: (photoFile: File) => {
        let formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<ResponseType<photosType>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },

    updateProfile:(updateProfile:updateProfilePayloadT)=>{
        return instance.put<ResponseType>(`/profile`, updateProfile)
            .then(response => {
                return response.data})
    }
}

export const LoginAPI = {
    login: (loginData: loginAPIDataType) => {
        let {email, password, rememberMe, captcha} = loginData
        return instance.post<ResponseType<{ userId: number }>>('/auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(response => response.data)
    },

    logout: () => {
        return instance.delete<ResponseType>('/auth/login')
            .then(response => response.data)
    },

    getAuthUserData: () => {
        return instance.get<ResponseType<authDataType>>(`auth/me`)
            .then(response => response.data)
    },
}


export const securityAPI = () => {
    return instance.get<securityAPIResponseT>(`security/get-captcha-url`)
        .then(response => response.data)
}


