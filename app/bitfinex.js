const axios = require('axios');

function getBit() {
    return axios.get('https://api.bitfinex.com/v1/pubticker/btcusd')
        .then((response) => {
            return response;
            
        })
        .catch((err) => {
            console.error(err);
        });
}

// const https = require('https');

// function getBit() {
    
//     https.get('https://api.bitfinex.com/v1/pubticker/btcusd', res => {
//         res.setEncoding('utf-8');
//         res.on('data', response => {
//             // console.log(response);
//             return response;
//         });
//     })
// }

// let a = getBit();
// console.log(a);


module.exports = {
    getBit
};