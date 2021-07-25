const logger = require('../../../libs/helper/logger');
const bodyParamCheck = require('../../../libs/helper/bodyParamCheck');
const userModel = require('../../models/version1/userModel');
const baseUrlFile = require('../../../libs/helper/baseUrl');
var request = require("request");


exports.insertUserInfo = function(req, res)
{
  logger.info("Retriving data from API")

  var finalOutput = {};
  var status;
  var value = {};

  if(req.body) 
  {
        value.userName = req.body.userName;
        value.firstName = req.body.firstName;
        value.lastName = req.body.lastName;
        value.password = req.body.password;
        value.userType = req.body.userType;

        status = bodyParamCheck.bodyValidationCheck(value);
        if(status != true)
        {
            finalOutput.errorMessage = status + ' either in body or header' ; 
            res.send(finalOutput);
        }
        else {
            if (value.userType == 'employee') {
                value.email = req.body.email;
                
                userModel.insertEmployeeInfoModel(value, function(err, result)
                {
                    if(err)
                    {
                        res.send(err);
                    }
                    else
                    {
                        value.userId = result.insertId;
                        var options = { method: 'POST',
                            url: baseUrlFile.baseUrl + '/hashingPassword',
                            body:
                            {
                                password: value.password
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
                                value.hash = body.hash;
                                userModel.insertUserPasswordInfoModel(value, function(err, result)
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
                        });  
                    }
                });
            }
            else if (value.userType == 'customer') {
                value.phone = req.body.phone;
                value.contactFirst = req.body.contactFirst ? req.body.contactFirst : req.body.firstName;
                value.contactLast = req.body.contactLast ? req.body.contactLast : req.body.lastName;
                value.addressLine1 = req.body.addressLine1;
                value.addressLine2 = req.body.addressLine2;
                value.city = req.body.city;
                value.state = req.body.state;
                value.postalCode = req.body.postalCode;
                value.country = req.body.country;
                
                userModel.insertCustomerInfoModel(value, function(err, result)
                {
                    if(err)
                    {
                        res.send(err);
                    }
                    else
                    {
                        value.userId = result.insertId;

                        var options = { method: 'POST',
                            url: baseUrlFile.baseUrl + '/hashingPassword',
                            body:
                            {
                                password: value.password
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
                                value.hash = body.hash;
                                userModel.insertUserPasswordInfoModel(value, function(err, result)
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
                        }); 
                    }
                });
            }   
        }
    }
};