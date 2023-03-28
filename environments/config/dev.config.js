
'use strict';

const auth = {
  "ISEndPoint": 'http://localhost:8001/oauth2/token',
  "ISRevokeEndPoint": 'http://localhost:8001/oauth2/revoke',
  "ISCreateUserEndPoint": 'http://localhost:8001/wso2/scim/Users',
  'client_id': 'aSEOIqFp_AmCUbOK2NDgJnOF7tQa',
  'client_secret': 'QYeQ8YfKJz6AqFglVoMHIo70fgIa',
  "DomainName": 'local_user',
   "createUserUName": 'seemas@gmail.com',
  "createUserPwd": 'password',
  "jwt_secret": "IcommConnect@123",
  "iss": "icomm_dev2",
  "expirationPeriod": 6000 // '24h'
}

module.exports = {
  auth: auth
}
