export const camelToTitleCase = (str) => {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (char) => char.toUpperCase());
};

export const truncateString = (str, maxLength = 25) => {
    if (!str) return '';
    return str.length > maxLength 
        ? `${str.substring(0, maxLength)}...` 
        : str;
};