const Joi = require( 'joi' );
const path = require( 'path' );
const rootDir = path.dirname( require.main.filename );
const db = require( '../../../models' )
const formidable = require( 'formidable' );
const storedPs = require( '../../../config/storeProcedureHelper' );
var jwtDecode = require( 'jwt-decode' );
const jwt = require( 'jsonwebtoken' );
var Environment = require( '../../../environments/index' ); //environments/index

var configkey = Environment.configuration.auth




function accountPreference( req, res ) {
    const schema = Joi.object( {
        a: Joi.string()
    } );
    const { error, value } = schema.validate( { a: 'a string' } );
    if ( error ) {
        console.log( 'in the erroor' )
    } else {
        // try {
        let authtokeninheader = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];
        let User_ID = req.params[ 'userId' ];
        let Client_ID = req.params[ 'clientId' ];

        if ( authtokeninheader && authtokeninheader.startsWith( 'Bearer' ) ) {
            // Remove Basic from string
            let authtoken = authtokeninheader.slice( 7, authtokeninheader.length );
            // console.log( authtoken );
            if ( authtoken ) {
                let decoded
                //  var verifyToken = jwt.verify( authtoken, configkey.jwt_secret );
                jwt.verify( authtoken, configkey.jwt_secret, function ( err, decoded ) {
                    // err
                    // decoded undefined
                    if ( err ) {
                        // console.log( err );
                        loadDefaultPreferences( res );
                    } else {
                        //  console.log( "===========cccccccccccccccccClient_ID: " + Client_ID + "==uuuuuuuuuuuuuuuuuuuUser_ID: =" + User_ID )
                        db.sequelize.query( 'EXEC usp_User_Preferences_GET :Client_ID,:User_ID', { replacements: { Client_ID: Client_ID, User_ID: User_ID } } ).then( result => {
                            var response;
                            response = {
                                "result": {
                                    "status": 200,
                                    "output": [ result[ 0 ] ],
                                    "message": "Account preference data fetched successfully"
                                }
                            }
                            res.status( 200 ).send( response )
                        } ).catch( error => {
                            res.status( 200 ).send( error )
                        } ); //End query
                    }
                } );
            } else {
                loadDefaultPreferences( res );
            }
        } else {
            loadDefaultPreferences( res );
        }
    }
}



module.exports = { accountPreference }