const logger = require('../../../libs/helper/logger');
const bodyParamCheck = require('../../../libs/helper/bodyParamCheck');
const userModel = require('../../models/version1/userModel');
const baseUrlFile = require('../../../libs/helper/baseUrl');
var request = require("request");

exports.loginWithOtp = function(req, res)
{
  logger.info("Retriving data from API")

  var finalOutput = {};
  var status;
  var value = {};

  if(req.body) {
    value.userId = req.body.userId;
    value.userType = req.body.userType;
    value.token = req.body.token;

    status = bodyParamCheck.bodyValidationCheck(value);
    if(status != true)
    {
        finalOutput.errorMessage = status + ' either in body or header' ; 
        res.send(finalOutput);
    }
    else {
        userModel.getOtpByUserIdModel(req.body, function(err, result)
        {
            if (err)
            {
              res.send(err);
            }
            else
            {
                if(!result)
                {
                    finalOutput.status = 'failed';
                    finalOutput.errorMessage = 'No data found.';
                    res.status(452).send(finalOutputult); 
                }
                else 
                {
                    var options = { method: 'POST',
                        url: baseUrlFile.baseUrl + '/tokenVerify',
                        body:
                        {
                            userOTP: result[0].otp_code,
                            token: value.token
                        },
                        json: true 
                    };
                    request(options, function (error, response, body) 
                    {
                        if(error)
                        {
                            let outPut = [{responseCode: '452', responseMessage: 'Wrong OTP'}] ;
                            res.status(452).send(JSON.stringify(outPut));
                        }
                        else
                        {
                            if(body.valid)
                            {
                                if(body.valid == true)
                                {
                                    //res.send([body.valid]);
                                    var options = { method: 'POST',
                                        url: baseUrlFile.baseUrl + '/authToken',
                                        body:
                                        {
                                            userID: value.userId,
                                            userType: value.userType
                                        },
                                        json: true 
                                    };

                                    request(options, function (error, response, body) 
                                    {

                                        if(error)
                                        {
                                            res.send(error);
                                        }
                                        else
                                        {
                                            finalOutput.status = 'success';
                                            finalOutput.response = response.body;
                                            res.send(finalOutput);
                                        }
                                    });
                                }
                                else
                                {
                                    let outPut = [{responseCode: '452', responseMessage: 'Wrong OTP'}] ;
                                    res.status(452).send(JSON.stringify(outPut));
                                }
                            }
                            else
                            {
                                let outPut = [{responseCode: '452', responseMessage: 'Wrong OTP'}] ;
                                res.status(452).send(JSON.stringify(outPut));
                            }
                        }
                    });
                }
            }
        });
    }
  }
};

exports.insertLoginInfo = function(req, res)
{
  logger.info("Retriving data from API")

  var finalOutput = {};
  var status;
  var value = {};

  if(req.body) 
  {
        value.userId = req.body.userId;
        value.userType = req.body.userType;
        value.token = req.body.token;
        value.status = req.body.status;

        status = bodyParamCheck.bodyValidationCheck(value);
        if(status != true)
        {
            finalOutput.errorMessage = status + ' either in body or header' ; 
            res.send(finalOutput);
        }
        else {
            userModel.insertUserLoginInfoModel(value, function(err, result)
            {
                if(err)
                {
                    res.send(err);
                }
                else
                {
                    finalOutput.status = 'success';
                    return res.status(200).send(finalOutput);        
                }
            });
        }
    }
};
