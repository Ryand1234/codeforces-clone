const router = require('express').Router()
const userAuthorize = require('../util/middleware')
var mySqlConnection = require('../util/db')
var mysql = mySqlConnection()
const { error } = require('../util/interface')
const axios = require('axios')

// Run Code
router.post('/run', async (req, res) => {
    try {
        let url = 'https://floating-oasis-63694.herokuapp.com/submit'
        var options = {
			method: 'POST',
			headers: {
		      'Content-type': 'application/json',
		      Accept: 'application/json'
		    },
			data: JSON.stringify(req.body)
		}
        var data = await axios(url, options)
        res.status(200).json(data.data)
    } catch (e) {
        res.status(400).json(error)
    }
})

// Get User Submission
router.get('/user', userAuthorize, async (req, res) => {
    const GET_SUBMISSION = `select distinct submission.status, submission_connector.quesId from submission inner join submission_connector on submission_connector.userId = ${req.user.id}`
    mysql.query(GET_SUBMISSION, (err, submission) => {
        console.log(submission, err)
        if(err) {
            res.status(400).json(error)
        }
        
        res.status(200).json(submission)
    })
})

// Get Specific User Submission
router.get('/user/:status', userAuthorize, async (req, res) => {
    const GET_SPECIFIC_SUBMISSION = `select distinct submission.status, submission_connector.quesId from submission inner join submission_connector on submission_connector.userId = ${req.user.id} where submission.status = ${req.params.status}`
    mysql.query(GET_SPECIFIC_SUBMISSION, (err, submission) => {
        if (err) {
            res.status(400).json(error)
        }
        res.status(200).json(submission)
    })
})

module.exports = router