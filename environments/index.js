const Const = require( './constants/constant' )

let environment = process.env[ 'SERVERENV' ];
console.log( environment )
const env = require( './config/' + 'dev.config' )

config = function () {
    // console.log("environment", process.env.NODE_ENV)
    //  let env = process.env.NODE_ENV

    // let env = 'production';
    // console.log("environement in config", env)
    return {
        configuration: env,
        constants: Const
    };


};


module.exports = config()


/*
 switch (env) {

        case 'local':
            console.log("in local")
            return {
                configuration: localconfig,
                constants: Const
            };

        case 'development':
            console.log("in development")
            return {
                configuration: dev2config,
                constants: Const

            };

        case 'qa2':
            console.log("in qa2")
            return {
                configuration: qa2config,
                constants: Const

            };


        case 'uat':
            console.log("in qa2")
            return {
                configuration: uatconfig,
                constants: Const

            };


        case 'production':
            console.log("in production")
            return {
                configuration: prodconfig,
                constants: Const
            };

        default:
            return {
                configuration: dev2config,
                constants: Const
            };
    }
*/