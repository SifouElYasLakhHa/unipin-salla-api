const MOOGOID_API_URL = process.env.MOOGOID_API_URL;
var axios = require('axios');
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js/sha256");
var sha256 = require("js-sha256");
var crypto = require('crypto');

exports.moogoldApiBalance = async () => await new Promise((resolve, reject) => {
    try {
        var data = '';
        var dataNow = new Date().getTime();
        console.log(new Date().getTime());
        var buf1 = crypto.createHmac("sha256", "0").update('9f6b0cd5-8f51-4cbc-a923-91f3f013cc37' + dataNow + 'in-game-topup/list').digest();
        //var buf2 = Buffer.from('beijing');
        console.log(Buffer.concat([buf1]).toString('base64'));  
        var dataRequest = Buffer.concat([buf1]).toString('base64');
        var config = {
            method: 'post',
            url: 'https://api.unipin.com/in-game-topup/list',
            headers: { 
                'partnerid': '9f6b0cd5-8f51-4cbc-a923-91f3f013cc37', 
                'timestamp': dataNow, 
                'path': 'in-game-topup/list', 
                'Content-Type': 'application/json', 
                'auth': dataRequest
            },
            data: data
        };
        axios(config)
        .then(function (response) {
            console.log(response)
            resolve({
                status: true,
                response,
            }) 
        })
        .catch(function (e) {
            console.log(e)
            resolve({
                status: true,
                error: e,
            })
        });
    } catch (e) {
        console.log(e.data)
        resolve({
            status: true,
            error: e,
        })
    }

            //var dataRequest = sha256.hmac.update('7sushitngzq0kxqy', `ff`);
       // var dataRequest =  CryptoJS.SHA256(`9f6b0cd5-8f51-4cbc-a923-91f3f013cc37${dataNow}in-game-topup/list`, '7sushitngzq0kxqy');
        
       /* var dataRequest = sha256.hmac.create('7sushitngzq0kxqy');
        dataRequest.update(`9f6b0cd5-8f51-4cbc-a923-91f3f013cc37${dataNow}in-game-topup/list`);
        //dataRequest.hex();
        console.log(dataRequest.digest().toString('base64'));*/

});
