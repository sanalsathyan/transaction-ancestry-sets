import fetch from 'node-fetch';

export default async (url, responseType) => {
  try {
    const response = await fetch(url);
    return response[responseType]();
  } catch (err) {
    console.error('Unable to retrieve data from URL: ', url);
    throw err;
  }
};
