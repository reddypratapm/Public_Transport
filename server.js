var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var mysqlConnection = require("./database");
var Router = express.Router();
var app = express();

var Route;
var Direction;
var username1 = [];

app.set("view engine", "ejs");

//app.set(__dirname); 
//app.use(express.static(__dirname));



app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
const fs = require('fs')

//after selecting the Route, this will give the directions
app.get("/", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM route",
    (err, results, fields) => {
      if (!err) {
        for (var i = 0; i < 2; i++)
        {
            username1[i] = results[i][Route];
        }
        switch (Route)
        {
            case '1B':
                console.log(username1);
                    return res.render("index", { username: username1});
                
            case '2B':
                return res.render("index", { username: username1});
                break;
            default:
                return res.render("index", { username: ['Select Direction']});
                break;
        }
      } else {
        console.log(err);
      }
    }
  );
});

// select the route
app.get('/create',function(req,res){
    Route = req.query.selectpicker;
    console.log(Route);
    return res.redirect("/");
});

//server to port 3000
app.get('/', function(req, res) {
    res.render('index.ejs');
});


//listening to port 3000
app.listen(3000,function(){
  console.log('Listening!');
});