const VerifyUserMiddleware = require('../../../common/middleware/userValidation');
const authController = require('../../controllers/version1/authController');

const authRoute = function (app)
{
    app.post('/demoApi/generateOtp',[
        authController.generateOtp,
        VerifyUserMiddleware.insertOtpLog,
    ]);

    app.post('/demoApi/otpEncryption',[
        authController.otpEncryption
    ]);

    app.post('/demoApi/tokenVerify', [
        authController.tokenVerify
    ]); 

    app.post('/demoApi/authToken', [
        //logger.info()
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.validateUser,
        authController.token
    ]);
};

module.exports = {authRoute};
