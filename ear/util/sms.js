const coolsms = require('coolsms');
const config = require('../config');

module.exports = {
  send(mdn, contents) {
    // 인증번호 발송.
    coolsms({
      ssl: true,  // true | false
      user: config.COOLSMS_ID,  // CoolSMS username
      password: config.COOLSMS_PASSWORD,  // CoolSMS password
      from: config.SMS_SENDER,  // Sender Phone Number
      to: mdn,  // Recipient Phone Number
      text: contents,  // Text to send
    }, (err, result) => {
      // error message in String and result information in JSON
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  },
};
