const HOST = 'http://192.168.100.235:3000';

export const endpoint = (path) => {
    return `${HOST}${path}`;
}