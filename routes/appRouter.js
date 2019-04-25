//webserver modules
const express = require ('express')
const appRouter = express ()
const bodyParser = require ('body-parser')
appRouter.use(bodyParser.json())
appRouter.use(express.static('public'));

//mssql server modules
var Connection = require('tedious').Connection; 
var Request = require('tedious').Request;
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

//HTTP methods in routing fashion
appRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
  })
.get((req,res,next) => {
    res.sendFile( __dirname + "/" + "index.html" );
})

appRouter.route('/add_page')
.get((req,res,next) => {
    res.sendFile("add_page.html", { root: "./public" } );
})

appRouter.route('/adding')
.get((req,res,next) => {
    var connection = new Connection(config);
    connection.on('connect',function(err){
        if(err){
            console.log(err)
        }else{
            console.log("Connected")
            title = req.query.title,
            author = req.query.author,
            year = req.query.year,
            genre = req.query.genre;
            addQuery(title, author, year, genre,connection);
            res.sendFile("ack_page.html", { root: "./public" } );

        }
    });
})

appRouter.route('/delete_page')
.get((req,res,next) => {
    res.sendFile("delete_page.html", { root: "./public" } );
})

appRouter.route('/deleting')
.get((req,res,next) => {
    var connection = new Connection(config);
    connection.on('connect',function(err){
        if(err){
            console.log(err)
        }else{
            title = req.query.title
            deleteQuery(title,connection);
            res.sendFile("ack_page.html", { root: "./public" } );
        }
    });
})

appRouter.route('/find_page')
.get((req,res,next) => {
    res.sendFile("find_page.html", { root: "./public" } );
})

appRouter.route('/finding')
.get((req,res,next) => {
    var connection = new Connection(config);
    connection.on('connect',function(err){
        if(err){
            console.log(err)
        }else{
            title = req.query.title,
            author = req.query.author,
            year = req.query.year,
            genre = req.query.genre;
            findQuery(title, author, year, genre, connection);
            res.sendFile("index.html", { root: "./public" } );
        }
    });
})

appRouter.route('/list_page')
.get((req,res,next) => {
    res.sendFile("list_page.html", { root: "./public" } );
})

appRouter.route('/listing')
.get((req,res,next) => {
    //res.setHeader('Content-Type', 'text/plain');
    var connection = new Connection(config);
    connection.on('connect',function(err){
        if(err){
            console.log(err)
        }else{
            listAllQuery(connection, res);
            //res.sendFile("index.html", { root: "./public" } );
        }
    });
})

appRouter.route('/modify_page')
.get((req,res,next) => {
    res.sendFile("modify_page.html", { root: "./public" } );
})

appRouter.route('/modifying')
.get((req,res,next) => {
    var connection = new Connection(config);
    connection.on('connect',function(err){
        if(err){
            console.log(err)
        }else{
            title = req.query.title,
            author = req.query.author,
            year = req.query.year,
            genre = req.query.genre;
            modifyQuery(title, author, year, genre, connection);
            res.sendFile("ack_page.html", { root: "./public" } );
        }
    });
})

module.exports = appRouter

function addQuery(title, auhtor, year, genre, connection) {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "INSERT INTO Books (Title, Author, Year, Genre) VALUES ('"+title+"','"+auhtor+"','"+year+"','"+genre+"')",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            //process.exit();
        }
    );
    connection.execSql(request);
}

function deleteQuery(title, connection) {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "DELETE FROM Books WHERE Title ='"+title+"'",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            //process.exit();
        }
    );
    connection.execSql(request);
}

function findQuery(title, author, year, genre, connection) {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "SELECT * FROM Books WHERE Title ='"+title+"' OR Author='"+author+"' OR Year='"+year+"' OR Genre='"+genre+"'",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            //process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}

function listAllQuery(connection, res) {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "SELECT * FROM Books",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            //process.exit();
        }
    );
    
    //var myData = [];

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
            //myData.push(column.value);
            res.end(column.value)
        });
        
    });
    connection.execSql(request);
}

function modifyQuery(title, author, year, genre, connection) {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "UPDATE Books SET Title = '"+title+"', Author='"+author+"',Year='"+year+"', Genre='"+genre+"' WHERE Title ='"+title+"' OR Author='"+author+"' OR Year='"+year+"' OR Genre='"+genre+"'",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            //process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}