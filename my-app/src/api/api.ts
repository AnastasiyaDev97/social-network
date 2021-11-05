import axios from "axios";

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "78ba9efb-88a6-4c7f-b505-5ad3ba5a9466"}
})

export const getUsers = (currentPage: number, pageSize: number) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })
}

export const getAuthUserData = () => {
    return instance.get(`auth/me`)
        .then(response => {
            return response.data
        })
}

export const followUserAPI = (id: number) => {
    return instance.post(`follow/${id}`).then(response => {
        return response.data
    })
}
export const unfollowUserAPI = (id: number) => {
    return instance.delete(`follow/${id}`).then(response => {
        return response.data
    })
}
export const getUserProfileAPI = (id: string) => {
    return instance.get(`profile/${id}`)
        .then(response => {
            return response.data
        })
}