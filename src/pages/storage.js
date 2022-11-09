

export async function storeItem(key, value) {
    if (value === null || value === undefined) return false

    await localStorage.setItem(key, JSON.stringify(value))

    return true
}

export async function getItem(key) {
    const item = await localStorage.getItem(key)

    if (item) {
        return JSON.parse(item)
    }
    return item
}

export async function removeItem(key) {
    const removed = await localStorage.removeItem(key)
    return removed
}

export async function storeUser(user) {
    const stored = await storeItem("auth-user", user)
    return stored
}

export async function getUser() {
    const user = await getItem("auth-user")
    return user
}

export async function removeUser() {
    const user = await removeItem("auth-user")
    return user
}

