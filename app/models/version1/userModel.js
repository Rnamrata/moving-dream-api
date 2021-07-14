'use strict';

var connection = require('../../../libs/dbConnection/mysql/mysqlCon');
var logger = require('../../../libs/helper/logger');
const sqlQueryString = require('./sqlQueryString');

const insertOtpLogModel = function (value, result) {
    connection.createConnection.getConnection(function (err,sql)  
    {
        if (err) return result(new Error('Failed to connect mysql database '), null);

        const InsertOtpForUser = sqlQueryString.AllUserQuery.InsertOtpForUser;
        sql.query(InsertOtpForUser, [value.otp, value.userId, value.userType], function (err, res) 
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
}

const getOtpByUserIdModel = function (value, result) {
    connection.createConnection.getConnection(function (err,sql)  
    {
        if (err) return result(new Error('Failed to connect mysql database '), null);

        const GetOtpByUserId = sqlQueryString.AllUserQuery.GetOtpByUserId;
        sql.query(GetOtpByUserId, [value.userId, value.userType], function (err, res) 
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
}

const getCustomerByNumberModel = function (value, result)
{
    connection.createConnection.getConnection(function (err,sql)  
    {
        if (err) return result(new Error('Failed to connect mysql database '), null);

        const CusomerInfoById = sqlQueryString.AllCustomerQuery.CusomerInfoById;
        sql.query(CusomerInfoById, [value], function (err, res) 
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

const getEmployeeByNumberModel = function (value, result)
{
    connection.createConnection.getConnection(function (err,sql)  
    {
        if (err) return result(new Error('Failed to connect mysql database '), null);

        const EmployeeInfoById = sqlQueryString.AllEmployeeQuery.EmployeeInfoById;
        sql.query(EmployeeInfoById, [value], function (err, res) 
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

const insertUserLoginInfoModel = function (value, result) {
    connection.createConnection.getConnection(function (err,sql)  
    {
        if (err) return result(new Error('Failed to connect mysql database '), null);

        const InsertLoginInfoForUser = sqlQueryString.AllUserQuery.InsertLoginInfoForUser;
        sql.query(InsertLoginInfoForUser, [value.userId, value.userType, value.token, value.status], function (err, res) 
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
}


module.exports= {
    insertOtpLogModel,
    getOtpByUserIdModel,
    getCustomerByNumberModel,
    getEmployeeByNumberModel,
    insertUserLoginInfoModel
};