//webserver modules
const express = require ('express')
const app = express ()
const port = 3000
const bodyParser = require ('body-parser')
app.use(bodyParser.json())
//mssql server modules
var Connection = require('tedious').Connection; 
var Request = require('tedious').Request;
fs = require('fs');

/**
  * Sets up the HTTP methods for the Webserver communication
  * Uses the router file to keep the HTTP methods
  * Turns on the webserver
*/

const appRouter = require('./routes/appRouter')
app.use('/bookstore', appRouter)

var server = app.listen(port, function () {
    console.log(`Server listening on port ${port}`)
})
