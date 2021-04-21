const router = require('express').Router()
const userAuthorize = require('../util/middleware')
const { error, result } = require('../util/interface')
var mySqlConnection = require('../util/db')
var mysql = mySqlConnection()

// create blog
router.post('/create', userAuthorize, async (_req, res) => {
  try {
    const CREATE_BLOG = `INSERT INTO blogs (title, description, userId) VALUES ('${req.body.title}', '${req.body.description}', '${req.user.userId}')`// create blog query
    mysql.query(CREATE_BLOG, (err) => {
      if(err) {
        res.status(501).json(error)
      }
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(501).json(error)
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
router.get('/:id', async (req, res) => {
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

module.exports = router