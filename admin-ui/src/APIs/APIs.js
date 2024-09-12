import axios from "axios"
const BASE_URL = "http://localhost:8088/api";

const servicesUrl = {
    user_service: "user-service",
    admin_service: "admin-service"
}

export const endpoints = {
    "auth-token": "/security-service/auth/token",
    "user-information": `/${servicesUrl.user_service}/user/information`,
    "user-roles": `/${servicesUrl.user_service}/user/get-roles`
}

export const adminEndpoints = {
    "admin-get-user": `/${servicesUrl.admin_service}/admin/user/get-list`,
    "admin-get-collection": `/${servicesUrl.admin_service}/admin/collection/get-all`,
    "admin-get-download": `/${servicesUrl.admin_service}/admin/collection/get-all-download`,
    "admin-get-word": `/${servicesUrl.admin_service}/admin/word/list-word`,
    "admin-get-learned": `${servicesUrl.admin_service}/admin/word/list-learned`
}

export const authApi = (accessToken) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
})