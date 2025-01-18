import { GR_API_DOMAIN } from "../const/api"

export async function uploadImage(token, fileName, fileData) {
    if (!token) {
        return {status: 401, message: "Unauthorized" }
    }
    const response = await fetch(`${GR_API_DOMAIN}/api/image`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "file_name": fileName,
            "file_data": fileData
        })
    })
    return response
}

export async function getImageUrl(token, fileName) {
    let reqAttributes = {
        method: "GET",
    }
    if (token) {
        reqAttributes.headers = {
            "Authorization": `Bearer ${token}`
        }
    }
    return await fetch(`${GR_API_DOMAIN}/api/image/${fileName}`, reqAttributes)
}