const UserModel = require('../../app/models/version1/userModel');

exports.insertOtpLog = (req, res) => {
    if (req.body.otp)
    {
        UserModel.insertOtpLogModel(req.body, function(err, result)
        {
            if(err)
            {
                res.send(err);
            }
            else
            {
                return res.status(200).send(req.body);        
            }
        });
    } else 
    {
        return res.status(400).send({errors: 'Missing user info.'});
    }
};

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body)
    {
        if (!req.body.userID || !req.body.userType) {
            errors.push('Missing user field.');
        }
        if (errors.length)
        {
            return res.status(400).send({errors: errors.join(',')});
        }
        else 
        {
            return next();
        }
    } else 
    {
        return res.status(400).send({errors: 'Missing user info.'});
    }
};

exports.validateUser = (req, res, next) => 
{
    if ( req.body.userType == 'customer') {

        UserModel.getCustomerByNumberModel(req.body.userID, function(err, user)
        {
            if(!user[0])
            {
                res.status(404).send({});
            }
            else
            {
                if(user[0])
                {
                    req.body = 
                    {
                        userId: req.body.userID,
                        userNumber: user[0].customer_number,
                        userType: user[0].user_type,
                        userName : user[0].customer_name,
                        phone:user[0].phone,
                    };
                    return next();
                }
                else
                {
                
                    return res.status(400).send({errors: ['Invalid user details']});
                
                }
            }
        });
    }
    else if ( req.body.userType == 'employee') {
        UserModel.getEmployeeByNumberModel(req.body.userID, function(err, user)
        {
            if(!user)
            {
                res.status(404).send({});
            }
            else
            {
                if(user[0])
                {
                    req.body = 
                    {
                        userId: req.body.userID,
                        userNumber: user[0].employee_number,
                        userType: user[0].user_type,
                        userName : `${user[0].first_name} ${user[0].last_name}`,
                        // phone:user[0].phone,
                    };
                    return next();
                }
                else
                {
                
                    return res.status(400).send({errors: ['Invalid user details']});
                
                }
            }
        });
    }
    else {
        return res.status(400).send({errors: ['Invalid user details']});
    }
};