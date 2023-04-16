// gmail.js

const { google } = require('googleapis');
const MailComposer = require('nodemailer/lib/mail-composer');
const credentials = require('./credentials.json');
const path = require('path');
const fs = require('fs');
let tokens = require('./token.json');

const getGmailService = () => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(tokens);

  // Handler de eventos para cuando se recibe un nuevo access_token o refresh_token en las consultas a la API de Gmail
  oAuth2Client.on('tokens', (receivedTokens) => {
    if (receivedTokens.refresh_token) {
      const tokenPath = path.join(__dirname, 'token.json');
      tokens.refresh_token = receivedTokens.refresh_token;
      fs.writeFileSync(tokenPath, JSON.stringify(tokens));
      console.log('Refresh token stored to token.json');
    }

    if (receivedTokens.access_token) {
      const tokenPath = path.join(__dirname, 'token.json');
      tokens.access_token = receivedTokens.access_token;
      
      if (receivedTokens.expiry_date) {
        tokens.expiry_date = receivedTokens.expiry_date;
      }

      fs.writeFileSync(tokenPath, JSON.stringify(tokens));
      console.log('Access token stored to token.json');
    } 
  });

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  return gmail;
};

const encodeMessage = (message) => {
  return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const createMail = async (options) => {
  const mailComposer = new MailComposer(options);
  const message = await mailComposer.compile().build();
  return encodeMessage(message);
};

const sendMail = async (options) => {
  const gmail = getGmailService();
  const rawMessage = await createMail(options);
  const { data: { id } = {} } = await gmail.users.messages.send({
    userId: 'me',
    resource: {
      raw: rawMessage,
    },
  });
  return id;
};

module.exports = sendMail;