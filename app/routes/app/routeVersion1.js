'use strict';
const apiVersion = 'version1';

const ValidationMiddleware = require('../../../common/middleware/authValidation');
const officeController = require('../../controllers/version1/officeController');
const loginController = require('../../controllers/version1/loginController');



const appVersion1 = function (app)
{
    app.post('/demoApi/'+apiVersion+'/loginWithOtp',[
        loginController.loginWithOtp
    ]);

    app.post('/demoApi/'+apiVersion+'/insertLoginInfo',[
        loginController.insertLoginInfo
    ]);

    app.post('/demoApi/'+apiVersion+'/getOfficeDetails',[
        ValidationMiddleware.validJWTNeededNew,
        officeController.getOfficeDetails
    ]);

    app.post('/demoApi/'+apiVersion+'/getOfficeDetailsByid',[
        ValidationMiddleware.validJWTNeededNew,
        officeController.getOfficeDetailsByid
    ]);
};

module.exports = {appVersion1};
