//webserver modules
const express = require ('express')
const appRouter = express ()
const bodyParser = require ('body-parser')
appRouter.use(bodyParser.json())
appRouter.use(express.static('public'));


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
// .post((req, res, next) => {
//     day = req.body.day
//     time = req.body.time
//     title = req.body.title
//     res.write('<H1>Editing Appointment: ' + day + ' / ' + time + ' / ' + title+ '</H1>')
//     res.end('\n<h2>Adding appointment, ID = ' + req.params.id + '</h2>')
// })
// .put((req, res, next) => {
//     res.statusCode = 403;
//     res.end('Operation Not Supported.');
// })
// .delete((req, res, next) => {
//     res.end('Deleting Appointment');
// })

appRouter.route('/add_page')
.get((req,res,next) => {
    res.sendFile("add_page.html", { root: "./public" } );
})

appRouter.route('/adding')
.get((req,res,next) => {
    
    
})

appRouter.route('/delete_page')
.get((req,res,next) => {
    res.sendFile("delete_page.html", { root: "./public" } );
})

appRouter.route('/find_page')
.get((req,res,next) => {
    res.sendFile("find_page.html", { root: "./public" } );
})

appRouter.route('/list_page')
.get((req,res,next) => {
    res.sendFile("list_page.html", { root: "./public" } );
})

appRouter.route('/modify_page')
.get((req,res,next) => {
    res.sendFile("modify_page.html", { root: "./public" } );
})

module.exports = appRouter

function selectQuery() {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "SELECT * FROM Persons",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}

function addQuery() {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "SELECT * FROM Persons",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}

function deleteQuery() {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "SELECT * FROM Persons",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}

function findQuery() {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "SELECT * FROM Persons",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}

function listAllQuery() {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "SELECT * FROM Persons",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}

function modifyQuery() {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "SELECT * FROM Persons",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}