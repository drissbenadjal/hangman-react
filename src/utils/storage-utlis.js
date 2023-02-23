export const get = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export const set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}