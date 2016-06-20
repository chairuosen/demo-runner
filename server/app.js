var express = require('express');
var app = express();
var argv = require('yargs').argv;
var port = argv.port || 5000;

app.use('/api',require('./router'));

app.use(express.static('./dist'));

app.listen(port,function () {
    console.log('Running on '+port);
});