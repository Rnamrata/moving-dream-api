'use strict';

var connection = require('../../../libs/dbConnection/mysql/mysqlCon');
var logger = require('../../../libs/helper/logger');
const sqlQueryString = require('./sqlQueryString');

const checkUserLoginStatus = function (value, result) {
    connection.createConnection.getConnection(function (err,sql)  
    {
        if (err) return result(new Error('Failed to connect mysql database '), null);

        const CheckUserLoginStatus = sqlQueryString.AllUserQuery.CheckUserLoginStatus;
        sql.query(CheckUserLoginStatus, [value.userId, value.userType], function (err, res) 
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
    checkUserLoginStatus
}