import fetch from "node-fetch"

const request = async ({
    method,
    url,
    body,
    headers,
}) => {
    const res = await fetch(url, {
        method,
        ...(body && { body }),
        headers,
    })

    if (!res.ok)
        throw new Error(`${res.status} ${res.statusText}`)

    const result = await res.text()
    return result
}

export default request