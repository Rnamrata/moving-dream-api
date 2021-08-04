'use strict';
const apiVersion = 'version1';

const ValidationMiddleware = require('../../../common/middleware/authValidation');
const officeController = require('../../controllers/version1/officeController');
const loginController = require('../../controllers/version1/loginController');
const userController = require('../../controllers/version1/userController');
const productController = require('../../controllers/version1/productController');

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

    app.post('/demoApi/'+apiVersion+'/getAllProducts',[
        ValidationMiddleware.validJWTNeededNew,
        productController.getAllProducts
    ]);

    app.post('/demoApi/'+apiVersion+'/getProductsByProductLine',[
        ValidationMiddleware.validJWTNeededNew,
        productController.getProductsByProductLine
    ]);

    app.post('/demoApi/'+apiVersion+'/getProductDetaisByProductId',[
        ValidationMiddleware.validJWTNeededNew,
        productController.getProductDetaisByProductId
    ]);
};

module.exports = {appVersion1};
