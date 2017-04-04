var express    = require("express");
var mysql      = require('mysql');
var path    = require("path");
var app = express();

var DBname;
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  password : '20022539',
  database : 'test'
});


connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... ");    
} else {
    console.log("Error connecting database ... ");    
}
});

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/webquery.html'));
});

app.get('/getdatabase',function(req,res){
  connection.query('SHOW DATABASES', function(err, rows) {
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
  host     : '127.0.0.1',
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

app.get('/getcolumn?',function(req,res){
  var Tablename = req.query.Name;
  var togetData = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  password : '20022539',
  database : DBname
  });
  console.log(DBname,Tablename);
  togetData.query('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA ='+'"'+DBname+'"'+' AND TABLE_NAME='+'"'+Tablename+'"', function(err, data) {
  togetData.end();
    if (!err){
      res.send(JSON.stringify(data));
  } else{
    console.log('Error while performing Query.');
  }
  });
});

app.get('/selectTable?',function(req,res){
  var Tablename = req.query.Name;
  var togetData = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '3306',
  user     : 'root',
  password : '20022539',
  database : DBname
  });
  togetData.query('SELECT * FROM '+Tablename+' LIMIT 500', function(err, data) {
  togetData.end();
    if (!err){
      res.send(JSON.stringify(data));
  } else{
    console.log('Error while performing Query.');
  }
  });
});
app.listen(3000);
