const db = require('../../../../models')
const to = require('await-to-js').default

const getUserData = async (req, res, next) => {
    console.log("In Get User data from DB mail id is " + req.uname)

    var query = "select User_ID from X_User_Master where Login_Email ="+"'"+req.uname+"'"
    let [err, data] = await to(db.sequelize.query(query))
    if (err) {
        throw Error(err)
    }
    else {
        console.log("in user dao ", data[0][0].User_ID)
        return data[0][0].User_ID
    }
}


module.exports = ({
    getUserData: getUserData
})