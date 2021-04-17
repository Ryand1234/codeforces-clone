var mySqlConnection = require('../util/db')
var mysql = mySqlConnection()
const { error, success } = require('../util/interface')

const create = async (blog, userId) => {
    const CREATE_BLOG = `INSERT INTO blog (title, description, userId) VALUES (${blog.title}, ${blog.description}, ${userId})`// create blog query
    mysql.query(CREATE_BLOG, (err) => {
        if(err) {
            return error
        }
        return success
    })
}

module.exports = {
    create: create
}