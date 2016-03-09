var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/',function(req,res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit',function(req,res){
  console.log(req.body);
  console.log(req.connection.remoteAddress);
  var secretKey = "";
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  request(verificationUrl,function(error,response,body) {
    console.log(body);
    res.send("Hello");
  });
});

app.listen(3000);
