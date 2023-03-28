const Joi = require( 'joi' );
const path = require( 'path' );
const rootDir = path.dirname( require.main.filename );
const db = require( '../../../models' )
const formidable = require( 'formidable' );
const storedPs = require( '../../../config/storeProcedureHelper' )

function getUserById( req, res ) {
    const schema = Joi.object( {
        a: Joi.string()
    } );
    const { error, value } = schema.validate( { a: 'a string' } );
    if ( error ) {
        console.log( 'in the erroor' )
    } else {
        try {
            //console.log("MMMMMMMMMMMMMMMMM")
            params_Id = req.params[ 'ID' ]
            var splitId = params_Id.split( "," )
            var User_ID = splitId[ 0 ]
            //  console.log("===========" +User_ID)
            db.sequelize.query( 'EXEC usp_All_User_ByID_Get :User_ID', { replacements: { User_ID: User_ID } } ).then( result => {
                //db.sequelize.query(query).then(result => {
                // console.log(result)
                var response;
                response = {
                    "result": {
                        "status": 200,
                        "output": [ result[ 0 ] ],
                        "message": "User data fetched successfully"
                    }
                }
                res.status( 200 ).send( response )
            } ).catch( error => {
                res.status( 200 ).send( error )
            } )
        } catch ( err ) {
            return res.status( 422 ).json( {
                error: "File is missing"
            } );
        }
    }
}


function getAllUser( req, res ) {
    const schema = Joi.object( {
        a: Joi.string()
    } );
    const { error, value } = schema.validate( { a: 'a string' } );
    if ( error ) {
        console.log( 'in the error' + error )
    } else {

        try {
            // console.log("JJJJJJJJJJJJJJJJJJJJ")
            params_Id = req.params[ 'Client_ID' ]
            var splitId = params_Id.split( "," )
            var Client_ID = splitId[ 0 ]
            // console.log("===========+" +Client_ID)
            db.sequelize.query( 'usp_All_User_Get :Client_ID', { replacements: { Client_ID: Client_ID }, type: db.sequelize.QueryTypes.GET } ).then( result => {
                var response;
                if ( result.length > 0 ) {
                    response = {
                        "result": {
                            "status": 200,
                            "output": [ result[ 0 ] ],
                            "message": "User data fetched successfully"
                        }
                    }
                    res.status( 200 ).send( response )
                }
                else {
                    res.status( 200 ).send( "No records available as per search" )
                }
            } ).catch( error => {
                res.status( 200 ).send( error )
            } )
        } catch ( err ) {
            return res.status( 422 ).json( {
                error: "File is missing"
            } );
        }
    }
}



module.exports = { getUserById, getAllUser }
