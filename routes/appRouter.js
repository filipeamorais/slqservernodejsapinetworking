//webserver modules
const express = require ('express')
const appRouter = express ()
const bodyParser = require ('body-parser')
appRouter.use(bodyParser.json())

//HTTP methods in routing fashion
appRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/http');
    next();
  })
.get((req,res,next) => {
    day = req.query.day
    time = req.query.time
    title = req.query.title
    res.write('<H1>Editing Appointment: ' + day + ' / ' + time + ' / ' + title+ '</H1>')
    res.end('\n<h2>Sending appointment, ID = ' + req.params.id + '</h2>')
})
.post((req, res, next) => {
    day = req.body.day
    time = req.body.time
    title = req.body.title
    res.write('<H1>Editing Appointment: ' + day + ' / ' + time + ' / ' + title+ '</H1>')
    res.end('\n<h2>Adding appointment, ID = ' + req.params.id + '</h2>')
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Operation Not Supported.');
})
.delete((req, res, next) => {
    res.end('Deleting Appointment');
})

module.exports = appRouter