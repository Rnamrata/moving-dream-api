const jwtSecret = require('../../../common/config/env.config').jwt_secret;
const tokenExpireIn = require('../../../common/config/env.config').jwt_expiration_in_seconds;
const crypto = require('crypto');
jwt = require('jsonwebtoken');

exports.otpEncryption = function (req, res, next) 
{
    console.log(req.body);
    var otp = req.body.otp;
    if(otp =="" || otp == undefined)
    {
        res.send({valid: false});
    }
    else
    {
        otp = otp.toString();
        const salt = jwtSecret.toString('base64')
        const hash = crypto.createHash('sha512', salt).update(otp).digest('base64');
        // console.log('Hash: ', hash);
        res.status(200).send({hash: hash});
    }
}

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

exports.hashingPassword = function (req, res) 
{
    var password = req.body.password;
    if(password =="" || password == undefined)
    {
        res.send({valid: false});
    }
    else
    {
        password = password.toString();
        const salt = jwtSecret.toString('base64')
        const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');
        const keyHash = salt + '$' + hash;
        // console.log('keyHash: ', keyHash);
        res.status(200).send({hash: keyHash});
    }
}

exports.tokenVerify = (req, res) => 
{
    try 
    {
        var valid = false;
        let userPassword = req.body.userPassword.toString();

        if(userPassword =="" || userPassword == undefined)
        {
            res.send({valid:valid});
        }
        else
        { 
            const salt = jwtSecret.toString('base64');
            const hash = crypto.createHmac('sha512', salt).update(userPassword).digest("base64");
            const keyHash = salt + "$" + hash;
          
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
