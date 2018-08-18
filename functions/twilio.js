const twilio = require('twilio');


const accountSid = 'ACd88f25264d8ccb65b7d7ed1851a63852';
const authToken = '0d212c6e9599146deaa53214f87844dd';

module.exports = new twilio.Twilio(accountSid, authToken);