//express module
const express = require ('express')
const app = express ()
const port = 3000
//body-parser module
const bodyParser = require ('body-parser')
app.use(bodyParser.json())
//tedious module
var Connection = require('tedious').Connection; 
var Request = require('tedious').Request;
//fs module
fs = require('fs');

/**
  * Sets up the connection to SQL Server Database
  * Connects to the SQL Sever Database
*/

// reads the file containing the login information
var data = fs.readFileSync('./login_info');
data = data.toString();

var arr = data.split(",");
var myUsername = arr[0] + "@mydbserverfam";
var myPassword = arr[1];
var myDbname = arr[2];
var myServername = arr[3] + ".database.windows.net";
console.log(myUsername+' '+myPassword+' '+myDbname+' '+myServername)

var config = 
 {
    authentication: {
        options: {
	        userName:  myUsername,
            password:  myPassword,
        },
        type: 'default'
    },
    server: myServername,
	options: {
		database:  myDbname,
		encrypt: true
	}
}

var connection = new Connection(config);
console.log(connection);
connection.on('connect',function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Connected")
    }
});