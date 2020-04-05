
// eslint-disable-next-line no-unused-vars
export const delay = ms => new Promise(res => setTimeout(res, ms));

export function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
