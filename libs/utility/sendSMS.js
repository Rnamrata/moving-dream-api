'use strict';

const logger = require('../../../../../libs/helper/logger');
exports.sendSms = function (req, res)
{
    var message = "Hellow";
    var phone = req.body.phone ;
    

    var receivedNo = ['017********']

    var referrence = ['017********'];
    var message = "Hello From Demo"
    var sms = [[]];

    for(var i =0; i<receivedNo.length-1;i++)
    { 
     
        for (var j =0; j < receivedNo.length-1;j++)
        {
           
            for (var k =0; k< receivedNo.length-1;k++)
            {
                sms[i][i] = receivedNo[i];
                sms[i][j] = message;
                sms[i][k] = referrence[0];
            }
        }
        if(i == receivedNo.length -1)
        {
            res.send(sms);
        }
    }
    
}