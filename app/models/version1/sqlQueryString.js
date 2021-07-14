const AllOfficeQuery = 
{
    'AllOfficeDetails' : `SELECT * FROM offices;`,   

    'OfficeInfoById' : 'SELECT * FROM offices WHERE office_id = ?;'
};

const AllCustomerQuery = 
{
    'AllCusomerDetails' : `SELECT * FROM customers;`,   

    'CusomerDetailsById' : 'SELECT * FROM customers WHERE custommer_id = ?;',

    'CusomerInfoById' : 'SELECT customer_number, customer_name, phone, "customer" as user_type FROM customers WHERE custommer_id = ?;'

};

const AllEmployeeQuery = 
{
    'AllEmployeeDetails' : `SELECT * FROM employees;`,   

    'EmployeeDetailsById' : 'SELECT * FROM employees WHERE employee_id = ?;',

    'EmployeeInfoById' : 'SELECT employee_number, last_name, first_name, "employee" as user_type  FROM employees WHERE employee_id = ?;'
};

const AllUserQuery = 
{
    'InsertOtpForUser' : `INSERT INTO otp_log (otp_code, user_id, user_type, create_time) VALUES (?, ?, ?, now());`,   

    'GetOtpByUserId' : `SELECT otp_code FROM otp_log WHERE user_id = ? AND user_type = ? ORDER BY otp_id DESC LIMIT 1;`,

    'InsertLoginInfoForUser' : `INSERT INTO login_information (user_id, user_type, token, status, log_time) VALUES (?, ?, ?, ?, now());`,   

};

module.exports = 
{
    AllOfficeQuery,
    AllCustomerQuery,
    AllEmployeeQuery,
    AllUserQuery
};