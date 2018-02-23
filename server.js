'use strict'

var express = require('express')
var morgan = require('morgan')
var path = require('path')

var app = express()

var mongoose = require('mongoose')
var bodyParser = require('body-parser')

//Require configuration file defined in app/Config.js
var config = require('./app/Config')

//Connect to database
mongoose.connect(config.DB)

//Sends static files from the public path directory
app.use(express.static(path.join(__dirname, '/public')))

//Use morgan to log request in dev mode
app.use(morgan('dev'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

var port = config.APP_PORT || 4000

app.listen(port) //Listen on port defined in config file or default to 4000
console.log(`App listening on port ${port}`)

var todoRoutes = require('./app/routes')

//Use routes defined in Route.js and prefix it with api
app.use('/api', todoRoutes)
app.use((req, res, next) => {
    //Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${port}`)
    //Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    //Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    //Pass to next layer of the middleware
    next()
})

//Server index.html page when request to the root is made
app.get('/', (req, res, next) => {
    res.sendFile('./public/index.html')
})