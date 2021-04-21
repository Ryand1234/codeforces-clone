const express = require('express')
// require('dotenv').config()
// var logger = require('morgan')
var bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
// app.use(logger('dev'));
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database Connection
const mySqlConnection = require('./util/db')
const myConnection = mySqlConnection()

myConnection.connect((err)=>{
    if(!err) {
        console.log('Database mounted')
    } else {
        throw err
    }
})

// authentication routes
const authenticationRoutes = require('./routes/authenticate')

app.use('/api/authenticate', authenticationRoutes)

// problem routes
const problemRoutes = require('./routes/problem')

app.use('/api/problem', problemRoutes)

// comment routes
const commentRoutes = require('./routes/comment')

app.use('/api/comment', commentRoutes)

// blog routes
const blogRoutes = require('./routes/blog')

app.use('/api/blog', blogRoutes)

// Submission routes
const submissionRoutes = require('./routes/submission')

app.use('/api/submission', submissionRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on Port ${process.env.PORT || 3000}`)
})