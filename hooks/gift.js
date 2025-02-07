import { GR_API_DOMAIN } from "@/const/api"

export async function createGift(token, listId, gift) {
    if (!token) {
        return {status: 401, message: "Unauthorized" }
    }
    const response = await fetch(`${GR_API_DOMAIN}/api/list/${listId}/gift`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(gift)
    })
    return response
}

export async function getGifts(token, listId) {
    let reqAttributes = {
        method: "GET",
    }
    if (token) {
        reqAttributes.headers = {
            "Authorization": `Bearer ${token}`
        }
    }
    return await fetch(`${GR_API_DOMAIN}/api/list/${listId}/gift`, reqAttributes)
}

export async function getGiftById(token, listId, giftId) {
    let reqAttributes = {
        method: "GET",
    }
    if (token) {
        reqAttributes.headers = {
            "Authorization": `Bearer ${token}`
        }
    }
    return await fetch(`${GR_API_DOMAIN}/api/list/${listId}/gift/${giftId}`, reqAttributes)
}

export async function deleteGiftById(token, listId, giftId) {
    if (!token) {
        return {status: 401, message: "Unauthorized" }
    }
    const response = await fetch(`${GR_API_DOMAIN}/api/list/${listId}/gift/${giftId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}

export async function updateGiftById(token, listId, gift) {
    if (!token) {
        return {status: 401, message: "Unauthorized" }
    }
    const response = await fetch(`${GR_API_DOMAIN}/api/list/${listId}/gift/${gift.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(gift)
    })
    return response
}

export async function purchaseGift(token, listId, giftId) {
    const response = await fetch(`${GR_API_DOMAIN}/api/list/${listId}/gift/${giftId}/purchase`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}

export async function unpurchaseGift(token, listId, giftId) {
    if (!token) {
        return {status: 401, message: "Unauthorized" }
    }
    const response = await fetch(`${GR_API_DOMAIN}/api/list/${listId}/gift/${giftId}/unpurchase`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response
}