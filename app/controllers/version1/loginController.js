const logger = require('../../../libs/helper/logger');
const bodyParamCheck = require('../../../libs/helper/bodyParamCheck');
const userModel = require('../../models/version1/userModel');
const baseUrlFile = require('../../../libs/helper/baseUrl');
var request = require("request");

exports.loginWithPassword = function(req, res)
{
  logger.info("Retriving data from API")

  var finalOutput = {};
  var status;
  var value = {};

  if(req.body) {
    value.userName = req.body.userName;
    value.userType = req.body.userType;
    value.userPassword = req.body.userPassword;

    status = bodyParamCheck.bodyValidationCheck(value);
    if(status != true)
    {
        finalOutput.errorMessage = status + ' either in body or header' ; 
        res.send(finalOutput);
    }
    else {
        userModel.getPasswordByUserNameModel(req.body, function(err, result)
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
                    res.status(452).send(finalOutput); 
                }
                else 
                {
                    value.userId = result[0].user_id;
                    var options = { method: 'POST',
                        url: baseUrlFile.baseUrl + '/tokenVerify',
                        body:
                        {
                            userPassword: value.userPassword,
                            token: result[0].hash
                        },
                        json: true 
                    };
                    request(options, function (error, response, body) 
                    {
                        if(error)
                        {
                            let outPut = [{responseCode: '452', responseMessage: 'Wrong Password'}] ;
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
                                    let outPut = [{responseCode: '452', responseMessage: 'Wrong Password'}] ;
                                    res.status(452).send(JSON.stringify(outPut));
                                }
                            }
                            else
                            {
                                let outPut = [{responseCode: '452', responseMessage: 'Wrong Password'}] ;
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
                console.log(err);
                console.log(result);
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
