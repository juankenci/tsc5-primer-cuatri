//const fs = require('fs');
//const path = require('path');
const sendMail = require('.');

const main = async () => {
  // const fileAttachments = [
  //   {
  //     filename: 'attachment1.txt',
  //     content: 'This is a plain text file sent as an attachment',
  //   },
  //   {
  //     path: path.join(__dirname, './attachment2.txt'),
  //   },
  //   {
  //     filename: 'websites.pdf',
  //     path: 'https://www.labnol.org/files/cool-websites.pdf',
  //   },

  //   {
  //     filename: 'image.png',
  //     content: fs.createReadStream(path.join(__dirname, './attach.png')),
  //   },
  // ];

  const options = {
    to: 'bravogermanezequiel@gmail.com',
    cc: '',
    replyTo: 'economiapopular.proyecto.undav@gmail.com',
    subject: 'Email prueba',
    text: 'This email is sent from the command line',
    html: `<p>This is a <b>test email</b>.</p>`,
    attachments: [],
    textEncoding: 'base64',
    headers: [],
  };

  const messageId = await sendMail(options);
  return messageId;
};

main()
  .then((messageId) => console.log('Message sent successfully:', messageId))
  .catch((err) => console.error(err));