const HOST = 'http://192.168.10.10:3000';

export const endpoint = (path) => {
    return `${HOST}${path}`;
}