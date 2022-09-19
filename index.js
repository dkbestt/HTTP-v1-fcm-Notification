const { google } = require('googleapis')
var MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
var SCOPES = [MESSAGING_SCOPE];
var http = require('http')

function getAccessToken() {
    return new Promise(function (resolve, reject) {
        const key = require('./react-js-push-noti-firebase-adminsdk.json');
        const jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}

var server = http.createServer((req, res) => {
    getAccessToken().then((access_token) => {
        console.log(access_token);
        res.end(access_token)
    })
})

server.listen(4600, () => {
    console.log('server running on 4600');
})