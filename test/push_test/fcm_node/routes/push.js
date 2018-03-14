var express = require('express');
var router = express.Router();

var FCM = require('fcm-node');
var serverKey = 'AAAACj_jW58:APA91bGY-U_84dYLQ4aHex_cCc4qxAchfcBPeuEZfksILmHjB9I1XUn-x3X1oduDk-Cm0G4J8TZRm0rBkVUz_AkV_oWHGoJk5fXXK4Bmf39qPya100HUF6988W3G7Icz4R7FM2zHlQtS '; //put your server key here
var fcm = new FCM(serverKey);

var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: 'epBzA0aouE0:APA91bHv9PwasR62O0c62VL0oytQ--FP4O1KB32ylpdC8dbEfBorfek8b0S7Lj1CSvDzOP0_RKFs3GM-XS8wgnUAX7q-uapGmi_9VM77WeDMOTbnDiPCxdQ4VvasiI12_NLXlWyA9gX8', 
    collapse_key: '',   // 이전 메시지를 덮을 때 사용
    
    notification: {
        title: 'Title of your push notification', 
        body: 'Body of your push notification' 
    },
    
    data: {  //you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value'
    }
};

router.get('/', function(req, res, next) {
    console.log('push!');
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
        res.send(message);
    });
});

module.exports = router;
