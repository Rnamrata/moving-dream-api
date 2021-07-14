const officeModel = require('../../models/version1/officeModel');
const logger = require('../../../libs/helper/logger');
const bodyParamCheck = require('../../../libs/helper/bodyParamCheck');

exports.getOfficeDetails = function(req, res)
{
  logger.info("Retriving users list from User API")

  var finalOutput = {};

    officeModel.officeDetailsModel(function(err, result)
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
                finalOutput.errorMessage = 'No data found.' ; 
                res.send(finalOutput);
            }
            else 
            {
                finalOutput.status = 'success';
                finalOutput.response = result;
                res.send(finalOutput);
            }
        }
    });
};

exports.getOfficeDetailsByid = function(req, res)
{
    var status ; 
    var value = {};
    var finalOutput = {};

    if(req.body)
    {
        value.officeId = req.body.officeId;

        status = bodyParamCheck.bodyValidationCheck(value);
        if(status != true)
        {
            finalOutput.errorMessage = status + ' either in body or header' ; 
            res.send(finalOutput);
        }
        else {
            officeModel.getOfficeDetailsByIdModel(value, function(err, result)
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
                        finalOutput.errorMessage = 'No office information found for this code.' ; 
                        res.send(finalOutput);
                    }
                    else 
                    {
                        finalOutput.status = 'success';
                        finalOutput.response = result;
                        res.send(finalOutput);
                    }
                }
            });
        }
    }
    else
    {
        finalOutput.errorMessage = 'Parameters are mising.' ;
        res.send(finalOutput);
    }
};