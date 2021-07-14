'use strict';

var connection = require('../../../libs/dbConnection/mysql/mysqlCon');
var logger = require('../../../libs/helper/logger');
const sqlQueryString = require('./sqlQueryString');

const officeDetailsModel = function (result)
{
    connection.createConnection.getConnection(function (err,sql)  
    {
        if (err) return result(new Error('Failed to connect mysql database '), null);
   
        sql.query(sqlQueryString.AllOfficeQuery.AllOfficeDetails,function (err, res) 
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

const getOfficeDetailsByIdModel = function (value, result)
{
    connection.createConnection.getConnection(function (err,sql)  
    {
        if (err) return result(new Error('Failed to connect mysql database '), null);

        const OfficeInfoById = sqlQueryString.AllOfficeQuery.OfficeInfoById;
        sql.query(OfficeInfoById, [value.officeId], function (err, res) 
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
    officeDetailsModel,
    getOfficeDetailsByIdModel
};