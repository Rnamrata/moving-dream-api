const jwtSecret = require('../../../common/config/env.config').jwt_secret;
const tokenExpireIn = require('../../../common/config/env.config').jwt_expiration_in_seconds;
const crypto = require('crypto');
jwt = require('jsonwebtoken');

exports.generateOtp = function (req, res, next) 
{
    var valid = false;
    if (req.body.userId, req.body.userType)
    {
        const otp = Math.floor((Math.random() * 10000) - 5);
        req.body.otp = otp;
        return next();
    }
    else {
        res.status(201).send({errors: 'Missing user info.'});
    }
}

exports.otpEncryption = function (req, res) 
{
    var otpCode = req.body.otpCode;
    if(otpCode =="" || otpCode == undefined)
    {
        res.send({valid: false});
    }
    else
    {
        otpCode = otpCode.toString();
        const secret = 'AEYjGNIRVGEtKSIarg0zCMEzOoNsK';
        // const salt = btoa(secret);
        const salt = secret.toString('base64')
        const hash = crypto.createHmac('sha512', salt).update(otpCode).digest('base64');
        const keyHash = salt + '$' + hash;
        // console.log('keyHash: ', keyHash);
        res.status(200).send({keyHash: keyHash});
    }
}

exports.token = (req, res) => {
    try {
            let refreshId = req.body.userId + jwtSecret;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
            req.body.refreshKey = salt;
            let token = jwt.sign(req.body, jwtSecret,{ expiresIn:tokenExpireIn});
            let b = new Buffer(hash);
            let refresh_token = b.toString('base64');
            res.status(201).send({ userId : req.body.userId , userName : req.body.userName , accessToken: token, refreshToken: refresh_token});
        } catch (err) {
            res.status(500).send({errors: err});
        }
};

exports.refresh_token = (req, res) => {
    try 
    {
        
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret ,{ expiresIn:tokenExpire});
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};


exports.tokenVerify = (req, res) => 
{
    try 
    {
        var valid = false;
        let userOTP = req.body.userOTP.toString();

        if(userOTP =="" || userOTP == undefined)
        {
            res.send({valid:valid});
        }
        else
        {
            var secret = 'AEYjGNIRVGEtKSIarg0zCMEzOoNsK';   
            let salt = secret.toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(userOTP).digest("base64");
            var keyHash = salt + "$" + hash;
          
            if(keyHash === req.body.token)
            {
                valid = true;
            }
    
            res.status(201).send({valid: valid});
        }
    } 
    catch (err) 
    {
            res.status(500).send({errors: err});
    }

};
