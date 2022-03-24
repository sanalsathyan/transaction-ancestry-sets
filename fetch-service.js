import fetch from "node-fetch";

export default async (url) => {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (err) {
        console.error('Unable to retrieve data from URL: ', url);
        throw err;
    }
};
