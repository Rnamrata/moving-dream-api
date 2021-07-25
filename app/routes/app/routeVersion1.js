'use strict';
const apiVersion = 'version1';

const ValidationMiddleware = require('../../../common/middleware/authValidation');
const officeController = require('../../controllers/version1/officeController');
const loginController = require('../../controllers/version1/loginController');
const userController = require('../../controllers/version1/userController');


const appVersion1 = function (app)
{
    app.post('/demoApi/'+apiVersion+'/insertUserInfo',[
        userController.insertUserInfo
    ]);

    app.post('/demoApi/'+apiVersion+'/loginWithPassword',[
        loginController.loginWithPassword
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
