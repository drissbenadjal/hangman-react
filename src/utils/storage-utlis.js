export const get = (key) => {
    const value = localStorage.getItem(key);
    if (!value) return null;
    if (value === 'fr-FR' || value === 'en-GB') {
        return value;
    }
    return null;
}

export const set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}