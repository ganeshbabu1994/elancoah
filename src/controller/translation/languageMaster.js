const Joi = require('joi');
const path = require('path');
const rootDir = path.dirname(require.main.filename);
const db = require('../../../models')
const storedPs = require('../../../config/storeProcedureHelper')
const formidable = require('formidable');

const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate();

var requestify = require('requestify');
var request = require('request');
function getLanguageByServiceType(req, res) {
    
let serviceType = req.body.serviceType || 'ASR'; // ASR, MT, TTS 
    const schema = Joi.object({
        a: Joi.string()
    });
    const { error, value } = schema.validate({ a: 'a string' });
    if (error) {
        console.log('in the erroor')
    } else {
        let query ='';
    if(serviceType == 'ASR') {
        query = `SELECT * FROM X_Language_Master WHERE ASR = 'Y';`
    }else if(serviceType == 'MT'){
        query = `SELECT * FROM X_Language_Master WHERE MT = 'Y';`
    }else{
        query = `SELECT * FROM X_Language_Master WHERE TTS = 'Y';`
    }

        db.sequelize.query(query).then(result => {
            var response;
            response = {
                result: {
                    status: 200,
                    output: [result[0]],
                    message: "Language data fetched successfully"
                }
            }
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
        })
    }

}

function getLanguageData(req, res) {
    const schema = Joi.object({
        a: Joi.string()
    });
    const { error, value } = schema.validate({ a: 'a string' });
    if (error) {
        console.log('in the erroor')
    } else {
        db.sequelize.query(storedPs.View_All_languages).then(result => {
            var response;
            response = {
                result: {
                    status: 200,
                    output: [result[0]],
                    message: "Language data fetched successfully"
                }
            }
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
        })
    }
}

function getLanguageVarient(req, res) {
    var Language_Code;
    const schema = Joi.object({
        a: Joi.string()
    });
    const { error, value } = schema.validate({ a: 'a string' });
    if (error) {
        console.log('in the erroor')
    } else {

        try {
            Language_Code = req.params['languageCode']
            console.log("Req Paramater " + Language_Code)
            var query = "select * from X_Language_Master where Language_Code='" + Language_Code + "'";
            db.sequelize.query(query).then(result => {
                var response;
                response = {
                    result: {
                        status: 200,
                        output: [result[0]],
                        message: "Language data fetched successfully"
                    }
                }
                res.status(200).json(response)
            })
        } catch (err) {
            return res.status(422).json({
                error: "File is missing"
            });
        }
    }
}

async function getVendorLanguage(req, res) {
    console.log("TEst")
    const schema = Joi.object({
        a: Joi.string()
    });
    const { error, value } = schema.validate({ a: 'a string' });
    if (error) {
        console.log('in the erroor')
    } else {
        if (req.params['vendor'] == "google") {
            // Lists available translation language with their names in English (the default).
            const [languages] = await translate.getLanguages();
            //   console.log('Languages:');
            //   languages.forEach(language => console.log(language));
            var response;
            response = {
                result: {
                    status: 200,
                    output: [languages],
                    message: "Supported vendor Languages data fetched successfully"
                }
            }
            res.status(200).json(response)
        }
        else if (req.params['vendor'] == "microsoft") {
            console.log("Microsoft")
            var language;
            requestify.get('https://api.cognitive.microsofttranslator.com/languages?api-version=3.0')
                .then(function (result) {
                    console.log("test")
                    var record = result.body
                    var response;
                    response = {
                        result: {
                            status: 200,
                            output: [JSON.parse(record)],
                            message: "Supported vendor Languages data fetched successfully"
                        }
                    }
                    res.status(200).json(response)
                }
                );
        } else if (req.params['vendor'] == "deepl") {
            console.log("deepl")

            var options = {
                'method': 'POST',
                'url': 'https://api.deepl.com/v2/languages',
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                form: {
                    'auth_key': '54b231d8-9b70-b338-406c-b87a080d627a',
                    'type': 'target'
                }
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                var response;
                response = {
                    result: {
                        status: 200,
                        output: [JSON.parse(response.body)],
                        message: "Supported vendor Languages data fetched successfully"
                    }
                }
                res.status(200).json(response)
            });
        }
    }
}


function getLanguageNames(req, res) {
    const schema = Joi.object({
        a: Joi.string()
    });
    const { error, value } = schema.validate({ a: 'a string' });
    if (error) {
        console.log('in the error')
    }
    let Client_ID = req.params['clientId'];
    console.log("=================", req.params['clientId'])
    if (req.params['clientId'] == 'null') {
        var query = "select * from X_language_master";
        db.sequelize.query(query).then(result => {
            var response;
            response = {
                result: {
                    status: 200,
                    output: [result[0]],
                    message: "Language data fetched successfully"
                }
            }
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
        })
    }
    else {
        var query = "select PLM.Language_Name as Parent_Language,LM.Language_Name,LM.Language_Code,LM.Language_Ext,LM.Language_Script,LMR.Client_ID,LMR.Language_ID,LMR.Parent_ID,LMR.Language_Sequence from X_language_Client_mapping LMR JOIN X_language_master LM ON LMR.Language_ID = LM.Language_ID JOIN X_language_master PLM ON LMR.parent_ID = PLM.Language_ID where LMR.Client_ID ='" + Client_ID + "'";
        db.sequelize.query(query).then(result => {
            var response;
            response = {
                result: {
                    status: 200,
                    output: [result[0]],
                    message: "Language data fetched successfully"
                }
            }
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
        })
    }
}


async function insertUpdateLanguages(req, res) {
    const schema = Joi.object({
        a: Joi.string()
    });
    const { error, value } = schema.validate({ a: 'a string' });
    if (error) {
        console.log('in the error' + error)
    } else {
        
        try {

            console.log("IN Users update function");
            await db.sequelize.query('USP_Language_Client_DropDown_Insert_update :Language_IdS,:CLIENT_ID', { replacements: { Language_IdS: req.body.language_Ids, CLIENT_ID: req.body.client_Id }, type: db.sequelize.QueryTypes.UPDATE }).then(result => {
                var response;
                console.log("Result EXEC is", result)
                if (result.length > 0) {
                    console.log("========",result)
                    console.log(result.length)
                        response = {
                            "result": {
                                "status": 200,
                                "message": "Languages added successfully"
                            }
                        }
                    // else {
                    //     response = {
                    //         "result": {
                    //             "status": 200,
                    //             "message": "Languages updated successfully"
                    //         }
                    //     }
                    // }
                    res.status(200).send(response)
                }
                else {
                    res.status(200).send("No records available as per search")
                }
            }).catch(error => {
                console.log("ERROR", error)
                res.status(200).send(error)
            })
        } catch (err) {
            console.log("ERR", err)
            return res.status(422).json({
                error: "File is missing"
            });
        }
    }
}

module.exports = { getLanguageData, getLanguageVarient, getVendorLanguage, getLanguageByServiceType, getLanguageNames,insertUpdateLanguages }
