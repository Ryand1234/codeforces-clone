const router = require('express').Router()
const problemController = require('../controllers/problem')
const userAuthorize = require('../util/middleware')
var mySqlConnection = require('../util/db')
var mysql = mySqlConnection()
const { error, success } = require('../util/interface')

// Create Problem
router.post('/create', userAuthorize, async (req, res) => {
  try {
    await problemController.create(req.body, req.user.id)
    res.status(200).json(success)
  } catch (err) {
    res.status(400).json(error)
  }
})

// get all problem
router.get('/all', userAuthorize, async (_req, res) => {
  try {
    const GET_ALL_PROBLEMS = `SELECT id, title from questions` // get all problem query
    mysql.query(GET_ALL_PROBLEMS, (err, problems) => {
      if (err) {
        res.status(501).json(err)
      }
      res.status(200).json(problems)
    })
  } catch (err) {
    res.status(501).json(error)
  }
})

// get user problems
router.get('/user', userAuthorize, async (req, res) => {
  try {
    const GET_USER_PROBLEMS = `SELECT id, title from questions WHERE userId = ${req.user.id}` // get all problem query
    mysql.query(GET_USER_PROBLEMS, (err, problems) => {
      if (err) {
        res.status(501).json(err)
      }
      res.status(200).json(problems)
    })
  } catch (err) {
    res.status(501).json(error)
  }
})

// get problem description
router.get('/:id', userAuthorize, async (req, res) => {
  try {
    const GET_PROBLEM_DESCRIPTION = `select distinct questions.id, questions.title, questions.description, questions.constraints, (select comments from comments where id = comment_connector.commentId) as comments from questions right outer join comment_connector  on comment_connector.quesId = questions.id join comments WHERE questions.id = ${req.params.id} ` // get all problem query
    mysql.query(GET_PROBLEM_DESCRIPTION, (err, problem) => {
      if(err) {
        res.status(501).json(err)
      }
      res.status(200).json(problem)
    })
  } catch (err) {
    res.status(501).json(error)
  }
})

module.exports = router