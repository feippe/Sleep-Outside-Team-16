export async function sendForm(url, method, data) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    return await fetch(url, options).then(convertToJson);
}

async function convertToJson(res) {
    const result = await res.json();
    if(res.ok){
        return result;
    }else{
        throw {name: 'serviceError', message: res };
    }
}