var mySqlConnection = require('../util/db')
var mysql = mySqlConnection()
const { error, success } = require('../util/interface')

const create = async (data, userId) => {
  try {
    const constraint = JSON.stringify(data.constraint)
   const CREATE_PROBLEM = `INSERT INTO questions (title, description, constraints, userId) VALUES ('${data.title}', '${data.desc}', '${constraint}', ${userId})`// create problem query
   mysql.query(CREATE_PROBLEM, (err) => {
     if(err) {
       return error
     }
     return success
   })   
  } catch (err) {
    return error
  }
}

const getAllProblems = async () => {
  try {
    const GET_ALL_PROBLEMS = `SELECT id, title from questions` // get all problem query
    await mysql.query(GET_ALL_PROBLEMS, (err, problems) => {
      if(err) {
        return error
      }
      return {
        problems: problems
      }
    })
  } catch (err) {
    return error
  }
}

const getUserProblems = async (userId) => {
  try {
    const GET_USER_PROBLEMS = `SELECT id, title from questions WHERE userId = ${userId}` // get all problem query
    mysql.query(GET_USER_PROBLEMS, (err, problems) => {
      if(err) {
        return error
      }
      return {
        problems: problems
      }
    })
  } catch (err) {
    return error
  }
}

const getProblemDescription = async (id) => {
  try {
    const GET_PROBLEM_DESCRIPTION = `SELECT id, title, description, constraint from questions WHERE id = ${id}` // get all problem query
    mysql.query(GET_PROBLEM_DESCRIPTION, (err, problems) => {
      if(err) {
        return error
      }
      return {
        problems: problems
      }
    })
  } catch (err) {
    return error
  }
}

module.exports = {
    create: create,
    getAllProblems: getAllProblems,
    getUserProblems: getUserProblems,
    getProblemDescription: getProblemDescription
}