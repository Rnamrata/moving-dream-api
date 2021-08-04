const AllOfficeQuery = 
{
    'AllOfficeDetails' : `SELECT * FROM offices;`,   

    'OfficeInfoById' : `SELECT * FROM offices WHERE office_id = ?;`
};

const AllCustomerQuery = 
{
    'AllCusomerDetails' : `SELECT * FROM customers;`,   

    'CusomerDetailsById' : `SELECT * FROM customers WHERE custommer_id = ?;`,

    'CusomerInfoById' : `SELECT customer_number, customer_name, phone, "customer" as user_type FROM customers WHERE custommer_id = ?;`,

    'InsertUserInfoForCustomer' : `INSERT INTO customers (customer_name, contact_last_name, contact_first_name, phone, 
        address_line_1, address_line_2, city, state, postal_code, country) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,   

};

const AllEmployeeQuery = 
{
    'AllEmployeeDetails' : `SELECT * FROM employees;`,   

    'EmployeeDetailsById' : `SELECT * FROM employees WHERE employee_id = ?;`,

    'EmployeeInfoById' : `SELECT employee_number, last_name, first_name, "employee" as user_type FROM employees 
        WHERE employee_id = ?;`,

    'InsertUserInfoForEmployee' : `INSERT INTO employees (first_name, last_name, email) VALUES (?, ?, ?);`,   

};

const AllUserQuery = 
{
    'InsertOtpForUser' : `INSERT INTO otp_log (otp_code, user_id, user_type, create_time) VALUES (?, ?, ?, now());`,   

    'GetOtpByUserId' : `SELECT otp_code FROM otp_log WHERE user_id = ? AND user_type = ? ORDER BY otp_id DESC LIMIT 1;`,

    'GetPasswordByUserName' : `SELECT hash, user_id FROM users_password WHERE user_name = ? AND user_type = ? AND is_active = 1;`,

    'InsertLoginInfoForUser' : `INSERT INTO login_information (user_id, user_type, token, status, log_time) VALUES (?, ?, ?, ?, now());`,   

    'InsertUserPassword' : `INSERT INTO users_password (user_id, user_name, user_type, hash, create_time) VALUES (?, ?, ?, ?, now());`,   

    'CheckUserLoginStatus' : `SELECT status FROM login_information WHERE user_id = ? AND user_type = ? ORDER BY login_id DESC LIMIT 1;`

};

const AllProductQuery = 
{
    'GetAllProduct' : `SELECT product_name, product_line, product_vendor, buy_price FROM products `,

    'GetProductsByProductLine' : `SELECT product_name, product_line, product_vendor, buy_price FROM products 
                WHERE product_line = ?;`,

    'GetProductDetaisByProductId' : `SELECT * FROM products WHERE product_id = ?;`,
};

module.exports = 
{
    AllOfficeQuery,
    AllCustomerQuery,
    AllEmployeeQuery,
    AllUserQuery,
    AllProductQuery
};