import { GR_API_DOMAIN } from "@/const/api"

export async function createList(token, list) {
    if (!token) {
        return {status: 401, message: "Unauthorized"}
    }
    return await fetch(`${GR_API_DOMAIN}/api/list`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(list)
    })
}

export async function getLists(token) {
    if (!token) {
        return {status: 401, message: "Unauthorized"}
    }
    return await fetch(`${GR_API_DOMAIN}/api/list`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function getListById(token, listId) {
    let reqAttributes = {
        method: "GET",
    }
    if (token) {
        reqAttributes.headers = {
            "Authorization": `Bearer ${token}`
        }
    }
    return await fetch(`${GR_API_DOMAIN}/api/list/${listId}`, reqAttributes)
}

export async function deleteListById(token, listId) {
    if (!token) {
        return {status: 401, message: "Unauthorized"}
    }
    return await fetch(`${GR_API_DOMAIN}/api/list/${listId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function updateListById(token, list) {
    if (!token) {
        return {status: 401, message: "Unauthorized"}
    }
    return await fetch(`${GR_API_DOMAIN}/api/list/${list.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(list)
    })
}
    