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
    title = req.query.title,
    author = req.query.author,
    year = req.query.year,
    genre = req.query.genre;
    addQuery(title, author, year, genre);
})

appRouter.route('/delete_page')
.get((req,res,next) => {
    res.sendFile("delete_page.html", { root: "./public" } );
})

appRouter.route('/deleting')
.get((req,res,next) => {
    title = req.query.title,
    deleteQuery(title);
})

appRouter.route('/find_page')
.get((req,res,next) => {
    res.sendFile("find_page.html", { root: "./public" } );
})

appRouter.route('/finding')
.get((req,res,next) => {
    title = req.query.title,
    author = req.query.author,
    year = req.query.year,
    genre = req.query.genre;
    findQuery(title, author, year, genre);
})

appRouter.route('/list_page')
.get((req,res,next) => {
    res.sendFile("list_page.html", { root: "./public" } );
})

appRouter.route('/listing')
.get((req,res,next) => {
    listAllQuery(title);
})

appRouter.route('/modify_page')
.get((req,res,next) => {
    res.sendFile("modify_page.html", { root: "./public" } );
})

appRouter.route('/modifying')
.get((req,res,next) => {
    title = req.query.title,
    author = req.query.author,
    year = req.query.year,
    genre = req.query.genre;
    modifyQuery(title, author, year, genre);
})

module.exports = appRouter

function addQuery(title, auhtor, year, genre) {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "INSERT INTO Books (Title, Author, Year, Genre) VALUES ("+title+","+auhtor+","+year+","+genre+")",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );
    connection.execSql(request);
}

function deleteQuery(title) {
    console.log('Reading rows from the Table...');
    var request = new Request(
        "DELETE FROM Books WHERE Title ="+title,
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
            process.exit();
        }
    );
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
        "SELECT * FROM Books",
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