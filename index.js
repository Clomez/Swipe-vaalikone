
var express = require('express');
var app = express();
var path = require("path");
var request = require("request");
var question;
var fs = require('fs');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

//READ JSON LOCALY
var obj;
fs.readFile('question.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

// PAGES
app.get('/', function(req, res) {
	var num = Math.floor((Math.random() * 5) + 1);
    res.render('pages/index', {obj:obj, num:num} );
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});


//READ JSON DATA ONLINE

var url = "https://api.coinmarketcap.com/v1/ticker/"

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
		question = body;
    }
})

app.listen(8080);
console.log('8080 is the magic port');

