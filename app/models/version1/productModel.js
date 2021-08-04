'use strict';

var connection = require('../../../libs/dbConnection/mysql/mysqlCon');
var logger = require('../../../libs/helper/logger');
const sqlQueryString = require('./sqlQueryString');

const getAllProductsModel = function (sqlQuery, result)
{
    connection.createConnection.getConnection(function (err,sql)  
    {
        if (err) return result(new Error('Failed to connect mysql database '), null);
   
        sql.query(sqlQuery,function (err, res) 
        {
            if(err)
            {
                 result(err,null);
            }
            else
            {
                result(null, res);
            }       
        });
        sql.release();
    });
};

const getProductsByProductLineModel = function (value, result)
{
    connection.createConnection.getConnection(function (err,sql)  
    {
        if (err) return result(new Error('Failed to connect mysql database '), null);

        const GetProductsByProductLine = sqlQueryString.AllProductQuery.GetProductsByProductLine;
        sql.query(GetProductsByProductLine, [value.productLine], function (err, res) 
        {
            if(err)
            {
                result(err,null);
            }
            else
            {
                if (res.length != 0) {
                    result(null, res);
                }
                else {
                    result(null, null);
                }
            }       
        });
        sql.release();
    });
};

const getProductDetaisByProductIdModel = function (value, result)
{
    connection.createConnection.getConnection(function (err,sql)  
    {
        if (err) return result(new Error('Failed to connect mysql database '), null);

        const GetProductDetaisByProductId = sqlQueryString.AllProductQuery.GetProductDetaisByProductId;
        sql.query(GetProductDetaisByProductId, [value.productId], function (err, res) 
        {
            if(err)
            {
                result(err,null);
            }
            else
            {
                if (res.length != 0) {
                    result(null, res);
                }
                else {
                    result(null, null);
                }
            }       
        });
        sql.release();
    });
};

module.exports= {
    getAllProductsModel,
    getProductsByProductLineModel,
    getProductDetaisByProductIdModel
};