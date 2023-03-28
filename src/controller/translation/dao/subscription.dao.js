const db = require('../../../../models')
const to = require('await-to-js').default
// /*****SP's used in this DA layer */

const createUserSubscription = async (req, inputJasonData) => {
    console.log(req)
    var response = [];
    ClientId=1;           
   let [err, data] = await to(db.sequelize.query('EXEC usp_User_Insert :Login_Email,:Password,:First_name,:Middle_Name,:Last_Name,:Gender,:Mobile,:phone,:Language_ID', { replacements: { Login_Email: req.uname, Password: "password",First_name:req.First_name,Middle_Name:req.Middle_Name,Last_Name:req.Last_Name,Gender:req.Gender,Mobile:req.Mobile,phone:null,Language_ID:null }, type: db.sequelize.QueryTypes.INSERT}))
    if (err) {
        //throw Error(err)
        response = {
            "result": {
                "status": 409,
                "message": req.uname+" user already exists"
            }
        }
        return response
    }
    else {
        console.log(data)
        var response;
        response = {
            "result": {
                "status": 200,
                "Email":req.uname,
                "Password":"password",
                "message": "user registration successfull"
            }
        }
        return response
    }
}

const updateUser = async (req, inputJasonData) => {
    console.log("========================", req)
    var response = [];
    var query = "UPDATE X_User_Master set Password=" + "'" + req.password + "'" + " where Login_Email = " + "'" + req.Login_Email + "'";
    let [err, data] = await to(db.sequelize.query(query))
    if (err) {
        throw Error(err)
    }
    else {
        var response;
        response = {
            "result": {
                "status": 200,
                "message": "password updation successfull"
            }
        }
        return response
    }
}



module.exports = ({
    createUserSubscription: createUserSubscription,
    updateUser: updateUser,
})