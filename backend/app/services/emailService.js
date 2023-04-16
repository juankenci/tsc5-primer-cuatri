const sendMail = require('../utils/gmailAPI');

send = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const {to, subject, text, html} = data;
            const options = {
                to: to,
                cc: '',
                replyTo: 'economiapopular.proyecto.undav@gmail.com',
                subject: subject,
                text: text,
                html: html,
                attachments: [],
                textEncoding: 'base64',
                headers: [],
            };

            const messageId = await sendMail(options);
            console.log(`Mail sent ${messageId}`);
            resolve(messageId);
        } catch (error) {
            console.log(error || "Some error occurred while sending mail.")
            reject({ message: "Internal error" });
        }
    });
}

module.exports = {
    send: send
}