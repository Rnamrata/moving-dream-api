const jwt = require('jsonwebtoken'),
secret = require('../config/env.config.js').jwt_secret,
crypto = require('crypto');

exports.validJWTNeededNew = (req, res, next) => 
{
    if (req.headers['authorization']) 
    {
        try 
        {
            //req.jwt.RequiredNewToken = false;
            var authorization = req.headers['authorization'].split(' ');

            if (authorization[0] !== 'Bearer') 
            {
                return res.status(401).send();
            } 
            else 
            {
                let tokenObject = authorization[1]
             
                req.jwt = jwt.verify(tokenObject, secret);
            
                if(req.jwt.version)
                {
                    if(req.jwt.version == 2)
                    {
                        var err_msg_104 = {
                            errorCode: "104",
                            error_message: "Token from old login process"
                        };
                
                        return res.status(401).send(err_msg_104);
                    }
                    // else
                    // {
                    //     shipperNewGetApiModel.checkLoginStatus(req.jwt, function (err, result) 
                    //     {
                    //         if(result.loginStatus == "alive" || loginFrom == "admin") 
                    //         {                               
                    //             return next();
                    //         }
                    //         else
                    //         {
                    //             let finalOutput = {error: 'auto logout, update'} ;
                    //             return res.status(455).send(JSON.stringify(finalOutput));
                    //         } 
                    //     });
                    // }
                }
                // else 
                // {
                //     shipperNewGetApiModel.checkLoginStatus(req.jwt, function (err, result) 
                //     {
                //         if(result.loginStatus == "alive" || loginFrom == "admin") 
                //         {
                //             return next();
                //         }
                //         else
                //         {
                //             let finalOutput = {error: 'auto logout, update'} ;
                //             return res.status(455).send(JSON.stringify(finalOutput));
                //         } 
                //     });
                // }
            }

        } 
        catch (err) 
        {
            if(err.message == "jwt expired")
            {

                var err_msg_101 = {
                    errorCode: "101",
                    error_message: "Token Expired"
                };

                return res.status(203).send(err_msg_101);
            
            }
            else
            {
                var err_msg_102 = {
                    errorCode: "102",
                    error_message: "Token authorization failed"
                };

                return res.status(403).send(err_msg_102);
            }
        }
    } else {
       
        var err_msg_103 = {
            errorCode: "103",
            error_message: "Token Not Found"
        };

        return res.status(401).send(err_msg_103);;
    }
};