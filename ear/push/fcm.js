const FCM = require('fcm-node');
const config = require('../config');

const serverKey = config.FCM_SERVER_KEY;
const fcm = new FCM(serverKey);

module.exports = {
  send(message) {
    return new Promise((resolve, reject) => {
      fcm.send(message, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  },

  test() {
    const message = {
      to: 'epBzA0aouE0:APA91bHv9PwasR62O0c62VL0oytQ--FP4O1KB32ylpdC8dbEfBorfek8b0S7Lj1CSvDzOP0_RKFs3GM-XS8wgnUAX7q-uapGmi_9VM77WeDMOTbnDiPCxdQ4VvasiI12_NLXlWyA9gX8', 
      collapse_key: '',

      notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification',
      },

      data: {
        my_key: 'my value',
        my_another_key: 'my another value',
      },
    };

    fcm.send(message, function(err, res) {
      if (err) {
        console.log("Something has gone wrong!");
      } else {
        console.log("Successfully sent with response: ", res);
      }
      res.send(message);
    });
  },
};
