var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var argv = require('yargs').argv;
var port = argv.port || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req,res,next) {
    res.set('Access-Control-Allow-Origin',"*");
    res.set('Access-Control-Allow-Headers',"Content-Type");
    next();
})
app.use('/api',require('./router'));

// app.use(express.static('./dist'));

app.listen(port,function () {
    console.log('Running on '+port);
});