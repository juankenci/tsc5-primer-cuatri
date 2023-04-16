const { google } = require("googleapis");
const credentials = require('./credentials.json');
const tokens = require('./token.json');
const path = require('path');
const fs = require('fs');

const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

oAuth2Client.setCredentials({refresh_token:tokens.refresh_token});

oAuth2Client.getAccessToken().then((res) => {
    const tokenPath = path.join(__dirname, 'token.json');
    fs.writeFileSync(tokenPath, JSON.stringify(res.res.data));
    console.log('Access token and refresh token stored to token.json');
});