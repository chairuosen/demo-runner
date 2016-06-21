var express = require('express');
var RateLimit = require('express-rate-limit');
var app = express();
var bodyParser = require('body-parser');
var argv = require('yargs').argv;
var port = argv.port || 5000;

app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

var minutes = 60*1000;
var limiter = new RateLimit({
    windowMs: 1*minutes, // s
    max: 30, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

app.use('/api/',limiter);

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
    console.log('Server running on '+port);
});