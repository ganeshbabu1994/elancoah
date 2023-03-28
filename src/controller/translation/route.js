
const languageMaster = require('./languageMaster');

const Preferences = require('./Preferences');
const agentLogin = require('./agentLogin');
const asyncHandler = require('express-async-handler');
var express = require('express')
const tokenauth = require('../../../middleware/auth.middleware');

var unless = require('express-unless');
var app = express();

var verifyToken = tokenauth.verifyToken
verifyToken.unless = unless;


app.use(verifyToken.unless({
    // path: excludedRoutes //excludedRoutes
}));


module.exports = (app) => {

    app.get('/litralee/api/v1/getAllUser/:Client_ID', agentLogin.getAllUser)
    app.get('/litralee/api/v1/getUserById/:ID', agentLogin.getUserById)

    
    app.get('/litralee/api/v1/language/', languageMaster.getLanguageData);
    app.get('/litralee/api/v1/getLanguageNames/:clientId', verifyToken, languageMaster.getLanguageNames)

    app.get('/litralee/api/v1/accountPreference/:clientId/:userId', Preferences.accountPreference);   
    
}