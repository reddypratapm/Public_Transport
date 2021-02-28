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
var username2 = [];

app.set("view engine", "ejs");


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
                    return res.render("index", { data: { username: username1}});
                    break;
            case '2B':
                return res.render("index", { data: { username: username1}});
                break;
            default:
                return res.render("index", { data: {username: ['Select Direction']}});
                break;
        }
      } else {
        console.log(err);
      }
    }
  );
});

//after selecting the Route, this will give the Stops
app.get("/what", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM direction",
    (err, results, fields) => {
      if (!err) {
        for (var i = 0; i < 2; i++)
        {
            username2[i] = results[i][Direction];
        }

        switch (Direction)
        {
            case "Bangalore to Mangalore":
                    return res.render("index", { data: { direction1: username2}});
                    break;
            case 'Hyderabad to Karimnagar':
                    return res.render("index", { data: { direction1: username2}});
                    break;
            case 'Delhi to Assam':
                    return res.render("index", { data: { direction1: username2}});
                    break;
            case 'Mumbai to Pune':
                    return res.render("index", { data: { direction1: username2}});
                    break;
            default:
                    return res.render("index", { data: {direction1: ['Select Stop']}});
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
    console.log('Routevalue',Route);
    return res.redirect("/");
});

app.get('/direction',function(req,res){
  Direction =(req.query.selectpicker1);
  console.log('Directionvalue',Direction);
  return res.redirect('/what');
});

//server to port 3000
app.get('/', function(req, res) {
    res.render('index.ejs');
});

//final result
app.get('/result', function(req, res) {
  res.send({'Selected Route':Route,'Selected Direction':Direction,'Selected Stop':req.query.selectpicker});
});


//listening to port 3000
app.listen(3000,function(){
  console.log('Listening!');
});