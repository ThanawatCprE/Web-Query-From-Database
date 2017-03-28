var express    = require("express");
var mysql      = require('mysql');
var path    = require("path");
var app = express();

var DBname;
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '20022539',
  database : 'test'
});


connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/webquery.html'));
});

app.get('/getdatabase',function(req,res){
  connection.query('SHOW DATABASES', function(err, rows) {
  connection.end();
    if (!err){
      res.send(JSON.stringify(rows));
     // console.log(rows);
     // console.log(typeof(rows));
  } else{
    console.log('Error while performing Query.');
  }
  });
});

app.get('/gettable?',function(req,res){
  DBname = req.query.Database;
  var togetTable = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '20022539',
  database : DBname
  });
  togetTable.query('SHOW Tables', function(err, tables) {
  togetTable.end();
    if (!err){
      res.send(JSON.stringify(tables));
  } else{
    console.log('Error while performing Query.');
  }
  });
});

app.get('/selectTable?',function(req,res){
  var Tablename = req.query.Name;
  var togetData = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '20022539',
  database : DBname
  });
  togetData.query('SELECT * FROM '+Tablename+'', function(err, data) {
  togetData.end();
    if (!err){
      res.send(JSON.stringify(data));
  } else{
    console.log('Error while performing Query.');
  }
  });
});
app.listen(3000);
