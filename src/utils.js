export const getCookies = () => {
    try {
        const cookie = document.cookie || '';
        if (!cookie) {
            return {};
        }
        return cookie.split(';').reduce((total, current) => {
            const cookieItem = current.split('=');
            return {
                ...total,
                [cookieItem[0].trim()]: cookieItem[1].trim()
            };
        }, {});
    }
    catch (e) {
        return {};
    }
};

export const getCookie = name => {
    return getCookies()[name];
};
