'use strict';

const productModel = require('../../models/version1/productModel');
const logger = require('../../../libs/helper/logger');
const bodyParamCheck = require('../../../libs/helper/bodyParamCheck');
const sqlQueryString = require('../../models/version1/sqlQueryString');
const pagination = require('../../../libs/utility/pageSetup');

exports.getAllProducts = function(req, res)
{
    logger.info("Retriving users list from User API")

    var finalOutput = {};
    let limit = req.headers.limit && req.headers.limit <= 100 ? parseInt(req.headers.limit) : 20;
    let page = 0;
    let skip = 0;

    var queryParam = ';';
    if (req.headers) 
    {
        if (req.headers.page)
        {
            page = parseInt(req.headers.page);
            page = Number.isInteger(page) ? page : 0;
            skip = limit * page;
        }
    }

    let sqlQuery = sqlQueryString.AllProductQuery.GetAllProduct;

    if (req.body) {
        if (req.body.productLine && req.body.productLine != '') {
            queryParam = "WHERE product_line Like '%" + req.body.productLine + "%'" + queryParam;
        }
        if (req.body.productName && req.body.productName != '') {
            queryParam = "WHERE product_name Like '%" + req.body.productName + "%'" + queryParam;
        }

    }

    sqlQuery = sqlQuery + queryParam;
    // console.log(sqlQuery);

    productModel.getAllProductsModel( sqlQuery, function(err, result)
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
                finalOutput.dataShowing = pagination.Paging(skip, limit, result.length);
                finalOutput.response = result.slice(skip, (skip+limit));
                res.send(finalOutput);
            }
        }
    });
};

exports.getProductsByProductLine = function(req, res)
{
    var status ; 
    var value = {};
    var finalOutput = {};

    if(req.body)
    {
        value.productLine = req.body.productLine;

        status = bodyParamCheck.bodyValidationCheck(value);
        if(status != true)
        {
            finalOutput.errorMessage = status + ' either in body or header' ; 
            res.send(finalOutput);
        }
        else {
            productModel.getProductsByProductLineModel(value, function(err, result)
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
                        finalOutput.errorMessage = 'No product information found for this product line.' ; 
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

exports.getProductDetaisByProductId = function(req, res)
{
    var status ; 
    var value = {};
    var finalOutput = {};

    if(req.body)
    {
        value.productId = req.body.productId;

        status = bodyParamCheck.bodyValidationCheck(value);
        if(status != true)
        {
            finalOutput.errorMessage = status + ' either in body or header' ; 
            res.send(finalOutput);
        }
        else {
            productModel.getProductDetaisByProductIdModel(value, function(err, result)
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
                        finalOutput.errorMessage = 'No product information found for this product id.' ; 
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