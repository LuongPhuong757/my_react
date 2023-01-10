export const setLocalStorage = (key,data) => {
    localStorage.setItem(key,data)
}

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
    window.location.reload()
}