const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcyrpt = require('bcryptjs')
var mySqlConnection = require('../util/db')
var mysql = mySqlConnection()
const authenticateController = require('../controllers/authentication')
// login route
router.post('/login', async (req, res) => {
    const FIND_USER = `SELECT * FROM user WHERE email = "${req.body.email}"`
    mysql.query(FIND_USER, (err, user) => {
    console.log(user[0].password, err)
    if (err) {
      res.status(400).json({
        message: 'Login failed'
      })
    }
    if (bcyrpt.compareSync(req.body.password, user[0].password)) {
      var token = jwt.sign({
        id: user[0].id, email: user[0].email, name: user[0].name
      }, process.env.JWT_SECRET, { expiresIn: '2d' })

      return res.status(200).json({
        message: 'Logged In',
        token: `Bearer ${token}`
      })
    } else {
      res.status(400).json({
        message: 'Login failed'
      })
    }
  })
  }
)

// register route
router.post('/register', async (req, res)=>{
  try {
    await authenticateController.registerController(req.body)
    res.status(200).json({ message: 'User Registered' })
  } catch (err) {
    res.status(400).json({ message: 'Unknown error while registering', error: err })
  }
})

module.exports = router