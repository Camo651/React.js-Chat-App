const POST = async function (type, rw, payload, data){
    const MAIN_URL = "https://api.projectnodenium.com/ChatApp/";
    const TOKEN = "s16ond26";
    switch(type){
        case "f": 
            type="feed";
            if ((isNaN(payload) || payload === undefined) && rw === "r"){
                payload = 1000;
            }
            break;
        case "g": 
            type="getUUID"; 
            break;
        case "u": 
            type="user"; 
            break;
        case "n":
            type="socket";
        default: break;
    }


    let url = MAIN_URL + type + ".php";
    let timer1 = Date.now();
    return fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            token: TOKEN,
            rw: rw,
            payload: payload,
            data: data
        })
    })
    .then(response => response.json())
    .then(data => {
        let timer2 = Date.now();
        return {status: data.status, payload: data.payload, time: (timer2 - timer1)}
    })
    .catch((error) => {
        alert('API ERROR: ' + error);
    });
}

export default POST;