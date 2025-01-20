import { GR_API_DOMAIN } from "../const/api"

export async function getUserDetails(token, userId) {
    if (!token) {
        return {status: 401, message: "Unauthorized" }
    }
    return await fetch(`${GR_API_DOMAIN}/api/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function updateUserDetails(token, user) {
    if (!token) {
        return {status: 401, message: "Unauthorized" }
    }
    return await fetch(`${GR_API_DOMAIN}/api/ser/${user.Id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
}