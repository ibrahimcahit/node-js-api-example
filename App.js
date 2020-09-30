var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "00.00.00.00",
    user: "username",
    password: "password",
    database: "database",
});
 
var cities = [{name: 'Istanbul', country: 'Turkey'}, {name: 'New York', country: 'USA'}, {name: 'London', country:'England'}];

var res = null

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM <YOUR_TABLE_NAME> ORDER BY id DESC LIMIT 20", function (err, results, fields) {
      if (err) throw err;
      res = results
    });
});

var app = express();
 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
app.listen(8080, function(){
   console.log("Listening");
});

app.get('/api/cities', function(request, response){
    response.send(cities);
});
 
app.get('/api/<YOUR_TABLE_NAME>', function(request, response){
    response.send(res);
});

app.post('/api/cities', function(request, response){
    var city = request.body;
    console.log(city);
    
    cities.push(city);
    response.send(cities);
});















































