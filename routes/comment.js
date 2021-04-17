const router = require('express').Router()
var mySqlConnection = require('../util/db')
var mysql = mySqlConnection()
const { error, success } = require('../util/interface')

// MAKE COMMENT
router.post('/blog/:id', async(req, res) => {
  const MAKE_COMMENT = `INSERT INTO comments (comment) VALUES ('${req.body.comment}'); INSERT INTO comment_connector (userId, blogId, quesId) VALUES (${req.user.id}, ${req.body.blogId}, ${req.body.quesId})`
  mysql.query(MAKE_COMMENT, async (err) => {
    if (err) {
      res.status(404).json(error)
    }
    res.status(200).json(success)
  })
})

// GET QUESTION COMMENTS
router.get('/question/:id', async (req, res) => {
  const GET_QUESTION_COMMENT = `SELECT distinct comments.comments FROM comments join comment_connector on comment_connector.quesId = ${req.params.id}`
  mysql.query(GET_QUESTION_COMMENT, async (err, comments) => {
    if (err) {
      res.status(404).json(error)
    }
    res.status(200).json(comments)
  })
})
module.exports = router