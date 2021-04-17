var mySqlConnection = require('../util/db')
const bcyrpt = require('bcryptjs')
var mysql = mySqlConnection()

const randomString = () => {
    return Math.random().toString(36).slice(2);
}

const loginController = async (email, password) => {
    try {
        const FIND_USER = `SELECT * FROM user WHERE email = "${email}"`
        await mysql.query(FIND_USER, (err, user)=>{
            console.log(user[0].password, err)
            if(err) {
                return {
                    user: null
                }
            }
            if(bcyrpt.compareSync(user[0].password, password)) {
                return {
                    user: user
                }
            } else {
                return {
                    user: null
                }
            }
        })
    } catch (err) {
        return {
            user: null
        }
    }
}

const registerController = async (user) => {
    try {
        const hashPassword = bcyrpt.hashSync(user.password)
        const CREATE_USER = `INSERT INTO user (email, password, name, mobile, token) VALUES ('${user.email}', '${hashPassword}', '${user.name}', '${user.mobile}', '${randomString()}')`
        await mysql.query(CREATE_USER, (err) => {
            if(err) {
                return {
                    success: false
                }
            }
            return {
                success: true
            }
        })
    } catch (err) {
        return {
            success: false
        }
    }
}

module.exports = {
    loginController: loginController,
    registerController: registerController
}