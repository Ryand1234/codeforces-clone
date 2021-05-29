const router = require('express').Router()
const userAuthorize = require('../util/middleware')
const { error, result, success } = require('../util/interface')
var mySqlConnection = require('../util/db')
var mysql = mySqlConnection()
const makeNotification = require('../controllers/notification')

// create blog
router.post('/create', userAuthorize, async (_req, res) => {
  try {
    const CREATE_BLOG = `INSERT INTO blogs (title, description, userId, quesId) VALUES ('${_req.body.title}', '${_req.body.description}', '${_req.user.id}', '${_req.body.quesId}')`// create blog query
    mysql.query(CREATE_BLOG, async(err) => {
      if(err) {
        res.status(501).json(error)
      }
      await makeNotification('blog', _req.user.email)
      res.status(200).json(success)
    })
  } catch (err) {
    res.status(400).json(error)
  }
})

// GET ALL BLOGS
router.get('/all', async (_req, res) => {
  try {
    const GET_ALL_BLOG = `SELECT id, title FROM blogs`// get all blog query
    mysql.query(GET_ALL_BLOG, (err, blogs) => {
      if(err) {
        res.status(501).json(error)
      }
      res.status(200).json(blogs)
    })
  } catch (err) {
    res.status(501).json(error)
  }
})

// GET QUESTION BLOG
router.get('/question/:id', async (req, res) => {
  try {
    const GET_QUESTION_BLOG = `SELECT id, title FROM blogs WHERE quesId = ${req.params.id}`// get question blog query
    mysql.query(GET_QUESTION_BLOG, (err, blogs) => {
      if(err) {
        res.status(501).json(error)
      }
      res.status(200).json(blogs)
    })
  } catch (err) {
    res.status(501).json(error)
  }
})

// GET USER BLOG
router.get('/user', async (req, res) => {
  try {
    const GET_USER_BLOG = `SELECT id, title FROM blogs WHERE userId = ${req.user.id}`// get question blog query
    mysql.query(GET_USER_BLOG, (err, blogs) => {
      if(err) {
        res.status(501).json(error)
      }
      res.status(200).json(blogs)
    })
  } catch (err) {
    res.status(501).json(error)
  }
})

// GET BLOG DETAILS
router.get('/desc/:id', async (req, res) => {
  try {
    const GET_BLOG_DESCRIPTION = `SELECT id, title, description FROM blogs WHERE id = ${req.params.id}`// get question blog query
    mysql.query(GET_BLOG_DESCRIPTION, (err, blogs) => {
      if(err) {
        res.status(501).json(error)
      }
      res.status(200).json(blogs)
    })
  } catch (err) {
    res.status(501).json(error)
  }
})

// delete blog
router.get('/remove/:id', userAuthorize, async (req, res, next) => {
  try {
    const DELETE_BLOG = `update table comment_connector set blogId = NULL where blogId = ${req.params.id}; delete from blogs where id = ${req.params.id}` // delete blog query
    mysql.query(DELETE_BLOG, (err) => {
      if(err) {
        res.status(501).json(err)
      }
      res.status(200).json(success)
    })
  } catch (err) {
    res.status(501).json(error)
  }
})

module.exports = router