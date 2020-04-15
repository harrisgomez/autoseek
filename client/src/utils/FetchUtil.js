// Use this utility function for handling specific exceptions returned by a fetch response
export default fetchResponse => {
    if (fetchResponse.ok) {
        return fetchResponse.json();
    } else {
        throw new Error(fetchResponse.statusText);
    }
};