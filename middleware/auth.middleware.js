var request = require( 'request' );
var querystring = require( 'querystring' );
var jwtDecode = require( 'jwt-decode' );
const jwt = require( 'jsonwebtoken' );
var unless = require( 'express-unless' );
var Environment = require( '../environments/index' )

let config = Environment.configuration.auth
let sess;

const verifyToken = async ( req, res, next ) => {

  let authtokeninheader = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ]; // Express headers are auto converted to lowercase
  //console.log("token in headers", authtokeninheader);
  var isValid = true;
  //if (req.url.substring(0, 8) != ('/api-doc')) {
  if ( req.url.indexOf( '/api-docs' ) == -1 ) {

    if ( !authtokeninheader ) {
      return res.status( 401 ).json( {
        status: 401,
        success: false,
        message: 'Auth token is not supplied'
      } );
    }
    else if ( authtokeninheader.startsWith( 'Bearer' ) ) {
      // Remove Basic from string
      let authtoken = authtokeninheader.slice( 7, authtokeninheader.length );


      // jwt.verify('aW5mb0BpY29tbWNvbm5lY3QuY29tOlByaW1lQDEyMzQ=', config.client_secret, function (err, decoded) {
      //   if (err) {
      //     console.log(JSON.stringify(err))
      //     return res.json({ success: false, message: 'Failed to authenticate token.' });
      //   } else {
      //     // if everything is good, save to request for use in other routes
      //     console.log("validated user")
      //     req.decoded = decoded; next();
      //   }
      // })
      if ( authtoken ) {
        let decoded
        try {
          var verifyToken = jwt.verify( authtoken, config.jwt_secret );
          // var verifyToken = jwt.verify(authtoken, config.jwt_secret);
          console.log( 'req.headers.host.indexOf( localhost )----> ', req.headers.host.indexOf( 'localhost' ) >= 0 )
          console.log( req.headers.host.indexOf( verifyToken[ 'domain' ] ) )
          console.log( verifyToken[ 'domain' ] );
          // if ( req.headers.host.indexOf( 'localhost' ) >= 0 )
          //   isValid = false;
          // if ( req.headers.host.indexOf( verifyToken[ 'domain' ] ) == -1 && isValid )
          //   throw "Not a valid Token";

          console.log( "token verified", verifyToken[ 'id_token' ] )
          decoded = jwtDecode( verifyToken[ 'id_token' ] );
          //console.log("decoded mail", decoded)
          req.headers[ 'email' ] = decoded[ 'sub' ]
          req.headers[ 'domain' ] = verifyToken[ 'domain' ];
          req.headers[ 'refreshToken' ] = verifyToken[ 'refresh_token' ]
          //console.log("session",req.session)
          sess = req.session

          //sess.email = decoded['sub']
          next()
          //  req.session['email']=decoded['sub']

        }
        catch ( e ) {
          console.log( e )
          return res.status( 401 ).json( {
            status: 401,
            success: false,
            message: 'Invalid Token or Token has been expired'
          } );
        }


        // console.log(decoded);
        // let postData1 = querystring.stringify({
        //   'client_id': config.client_id,
        //   'client_secret': config.client_secret,
        //   'scope': 'openid',
        //   'token': authtoken
        // });

        // request({
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   },
        //   url: config.ISEndPoint,
        //   body: postData1,
        //   method: 'POST'
        // }, function (err, finalresult, body) {
        //   var result = JSON.parse(body);
        //   console.log("result message", result);
        //   if (result.Message == "invalid_token") {
        //     return res.status(401).send({
        //       success: false,
        //       Message: "Authorization has been denied for this request.",
        //       Reason: 'Invalid Token or Token has been Expired!'
        //     });
        //   }
        //   else {
        //     next();
        //   }
        // });
      }
    }

    else {
      return res.status( 401 ).json( {
        status: 401,
        success: false,
        message: 'Auth token is not supplied'
      } );
    }
  }
  else {
    next()
  }
}


module.exports = {

  verifyToken: verifyToken
}


