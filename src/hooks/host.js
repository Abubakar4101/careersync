const HOST = 'http://192.168.1.8:3000';

export const endpoint = (path) => {
    return `${HOST}${path}`;
}