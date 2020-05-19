// Use this utility function for handling specific exceptions returned by a fetch response
export default fetchResponse => {
    console.log('in FetchUtil');
    
    if (fetchResponse.ok) {
        console.log('ok');
        
        return fetchResponse.json();
    } else {
        console.log('err');
        
        throw new Error(fetchResponse.statusText);
    }
};